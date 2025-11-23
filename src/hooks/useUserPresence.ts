import { useEffect, useRef, useState } from 'react';
import type { RealtimeChannel } from '@supabase/supabase-js';
import { createReconnectionManager } from '../utils/reconnectionManager';
import { supabase } from '../lib/supabaseClient';

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */
export interface ConnectedUser {
  id: string;
  name: string | null;
  online_at: string;
}

/* ------------------------------------------------------------------ */
/* Presence hook                                                       */
/* ------------------------------------------------------------------ */
export function useUserPresence(
  userId: string,
  name: string,
  lobbyCode: string
) {
  const [connectedUsers, setConnectedUsers] = useState<ConnectedUser[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isReconnecting, setIsReconnecting] = useState(false);

  const channelRef = useRef<RealtimeChannel | null>(null);

  const reconnectionManagerRef = useRef(
    createReconnectionManager({
      maxRetries: 15,
      baseDelay: 1000,
      maxDelay: 30000,
      jitterFactor: 0.15,
      onRetry: (attempt, delay) => {
        console.log(
          `Reconnecting to presence channel (attempt ${attempt}/${15}) in ${delay}ms`
        );
        setIsReconnecting(true);
        setError(
          new Error(
            `Connection lost. Reconnecting... (attempt ${attempt})`
          )
        );
      },
      onMaxRetriesReached: () => {
        console.error('Max reconnection attempts reached for presence channel');
        setIsReconnecting(false);
        setError(
          new Error(
            'Failed to reconnect after multiple attempts. Please refresh the page.'
          )
        );
      },
    })
  );

  const setupChannel = () => {
    if (!lobbyCode) return null;

    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
      channelRef.current = null;
    }

    const channel = supabase.channel(`presence:${lobbyCode}`, {
      config: {
        presence: {
          key: userId,
        },
      },
    });

    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState() as Record<
          string,
          { id: string; name: string | null; online_at: string }[]
        >;

        const users: ConnectedUser[] = [];
        for (const [, presences] of Object.entries(state)) {
          for (const presence of presences) {
            users.push({
              id: presence.id,
              name: presence.name,
              online_at: presence.online_at,
            });
          }
        }

        setConnectedUsers(users);
      })
      .on('presence', { event: 'join' }, () => {
        setIsConnected(true);
      })
      .on('presence', { event: 'leave' }, () => {
        // state will be updated on next sync
      });

    channel.subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        setIsConnected(true);
        setIsReconnecting(false);
        setError(null);
        reconnectionManagerRef.current.reset();

        await channel.track({
          id: userId,
          name,
          online_at: new Date().toISOString(),
        });
      }

      if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
        setIsConnected(false);
        setIsReconnecting(true);
        reconnectionManagerRef.current.scheduleRetry(() => {
          setupChannel();
        });
      }
    });

    channelRef.current = channel;
    return channel;
  };

  useEffect(() => {
    const handleUnload = () => {
      if (channelRef.current) {
        channelRef.current.untrack().catch(() => {
          // ignore
        });
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };

    window.addEventListener('pagehide', handleUnload);

    if (lobbyCode) {
      setupChannel();
    }

    return () => {
      window.removeEventListener('pagehide', handleUnload);
      reconnectionManagerRef.current.cancel();
      if (channelRef.current) {
        channelRef.current.untrack().catch(() => {
          // ignore
        });
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
  }, [userId, name, lobbyCode]);

  return { connectedUsers, isConnected, error, isReconnecting };
}
