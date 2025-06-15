import { useEffect, useMemo, useRef, useState } from 'react';
import {
  createClient,
  REALTIME_SUBSCRIBE_STATES,
  RealtimePresenceState,
  SupabaseClient,
} from '@supabase/supabase-js';

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
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

/* ------------------------------------------------------------------ */
/* Presence hook                                                       */
/* ------------------------------------------------------------------ */
export function useUserPresence(userId: string, name: string) {
  const [connectedUsers, setConnectedUsers] = useState<ConnectedUser[]>([]);
  const [isConnected,   setIsConnected]   = useState(false);
  const [error,         setError]         = useState<Error | null>(null);

  /* One channel per tab — keep in a ref so it survives re-renders */
  const channelRef     = useRef<ReturnType<typeof supabase.channel> | null>(null);
  const subscribedRef  = useRef(false); // guard against double subscribe

  /* Key must be unique per tab (Supabase Presence requirement) */
  const presenceKey = useMemo(
    () => `${userId}_${crypto.randomUUID()}`,
    [userId],
  );

  useEffect(() => {
    /* Lazily create the channel only once */
    if (!channelRef.current) {
      channelRef.current = supabase.channel('user-presence', {
        config: { presence: { key: presenceKey } },
      });
    }
    const channel = channelRef.current;

    /* Bail out if we already subscribed (Strict Mode double invoke) */
    if (subscribedRef.current) return;
    subscribedRef.current = true;

    /* Handler for full state syncs */
    const syncHandler = () => {
      const state: RealtimePresenceState<PresencePayload> =
        channel.presenceState<PresencePayload>();

      const everyone: ConnectedUser[] = Object.values(state)
        .flat()
        .map(({ presence_ref, ...rest }) => rest);

      setConnectedUsers(everyone);
    };

    channel
      .on('presence', { event: 'sync' }, syncHandler)
      .on('presence', { event: 'join'  }, ({ key }) => console.log(`${key} joined`))
      .on('presence', { event: 'leave' }, ({ key }) => console.log(`${key} left`))
      .subscribe(async (status, err) => {
        if (status === REALTIME_SUBSCRIBE_STATES.SUBSCRIBED) {
          setIsConnected(true);
          try {
            await channel.track({
              id: userId,
              name,
              online_at: new Date().toISOString(),
            });
          } catch (trackErr) {
            setError(trackErr as Error);
          }
        }

        if (status === REALTIME_SUBSCRIBE_STATES.CHANNEL_ERROR) {
          console.error(err);
          setError(err ?? new Error('Channel error'));
          setIsConnected(false);
        }
      });

    /* Cleanup on unmount */
    return () => {
      if (channelRef.current) {
        channelRef.current.unsubscribe();
        channelRef.current = null;
      }
      subscribedRef.current = false;
    };
  }, [userId, name, presenceKey]);

  return { connectedUsers, isConnected, error };
}
