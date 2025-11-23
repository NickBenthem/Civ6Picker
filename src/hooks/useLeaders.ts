import { useEffect, useMemo, useRef, useState } from 'react';
import type { RealtimeChannel } from '@supabase/supabase-js';
import {
  type BaseLeader,
  type Leader,
  type LeaderState,
} from '../lib/supabase';
import { baseLeaders } from '../data/leaders';
import { loadLobbyState, saveLobbyState } from '../utils/lobbyStateStorage';
import { createReconnectionManager } from '../utils/reconnectionManager';
import { supabase } from '../lib/supabaseClient';

type LeaderBroadcastEvent =
  | {
      type: 'ban_toggled';
      lobbyCode: string;
      leaderId: string;
      userName: string;
      isBanned: boolean;
      timestamp: string;
    }
  | {
      type: 'state_request';
      lobbyCode: string;
      requestId: string;
      requester: string;
    }
  | {
      type: 'state_snapshot';
      lobbyCode: string;
      requestId: string;
      leaders: LeaderState[];
      sentBy: string;
      timestamp: string;
    };

function mergeBaseWithState(
  base: BaseLeader[],
  stateMap: Map<string, LeaderState>
): Leader[] {
  return base.map((leader) => {
    const state = stateMap.get(leader.id);
    return {
      ...leader,
      is_banned: state?.is_banned ?? false,
      banned_by: state?.banned_by ?? null,
      banned_at: state?.banned_at ?? null,
    };
  });
}

function toLeaderStates(leaders: Leader[]): LeaderState[] {
  return leaders.map((leader) => ({
    id: leader.id,
    is_banned: leader.is_banned,
    banned_by: leader.banned_by,
    banned_at: leader.banned_at,
  }));
}

export function useLeaders(lobbyCode: string) {
  const [leaders, setLeaders] = useState<Leader[]>(() =>
    mergeBaseWithState(baseLeaders, new Map())
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isReconnecting, setIsReconnecting] = useState(false);

  const leadersRef = useRef<Leader[]>(leaders);
  const channelRef = useRef<RealtimeChannel | null>(null);
  const lastRequestIdRef = useRef<string | null>(null);

  const reconnectionManagerRef = useRef(
    createReconnectionManager({
      maxRetries: 12,
      baseDelay: 1500,
      maxDelay: 45000,
      jitterFactor: 0.2,
      onRetry: (attempt, delay) => {
        console.log(
          `Reconnecting leader socket (attempt ${attempt}/${12}) in ${delay}ms`
        );
        setIsReconnecting(true);
        setError(
          new Error(
            `Leader updates connection lost. Reconnecting... (attempt ${attempt})`
          )
        );
      },
      onMaxRetriesReached: () => {
        console.error('Max reconnection attempts reached for leader channel');
        setIsReconnecting(false);
        setError(
          new Error(
            'Failed to reconnect to leader updates after multiple attempts. Please refresh the page.'
          )
        );
      },
    })
  );

  useEffect(() => {
    leadersRef.current = leaders;
  }, [leaders]);

  const initialLeaders = useMemo(() => {
    const stored = lobbyCode ? loadLobbyState(lobbyCode) : null;
    if (!stored || !stored.leaders.length) {
      return mergeBaseWithState(baseLeaders, new Map());
    }

    const stateMap = new Map<string, LeaderState>();
    for (const state of stored.leaders) {
      stateMap.set(state.id, state);
    }
    return mergeBaseWithState(baseLeaders, stateMap);
  }, [lobbyCode]);

  useEffect(() => {
    setLeaders(initialLeaders);
    setLoading(false);
  }, [initialLeaders]);

  async function toggleBanLeader(leaderId: string, userName: string) {
    const currentLeader = leadersRef.current.find((l) => l.id === leaderId);
    if (!currentLeader) {
      throw new Error('Leader not found');
    }

    const nextIsBanned = !currentLeader.is_banned;
    const timestamp = new Date().toISOString();

    setLeaders((prevLeaders) => {
      const updated = prevLeaders.map((leader) =>
        leader.id === leaderId
          ? {
              ...leader,
              is_banned: nextIsBanned,
              banned_by: nextIsBanned ? userName : null,
              banned_at: nextIsBanned ? timestamp : null,
            }
          : leader
      );
      saveLobbyState(lobbyCode, toLeaderStates(updated));
      return updated;
    });

    const channel = channelRef.current;
    if (!channel) {
      return;
    }

    const event: LeaderBroadcastEvent = {
      type: 'ban_toggled',
      lobbyCode,
      leaderId,
      userName,
      isBanned: nextIsBanned,
      timestamp,
    };

    try {
      await channel.send({
        type: 'broadcast',
        event: 'leader_event',
        payload: event,
      });
    } catch (e) {
      console.error('Failed to broadcast ban toggle:', e);
      setError(
        e instanceof Error ? e : new Error('Failed to broadcast ban toggle')
      );
    }
  }

  const setupChannel = () => {
    if (!lobbyCode) {
      return null;
    }

    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
      channelRef.current = null;
    }

    const channel = supabase.channel(`lobby:${lobbyCode}`, {
      config: {
        broadcast: { self: false },
      },
    });

    channel.on('broadcast', { event: 'leader_event' }, (payload) => {
      const event = payload.payload as LeaderBroadcastEvent;

      if (event.lobbyCode !== lobbyCode) {
        return;
      }

      if (event.type === 'ban_toggled') {
        setLeaders((prevLeaders) => {
          const updated = prevLeaders.map((leader) =>
            leader.id === event.leaderId
              ? {
                  ...leader,
                  is_banned: event.isBanned,
                  banned_by: event.isBanned ? event.userName : null,
                  banned_at: event.isBanned ? event.timestamp : null,
                }
              : leader
          );
          saveLobbyState(lobbyCode, toLeaderStates(updated));
          return updated;
        });
      }

      if (event.type === 'state_request') {
        try {
          const snapshot: LeaderBroadcastEvent = {
            type: 'state_snapshot',
            lobbyCode,
            requestId: event.requestId,
            leaders: toLeaderStates(leadersRef.current),
            sentBy: event.requester,
            timestamp: new Date().toISOString(),
          };
          channel
            .send({
              type: 'broadcast',
              event: 'leader_event',
              payload: snapshot,
            })
            .catch((e) => {
              console.error('Failed to send state snapshot:', e);
            });
        } catch (e) {
          console.error('Failed to prepare state snapshot:', e);
        }
      }

      if (event.type === 'state_snapshot') {
        if (!lastRequestIdRef.current) {
          return;
        }
        if (event.requestId !== lastRequestIdRef.current) {
          return;
        }

        const stateMap = new Map<string, LeaderState>();
        for (const state of event.leaders) {
          stateMap.set(state.id, state);
        }

        setLeaders(() => {
          const merged = mergeBaseWithState(baseLeaders, stateMap);
          saveLobbyState(lobbyCode, toLeaderStates(merged));
          return merged;
        });

        lastRequestIdRef.current = null;
      }
    });

    channel.subscribe((status) => {
      if (status === 'SUBSCRIBED') {
        setIsReconnecting(false);
        setError(null);
        reconnectionManagerRef.current.reset();

        const hasLocalState =
          (loadLobbyState(lobbyCode)?.leaders.length ?? 0) > 0;
        if (!hasLocalState) {
          const requestId = crypto.randomUUID();
          lastRequestIdRef.current = requestId;
          const requestEvent: LeaderBroadcastEvent = {
            type: 'state_request',
            lobbyCode,
            requestId,
            requester: lobbyCode,
          };
          channel
            .send({
              type: 'broadcast',
              event: 'leader_event',
              payload: requestEvent,
            })
            .catch((e) => {
              console.error('Failed to send state request:', e);
            });
        }
      }

      if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
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
    if (lobbyCode) {
      setupChannel();
    }

    return () => {
      reconnectionManagerRef.current.cancel();
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
  }, [lobbyCode]);

  return { leaders, loading, error, toggleBanLeader, isReconnecting };
}
