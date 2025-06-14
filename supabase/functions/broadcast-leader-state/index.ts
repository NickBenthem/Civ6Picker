import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  // Handle SSE connection
  if (req.method === 'GET') {
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        // Create a Supabase client
        const supabaseClient = createClient(
          Deno.env.get('SUPABASE_URL') ?? '',
          Deno.env.get('SUPABASE_ANON_KEY') ?? '',
        );

        // Subscribe to leader changes
        const channel = supabaseClient
          .channel('leader-changes')
          .on(
            'broadcast',
            { event: 'leader-updated' },
            (payload) => {
              const data = `event: leader-updated\ndata: ${JSON.stringify(payload.payload)}\n\n`;
              controller.enqueue(encoder.encode(data));
            }
          )
          .subscribe();

        // Handle client disconnect
        req.signal.addEventListener('abort', () => {
          channel.unsubscribe();
          controller.close();
        });
      }
    });

    return new Response(stream, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  }

  // Handle POST requests for updating leader state
  if (req.method === 'POST') {
    try {
      // Create a Supabase client with the Auth context of the function
      const supabaseClient = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_ANON_KEY') ?? '',
        {
          global: {
            headers: { Authorization: req.headers.get('Authorization')! },
          },
        }
      );

      // Get the request body
      const { leaderId, userName, isBanned } = await req.json();

      // Update the leader in the database
      const { data: updatedLeader, error: updateError } = await supabaseClient
        .from('leaders')
        .update({
          is_banned: isBanned,
          banned_by: isBanned ? userName : null,
          banned_at: isBanned ? new Date().toISOString() : null,
        })
        .eq('id', leaderId)
        .select('*, civilization:civilizations(*)')
        .single();

      if (updateError) {
        throw updateError;
      }

      // Broadcast the update to all connected clients
      const { error: broadcastError } = await supabaseClient
        .channel('leader-changes')
        .send({
          type: 'broadcast',
          event: 'leader-updated',
          payload: updatedLeader,
        });

      if (broadcastError) {
        throw broadcastError;
      }

      return new Response(
        JSON.stringify({ data: updatedLeader }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      );
    } catch (error) {
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