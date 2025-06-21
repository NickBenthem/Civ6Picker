import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-requested-with',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Max-Age': '86400',
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

        // Get lobby code from query parameters
        const url = new URL(req.url);
        const lobbyCode = url.searchParams.get('lobbyCode');
        
        if (!lobbyCode) {
          controller.error(new Error('Lobby code is required'));
          return;
        }

        // Subscribe to leader changes for this specific lobby
        const channel = supabaseClient
          .channel(`leader-changes-${lobbyCode}`)
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
      const { leaderId, userName, lobbyCode, isBanned } = await req.json();

      if (!lobbyCode) {
        throw new Error('Lobby code is required');
      }

      // Get or create lobby
      const { data: lobbyData, error: lobbyError } = await supabaseClient
        .rpc('get_or_create_lobby', { lobby_code_param: lobbyCode });

      if (lobbyError) {
        throw lobbyError;
      }

      if (isBanned) {
        // Add ban vote using upsert to handle the unique constraint properly
        console.log(`Upserting ban vote for leader ${leaderId} in lobby ${lobbyData} by user ${userName}`);
        
        const { error: voteError } = await supabaseClient
          .from('votes')
          .upsert({
            leader_id: leaderId,
            user_id: userName,
            lobby_id: lobbyData,
            vote_type: 'ban'
          }, {
            onConflict: 'leader_id,lobby_id,vote_type'
          });

        if (voteError) {
          console.error('Error upserting ban vote:', voteError);
          throw voteError;
        }
        
        console.log(`Successfully upserted ban vote for user ${userName}`);
      } else {
        // Remove ban vote - remove any existing votes for this leader in this lobby
        console.log(`Removing ban vote for leader ${leaderId} in lobby ${lobbyData}`);
        
        const { error: deleteError } = await supabaseClient
          .from('votes')
          .delete()
          .eq('leader_id', leaderId)
          .eq('lobby_id', lobbyData)
          .eq('vote_type', 'ban');

        if (deleteError) {
          console.error('Error deleting ban vote:', deleteError);
          throw deleteError;
        }
        
        console.log(`Successfully removed ban vote`);
      }

      // Get the updated leader with ban status
      const { data: leaderData, error: leaderError } = await supabaseClient
        .from('leaders')
        .select(`
          *,
          civilization:civilization_id (
            *,
            unique_units(*),
            unique_infrastructure(*)
          )
        `)
        .eq('id', leaderId)
        .single();

      if (leaderError) {
        throw leaderError;
      }

      // Check if leader is banned in this lobby - get all ban votes and find the most recent one
      const { data: voteData, error: voteError } = await supabaseClient
        .from('votes')
        .select('*')
        .eq('leader_id', leaderId)
        .eq('lobby_id', lobbyData)
        .eq('vote_type', 'ban')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (voteError && voteError.code !== 'PGRST116') { // PGRST116 is "not found" error
        throw voteError;
      }

      const updatedLeader = {
        ...leaderData,
        is_banned: !!voteData,
        banned_by: voteData?.user_id || null,
        banned_at: voteData?.created_at || null,
      };

      // Broadcast the update to all connected clients in this lobby
      const { error: broadcastError } = await supabaseClient
        .channel(`leader-changes-${lobbyCode}`)
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