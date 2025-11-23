import { useEffect, useMemo, useRef, useState } from 'react';
import {
  type BaseLeader,
  type Leader,
  type LeaderState,
} from '../lib/supabase';
import { baseLeaders } from '../data/leaders';
import { loadLobbyState, saveLobbyState } from '../utils/lobbyStateStorage';
import { createReconnectionManager } from '../utils/reconnectionManager';

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
  const socketRef = useRef<WebSocket | null>(null);
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

    const socket = socketRef.current;
    if (!socket || socket.readyState !== WebSocket.OPEN) {
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
      socket.send(JSON.stringify(event));
    } catch (e) {
      console.error('Failed to broadcast ban toggle:', e);
      setError(
        e instanceof Error ? e : new Error('Failed to broadcast ban toggle')
      );
    }
  }

  const setupSocket = () => {
    if (!lobbyCode) {
      return null;
    }

    if (socketRef.current) {
      try {
        socketRef.current.close();
      } catch {
        // ignore
      }
      socketRef.current = null;
    }

    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const ws = new WebSocket(`${protocol}://${window.location.host}/api/ws`);

    ws.addEventListener('open', () => {
      setIsReconnecting(false);
      setError(null);
      reconnectionManagerRef.current.reset();

      // Identify the lobby on the server
      const initMessage = {
        type: 'init',
        lobbyCode,
      };

      try {
        ws.send(JSON.stringify(initMessage));
      } catch (e) {
        console.error('Failed to send init message:', e);
      }

      // Ask existing clients for a snapshot if we do not have local state
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
        try {
          ws.send(JSON.stringify(requestEvent));
        } catch (e) {
          console.error('Failed to send state request:', e);
        }
      }
    });

    ws.addEventListener('message', (eventMessage) => {
      let event: LeaderBroadcastEvent;
      try {
        event = JSON.parse(String(eventMessage.data)) as LeaderBroadcastEvent;
      } catch {
        return;
      }

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
        // Respond with our current snapshot
        try {
          const snapshot: LeaderBroadcastEvent = {
            type: 'state_snapshot',
            lobbyCode,
            requestId: event.requestId,
            leaders: toLeaderStates(leadersRef.current),
            sentBy: event.requester,
            timestamp: new Date().toISOString(),
          };
          ws.send(JSON.stringify(snapshot));
        } catch (e) {
          console.error('Failed to send state snapshot:', e);
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

    ws.addEventListener('error', (err) => {
      console.error('Leader socket error:', err);
      setIsReconnecting(true);
      reconnectionManagerRef.current.scheduleRetry(() => {
        setupSocket();
      });
    });

    ws.addEventListener('close', () => {
      setIsReconnecting(true);
      reconnectionManagerRef.current.scheduleRetry(() => {
        setupSocket();
      });
    });

    socketRef.current = ws;
    return ws;
  };

  useEffect(() => {
    if (lobbyCode) {
      setupSocket();
    }

    return () => {
      reconnectionManagerRef.current.cancel();
      if (socketRef.current) {
        try {
          socketRef.current.close();
        } catch {
          // ignore
        }
        socketRef.current = null;
      }
    };
  }, [lobbyCode]);

  return { leaders, loading, error, toggleBanLeader, isReconnecting };
}
