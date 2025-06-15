import { useState, useEffect } from 'react';

const API_URL = 'https://ymllyikqdmsbldxfzmdl.supabase.co/functions/v1';

export type ConnectedUser = {
  id: string;
  user_name: string;
  last_seen: string;
  created_at: string;
};

export function useUserPresence(userName: string) {
  const [connectedUsers, setConnectedUsers] = useState<ConnectedUser[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  // Function to update presence
  async function updatePresence(isOnline: boolean) {
    try {
      console.log('Updating presence:', { userName, isOnline });
      const response = await fetch(`${API_URL}/user-presence`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userName,
          isOnline
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update presence');
      }

      const { data } = await response.json();
      console.log('Presence update response:', data);
      setConnectedUsers(data);
    } catch (e) {
      console.error('Error updating presence:', e);
      setError(e instanceof Error ? e : new Error('Failed to update presence'));
    }
  }

  useEffect(() => {
    let ws: WebSocket | null = null;
    let reconnectTimeout: NodeJS.Timeout;
    let pingInterval: NodeJS.Timeout;
    let isComponentMounted = true;
    let isInitialSetup = true;

    // Handle page unload
    const handleBeforeUnload = () => {
      // Use sendBeacon for more reliable delivery during page unload
      const data = new Blob(
        [JSON.stringify({ userName, isOnline: false })],
        { type: 'application/json' }
      );
      navigator.sendBeacon(`${API_URL}/user-presence`, data);
    };

    // Add beforeunload event listener
    window.addEventListener('beforeunload', handleBeforeUnload);

    async function setupPresence() {
      if (!isComponentMounted) return;

      try {
        // Only make initial presence update if this is the first setup
        if (isInitialSetup) {
          await updatePresence(true);
          isInitialSetup = false;
        }

        // Setup WebSocket connection
        const wsUrl = API_URL.replace('https://', 'wss://') + '/user-presence';
        ws = new WebSocket(wsUrl);

        ws.onopen = () => {
          if (!isComponentMounted) {
            ws?.close();
            return;
          }
          console.log('WebSocket connection established');
          setIsConnected(true);
          setError(null);

          // Setup ping interval to keep connection alive
          pingInterval = setInterval(() => {
            if (ws?.readyState === WebSocket.OPEN) {
              ws.send(JSON.stringify({ type: 'ping' }));
            }
          }, 30000); // Send ping every 30 seconds
        };

        ws.onmessage = (event) => {
          if (!isComponentMounted) return;
          try {
            const message = JSON.parse(event.data);
            console.log('Received WebSocket message:', message);

            if (message.type === 'presence-updated') {
              console.log('Updating connected users:', message.data);
              setConnectedUsers(message.data);
            } else if (message.type === 'pong') {
              console.log('Received pong');
            }
          } catch (e) {
            console.error('Error parsing WebSocket message:', e);
          }
        };

        ws.onerror = (error) => {
          if (!isComponentMounted) return;
          console.error('WebSocket error:', error);
          setError(new Error('Failed to maintain presence connection'));
          setIsConnected(false);
        };

        ws.onclose = () => {
          if (!isComponentMounted) return;
          console.log('WebSocket connection closed');
          setIsConnected(false);
          clearInterval(pingInterval);

          // Attempt to reconnect after a delay
          reconnectTimeout = setTimeout(() => {
            setupPresence();
          }, 3000);
        };

      } catch (e) {
        if (!isComponentMounted) return;
        console.error('Setup presence failed:', e);
        setError(e instanceof Error ? e : new Error('Failed to setup presence'));
        setIsConnected(false);
        
        // Attempt to reconnect after a delay
        reconnectTimeout = setTimeout(() => {
          setupPresence();
        }, 3000);
      }
    }

    setupPresence();

    // Cleanup function
    return () => {
      isComponentMounted = false;
      
      // Remove beforeunload event listener
      window.removeEventListener('beforeunload', handleBeforeUnload);
      
      // Close WebSocket connection
      if (ws) {
        ws.close();
        ws = null;
      }

      // Clear intervals and timeouts
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
      }
      if (pingInterval) {
        clearInterval(pingInterval);
      }

      // Update presence to offline
      updatePresence(false).catch(console.error);
    };
  }, [userName]);

  return { connectedUsers, error, isConnected };
} 