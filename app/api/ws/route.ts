export const runtime = 'edge';

// This route is kept as a simple health check to avoid dangling
// references from earlier WebSocket experiments. The frontend no
// longer uses this route now that Supabase Realtime is handling
// all realtime communication.
export function GET(): Response {
  return new Response('WS route is idle', {
    status: 200,
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
}
