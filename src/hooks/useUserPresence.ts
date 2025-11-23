import { useEffect, useRef, useState } from 'react';
import { createReconnectionManager } from '../utils/reconnectionManager';

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */
export interface ConnectedUser {
  id: string;
  name: string | null;
  online_at: string;
}

type PresenceEvent =
  | {
      type: 'presence_join';
      lobbyCode: string;
      userId: string;
      name: string;
      online_at: string;
    }
  | {
      type: 'presence_leave';
      lobbyCode: string;
      userId: string;
    };

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

  const socketRef = useRef<WebSocket | null>(null);

  const reconnectionManagerRef = useRef(
    createReconnectionManager({
      maxRetries: 15,
      baseDelay: 1000,
      maxDelay: 30000,
      jitterFactor: 0.15,
      onRetry: (attempt, delay) => {
        console.log(
          `Reconnecting to presence socket (attempt ${attempt}/${15}) in ${delay}ms`
        );
        setIsReconnecting(true);
        setError(
          new Error(
            `Connection lost. Reconnecting... (attempt ${attempt})`
          )
        );
      },
      onMaxRetriesReached: () => {
        console.error('Max reconnection attempts reached for presence socket');
        setIsReconnecting(false);
        setError(
          new Error(
            'Failed to reconnect after multiple attempts. Please refresh the page.'
          )
        );
      },
    })
  );

  const sendPresenceEvent = (event: PresenceEvent) => {
    const socket = socketRef.current;
    if (!socket || socket.readyState !== WebSocket.OPEN) return;
    try {
      socket.send(JSON.stringify(event));
    } catch (e) {
      console.error('Failed to send presence event:', e);
    }
  };

  const setupSocket = () => {
    if (!lobbyCode) return null;

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
      setIsConnected(true);
      setIsReconnecting(false);
      setError(null);
      reconnectionManagerRef.current.reset();

      // Identify the lobby
      const initMessage = {
        type: 'init',
        lobbyCode,
      };

      try {
        ws.send(JSON.stringify(initMessage));
      } catch (e) {
        console.error('Failed to send presence init message:', e);
      }

      // Announce our presence
      const joinEvent: PresenceEvent = {
        type: 'presence_join',
        lobbyCode,
        userId,
        name,
        online_at: new Date().toISOString(),
      };
      sendPresenceEvent(joinEvent);
    });

    ws.addEventListener('message', (eventMessage) => {
      let event: PresenceEvent;
      try {
        event = JSON.parse(String(eventMessage.data)) as PresenceEvent;
      } catch {
        return;
      }

      if (event.lobbyCode !== lobbyCode) {
        return;
      }

      if (event.type === 'presence_join') {
        setConnectedUsers((prev) => {
          const existing = prev.find((u) => u.id === event.userId);
          if (existing) {
            return prev.map((u) =>
              u.id === event.userId
                ? {
                    ...u,
                    name: event.name,
                    online_at: event.online_at,
                  }
                : u
            );
          }
          return [
            ...prev,
            {
              id: event.userId,
              name: event.name,
              online_at: event.online_at,
            },
          ];
        });
      }

      if (event.type === 'presence_leave') {
        setConnectedUsers((prev) =>
          prev.filter((u) => u.id !== event.userId)
        );
      }
    });

    ws.addEventListener('error', (err) => {
      console.error('Presence socket error:', err);
      setIsConnected(false);
      setIsReconnecting(true);
      reconnectionManagerRef.current.scheduleRetry(() => {
        setupSocket();
      });
    });

    ws.addEventListener('close', () => {
      setIsConnected(false);
      setIsReconnecting(true);
      reconnectionManagerRef.current.scheduleRetry(() => {
        setupSocket();
      });
    });

    socketRef.current = ws;
    return ws;
  };

  useEffect(() => {
    const handleUnload = () => {
      const leaveEvent: PresenceEvent = {
        type: 'presence_leave',
        lobbyCode,
        userId,
      };
      sendPresenceEvent(leaveEvent);

      if (socketRef.current) {
        try {
          socketRef.current.close();
        } catch {
          // ignore
        }
        socketRef.current = null;
      }
    };

    window.addEventListener('pagehide', handleUnload);

    if (lobbyCode) {
      setupSocket();
    }

    return () => {
      window.removeEventListener('pagehide', handleUnload);
      reconnectionManagerRef.current.cancel();
      if (socketRef.current) {
        try {
          const leaveEvent: PresenceEvent = {
            type: 'presence_leave',
            lobbyCode,
            userId,
          };
          sendPresenceEvent(leaveEvent);
          socketRef.current.close();
        } catch {
          // ignore
        }
        socketRef.current = null;
      }
    };
  }, [userId, name, lobbyCode]);

  return { connectedUsers, isConnected, error, isReconnecting };
}
