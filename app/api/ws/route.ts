export const runtime = 'edge';

type LobbyMessage = {
  type: string;
  lobbyCode?: string;
  [key: string]: unknown;
};

// Map of lobbyCode -> set of WebSocket connections
const lobbies = new Map<string, Set<WebSocket>>();

export function GET(req: Request): Response {
  if (req.headers.get('upgrade') !== 'websocket') {
    return new Response('Expected websocket', { status: 400 });
  }

  // WebSocketPair is provided by the Edge runtime
  // @ts-expect-error WebSocketPair is available in the Edge runtime
  const pair = new WebSocketPair();
  const [client, server] = Object.values(pair) as [WebSocket, WebSocket];

  let currentLobby: string | null = null;

  // The Edge runtime's server-side WebSocket has a non-standard `accept` method.
  // Cast to `any` so TypeScript doesn't complain while keeping runtime behavior.
  (server as any).accept();

  server.addEventListener('message', (event) => {
    let msg: LobbyMessage;
    try {
      msg = JSON.parse(String(event.data)) as LobbyMessage;
    } catch {
      return;
    }

    const lobbyCode = typeof msg.lobbyCode === 'string' ? msg.lobbyCode : null;
    if (!lobbyCode) {
      return;
    }

    currentLobby = lobbyCode;

    let connections = lobbies.get(lobbyCode);
    if (!connections) {
      connections = new Set();
      lobbies.set(lobbyCode, connections);
    }

    if (!connections.has(server)) {
      connections.add(server);
    }

    const payload = JSON.stringify(msg);

    // Broadcast to all other clients in the same lobby
    for (const ws of connections) {
      if (ws === server) continue;
      try {
        ws.send(payload);
      } catch {
        // If send fails, drop the connection
        connections.delete(ws);
      }
    }
  });

  const cleanup = () => {
    if (!currentLobby) return;
    const connections = lobbies.get(currentLobby);
    if (!connections) return;

    connections.delete(server);
    if (connections.size === 0) {
      lobbies.delete(currentLobby);
    }
  };

  server.addEventListener('close', cleanup);
  server.addEventListener('error', cleanup);

  // @ts-expect-error webSocket is a valid ResponseInit option in the Edge runtime
  return new Response(null, { status: 101, webSocket: client });
}

