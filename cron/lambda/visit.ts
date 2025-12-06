import { createClient } from '@supabase/supabase-js';
import WebSocket from 'ws';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_SUPABASE_URL;
  const supabaseAnonKey =
    process.env.SUPABASE_ANON_KEY ?? process.env.NEXT_SUPABASE_ANON_KEY;
  const lobbyCode = process.env.LOBBY_CODE ?? '440-8A2';
  const waitMs = Number(process.env.WAIT_MS ?? 5000);

  export const handler = async () => {
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase URL/anon key are not configured');
    }

  // Ensure Realtime sees a WebSocket implementation in the Lambda runtime
  (globalThis as unknown as { WebSocket?: typeof WebSocket }).WebSocket = WebSocket as typeof WebSocket;

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: { WebSocket },
    realtime: {
      params: { apikey: supabaseAnonKey },
      heartbeatIntervalMs: 5_000,
      logger: (level, msg, data) => console.log('[realtime]', level, msg, data)
    }
  });

  const presenceKey = `cron-${Date.now()}`;
  const channelName = `presence:${lobbyCode}`;

  const channel = supabase.channel(channelName, {
    config: {
      presence: {
        key: presenceKey
      }
    }
  });

  console.log('Connecting to presence channel', { channelName, lobbyCode, waitMs, supabaseUrl });

  let subscribed = false;

  await new Promise<void>((resolve, reject) => {
    channel.subscribe(async (status) => {
      console.log('channel status', status);
      if (status === 'SUBSCRIBED') {
        try {
          await channel.track({
            id: presenceKey,
            name: 'Cron',
            online_at: new Date().toISOString()
          });
          subscribed = true;
          console.log('presence track sent');
          resolve();
        } catch (error) {
          console.error('presence track failed', error);
          reject(error);
        }
      }

      if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
        reject(new Error(`Channel status: ${status}`));
      }
    });
  });

  if (!subscribed) {
    throw new Error('Presence channel never subscribed');
  }

  await wait(waitMs);
  console.log('untracking presence');
  await channel.untrack().catch((error) => {
    console.error('untrack failed', error);
  });
  console.log('unsubscribing channel');
  await channel.unsubscribe();
  supabase.removeChannel(channel);
  console.log('channel closed');

  return {
    status: 'ok',
    lobby: lobbyCode,
    waitedMs: waitMs
  };
};
