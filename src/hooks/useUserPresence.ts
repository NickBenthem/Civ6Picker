import { useEffect, useMemo, useRef, useState } from 'react';
import {
  createClient,
  REALTIME_SUBSCRIBE_STATES,
  RealtimePresenceState,
  SupabaseClient,
} from '@supabase/supabase-js';
import { createReconnectionManager } from '../utils/reconnectionManager';

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */
export interface ConnectedUser {
  id: string;
  name: string | null;         // name may be null if a client tracked no name
  online_at: string;
}

/* Supabase also adds presence_ref – describe it so TS is satisfied */
type PresencePayload = ConnectedUser & { presence_ref: string };

/* ------------------------------------------------------------------ */
/* Supabase client (singleton)                                         */
/* ------------------------------------------------------------------ */
const supabaseUrl  = import.meta.env.NEXT_PUBLIC_SUPABASE_URL  as string;
const supabaseKey  = import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey, {
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});

/* ------------------------------------------------------------------ */
/* Presence hook                                                       */
/* ------------------------------------------------------------------ */
export function useUserPresence(userId: string, name: string, lobbyCode: string) {
  const [connectedUsers, setConnectedUsers] = useState<ConnectedUser[]>([]);
  const [isConnected,   setIsConnected]   = useState(false);
  const [error,         setError]         = useState<Error | null>(null);
  const [isReconnecting, setIsReconnecting] = useState(false);

  /* One channel per tab — keep in a ref so it survives re-renders */
  const channelRef     = useRef<ReturnType<typeof supabase.channel> | null>(null);
  const subscribedRef  = useRef(false); // guard against double subscribe
  const reconnectionManagerRef = useRef(createReconnectionManager({
    maxRetries: 15,
    baseDelay: 1000,
    maxDelay: 30000,
    jitterFactor: 0.15,
    onRetry: (attempt, delay) => {
      console.log(`Reconnecting to presence channel (attempt ${attempt}/${15}) in ${delay}ms`);
      setIsReconnecting(true);
      setError(new Error(`Connection lost. Reconnecting... (attempt ${attempt})`));
    },
    onMaxRetriesReached: () => {
      console.error('Max reconnection attempts reached for presence channel');
      setIsReconnecting(false);
      setError(new Error('Failed to reconnect after multiple attempts. Please refresh the page.'));
    }
  }));

  /* Key must be unique per tab (Supabase Presence requirement) */
  const presenceKey = useMemo(
    () => `${userId}_${crypto.randomUUID()}`,
    [userId],
  );

  const setupChannel = () => {
    /* Lazily create the channel only once */
    if (!channelRef.current) {
      channelRef.current = supabase.channel(`user-presence-${lobbyCode}`, {
        config: { presence: { key: presenceKey } },
      // @ts-expect-error: `timeout` not yet in the public typings
      timeout: 6000,          // ms
      });
    }
    return channelRef.current;
  };

  const subscribeToChannel = (channel: ReturnType<typeof supabase.channel>) => {
    /* Handler for full state syncs */
    const refreshFromState = () => {
        const state: RealtimePresenceState<PresencePayload> =
          channel.presenceState<PresencePayload>();
    
        setConnectedUsers(
          Object.values(state)
            .flat()
            .map(({ presence_ref, ...rest }) => rest),
        );
      };

    return channel
        /* Full resync (first load or reconnect) */
        .on('presence', { event: 'sync' }, refreshFromState)
    
        /* Diff events arrive instantly but we still mutate local state
           so users show up in <1 s instead of waiting for the next sync. */
        .on('presence', { event: 'join' }, ({ newPresences }) => {
          setConnectedUsers((prev) => [
            ...prev,
            ...(newPresences as PresencePayload[]).map(({ presence_ref, ...rest }) => rest),
          ]);
        })
        .on('presence', { event: 'leave' }, ({ leftPresences }) => {
          setConnectedUsers((prev) =>
            prev.filter(
              (u) => !leftPresences.some((l) => (l as PresencePayload).id === u.id),
            ),
          );
        })
      .subscribe(async (status, err) => {
        if (status === REALTIME_SUBSCRIBE_STATES.SUBSCRIBED) {
          setIsConnected(true);
          setIsReconnecting(false);
          setError(null);
          reconnectionManagerRef.current.reset(); // Reset retry counter on successful connection
          
          try {
            // Track user presence with lobby information
            await channel.track({
              id: userId,
              name,
              online_at: new Date().toISOString(),
            });

            // Also store in connected_users table with lobby_code
            await supabase
              .from('connected_users')
              .upsert({
                user_name: name,
                lobby_code: lobbyCode,
                last_seen: new Date().toISOString()
              }, {
                onConflict: 'user_name'
              });

          } catch (trackErr) {
            setError(trackErr as Error);
          }
        }

        if (status === REALTIME_SUBSCRIBE_STATES.CHANNEL_ERROR) {
          console.error('Presence channel error:', err);
          setIsConnected(false);
          
          // Schedule reconnection with backoff
          reconnectionManagerRef.current.scheduleRetry(() => {
            // Clean up old channel
            if (channelRef.current) {
              channelRef.current.unsubscribe();
              channelRef.current = null;
            }
            subscribedRef.current = false;
            
            // Re-subscribe
            const newChannel = setupChannel();
            subscribeToChannel(newChannel);
          });
        }
      });
  };

  useEffect(() => {
    const handleUnload = () => {
      if (!channelRef.current) return;
      /* Tell the server we're gone NOW */
      channelRef.current.untrack();        // sends Presence LEAVE
      channelRef.current.unsubscribe();    // closes socket if idle
      supabase.removeChannel(channelRef.current);
    };
    
    window.addEventListener('pagehide', handleUnload); // pagehide works with bfcache
    
    const channel = setupChannel();

    /* Bail out if we already subscribed (Strict Mode double invoke) */
    if (subscribedRef.current) return;
    subscribedRef.current = true;

    subscribeToChannel(channel);

    /* Cleanup on unmount */
    return () => {
      reconnectionManagerRef.current.cancel();
      if (channelRef.current) {
        channelRef.current.unsubscribe();
        channelRef.current = null;
      }
      subscribedRef.current = false;
    };
  }, [userId, name, presenceKey, lobbyCode]);

  return { connectedUsers, isConnected, error, isReconnecting };
}
