import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-requested-with',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Max-Age': '86400',
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY');
  const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
  
  try {
    // Get lobby code from query parameters
    const url = new URL(req.url);
    const lobbyCode = url.searchParams.get('lobbyCode');
    
    if (!lobbyCode) {
      return new Response(JSON.stringify({
        error: 'Lobby code is required'
      }), {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 400
      });
    }

    // Get or create lobby
    const { data: lobbyData, error: lobbyError } = await supabaseClient
      .rpc('get_or_create_lobby', { lobby_code_param: lobbyCode });

    if (lobbyError) {
      throw lobbyError;
    }

    // Get all leaders with their ban status for this lobby
    const { data, error } = await supabaseClient
      .from('leaders')
      .select(`
        *,
        civilization:civilization_id (
          *,
          unique_units(*),
          unique_infrastructure(*)
        )
      `);
    
    if (error) throw error;

    // For each leader, check if they're banned in this lobby
    const leadersWithLobbyBans = await Promise.all(
      (data || []).map(async (leader) => {
        // Check if this leader is banned in the current lobby - get the most recent vote
        const { data: voteData, error: voteError } = await supabaseClient
          .from('votes')
          .select('*')
          .eq('leader_id', leader.id)
          .eq('lobby_id', lobbyData)
          .eq('vote_type', 'ban')
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        // Ignore "not found" errors, but throw other errors
        if (voteError && voteError.code !== 'PGRST116') {
          throw voteError;
        }

        return {
          ...leader,
          is_banned: !!voteData,
          banned_by: voteData?.user_id || null,
          banned_at: voteData?.created_at || null,
        };
      })
    );
    
    return new Response(JSON.stringify(leadersWithLobbyBans), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
        'Connection': 'keep-alive'
      }
    });
  } catch (e) {
    return new Response(JSON.stringify({
      error: e instanceof Error ? e.message : 'Failed to fetch leaders'
    }), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
        'Connection': 'keep-alive'
      },
      status: 500
    });
  }
});
