import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Create a single Supabase client instance
const supabaseClient = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_ANON_KEY') ?? '',
);

// Create a single shared channel instance
const presenceChannel = supabaseClient.channel('user-presence');

// Subscribe to the channel immediately
presenceChannel.subscribe((status) => {
  console.log('Channel status:', status);
});

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  // Handle WebSocket connection
  if (req.method === 'GET' && req.headers.get('upgrade') === 'websocket') {
    try {
      const { socket, response } = Deno.upgradeWebSocket(req);
      console.log('New WebSocket connection established');

      // Subscribe to presence updates using the shared channel
      presenceChannel
        .on(
          'broadcast',
          { event: 'presence-updated' },
          (payload) => {
            console.log('Broadcasting presence update:', payload);
            socket.send(JSON.stringify({
              type: 'presence-updated',
              data: payload.payload
            }));
          }
        );

      // Handle WebSocket messages
      socket.onmessage = async (event) => {
        try {
          const { type, data } = JSON.parse(event.data);
          if (type === 'ping') {
            socket.send(JSON.stringify({ type: 'pong' }));
          }
        } catch (error) {
          console.error('Error handling WebSocket message:', error);
        }
      };

      // Handle WebSocket close
      socket.onclose = () => {
        console.log('WebSocket connection closed');
      };

      return response;
    } catch (error) {
      console.error('WebSocket upgrade failed:', error);
      return new Response('WebSocket upgrade failed', { status: 500 });
    }
  }

  // Handle regular HTTP GET request
  if (req.method === 'GET') {
    try {
      // Get all connected users
      const { data: connectedUsers, error: fetchError } = await supabaseClient
        .from('connected_users')
        .select('*')
        .order('last_seen', { ascending: false });

      if (fetchError) throw fetchError;

      return new Response(
        JSON.stringify({ data: connectedUsers }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      );
    } catch (error) {
      console.error('Error fetching connected users:', error);
      return new Response(
        JSON.stringify({ error: error.message }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500,
        }
      );
    }
  }

  // Handle POST requests for updating user presence
  if (req.method === 'POST') {
    try {
      const { userName, isOnline } = await req.json();
      console.log('Received presence update request:', { userName, isOnline });

      if (isOnline) {
        // Insert or update user presence
        const { error: upsertError } = await supabaseClient
          .from('connected_users')
          .upsert({
            user_name: userName,
            last_seen: new Date().toISOString(),
          }, {
            onConflict: 'user_name'
          });

        if (upsertError) throw upsertError;
      } else {
        // Remove user from connected users
        const { error: deleteError } = await supabaseClient
          .from('connected_users')
          .delete()
          .eq('user_name', userName);

        if (deleteError) throw deleteError;
      }

      // Get all connected users
      const { data: connectedUsers, error: fetchError } = await supabaseClient
        .from('connected_users')
        .select('*')
        .order('last_seen', { ascending: false });

      if (fetchError) throw fetchError;

      console.log('Broadcasting to all clients:', connectedUsers);

      // Broadcast the update to all connected clients using the shared channel
      const { error: broadcastError } = await presenceChannel
        .send({
          type: 'broadcast',
          event: 'presence-updated',
          payload: connectedUsers,
        });

      if (broadcastError) {
        console.error('Broadcast error:', broadcastError);
        throw broadcastError;
      }

      return new Response(
        JSON.stringify({ data: connectedUsers }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      );
    } catch (error) {
      console.error('Error handling presence update:', error);
      return new Response(
        JSON.stringify({ error: error.message }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      );
    }
  }

  return new Response('Method not allowed', { status: 405 });
}); 