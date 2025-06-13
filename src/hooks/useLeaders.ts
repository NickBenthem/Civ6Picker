import { useState, useEffect } from 'react';
import { supabase, type Leader } from '../lib/supabase';

export function useLeaders() {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch initial data
    fetchLeaders();

    // Subscribe to real-time changes
    const subscription = supabase
      .channel('leaders-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'leaders'
        },
        (payload) => {
          console.log('Leader update received:', payload);
          // For real-time updates, we need to re-fetch the full data
          // because payload.new doesn't contain joined relations.
          // This ensures all leader details (including civilization, units, infra) are up-to-date.
          fetchLeaders();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function fetchLeaders() {
    try {
      const { data, error } = await supabase
        .from('leaders')
        .select(`
          *,
          civilization: civilizations (
            id,
            name,
            image_key,
            unique_units (
              id,
              name,
              image_key
            ),
            unique_infrastructure (
              id,
              name,
              image_key
            )
          )
        `)
        .order('name');

      if (error) {
        console.error('Error fetching leaders:', error);
        throw error;
      }
      
      console.log('Fetched leaders:', data);
      setLeaders(data || []);
    } catch (error) {
      console.error('Error fetching leaders:', error);
    } finally {
      setLoading(false);
    }
  }

  async function toggleBanLeader(leaderId: string, userName: string) {
    let currentLeaderState: { is_banned: boolean } | null = null;
    
    try {
      console.log('Attempting to toggle ban for leader:', leaderId, 'by:', userName);
      
      // First check current state of the leader
      const { data: currentLeader, error: fetchError } = await supabase
        .from('leaders')
        .select('is_banned, banned_by')
        .eq('id', leaderId)
        .single();

      if (fetchError) {
        console.error('Error fetching current leader state:', fetchError);
        throw fetchError;
      }

      currentLeaderState = currentLeader;
      const isBanning = !currentLeader?.is_banned;
      console.log('Current state - is_banned:', currentLeader?.is_banned, 'Action:', isBanning ? 'BAN' : 'UNBAN');

      // Update the leader
      const updateData = isBanning 
        ? {
            is_banned: true,
            banned_by: userName,
            banned_at: new Date().toISOString()
          }
        : {
            is_banned: false,
            banned_by: null,
            banned_at: null
          };

      const { data, error } = await supabase
        .from('leaders')
        .update(updateData)
        .eq('id', leaderId)
        .select(`
          *,
          civilization: civilizations (
            id,
            name,
            image_key,
            unique_units (
              id,
              name,
              image_key
            ),
            unique_infrastructure (
              id,
              name,
              image_key
            )
          )
        `);

      if (error) {
        console.error('Error updating leader:', error);
        throw error;
      }

      console.log('Leader updated successfully:', data);

      // Record the vote
      const { error: voteError } = await supabase
        .from('votes')
        .insert({
          leader_id: leaderId,
          user_id: userName,
          vote_type: isBanning ? 'ban' : 'unban'
        });

      if (voteError) {
        console.error('Error recording vote:', voteError);
        // Don't throw here as the ban/unban was successful
      }

      // Force a refresh of the leaders data
      await fetchLeaders();

    } catch (error) {
      console.error('Error in toggleBanLeader function:', error);
      alert(`Failed to ${currentLeaderState?.is_banned ? 'unban' : 'ban'} leader. Please try again.`);
    }
  }

  return { leaders, loading, toggleBanLeader, refetch: fetchLeaders };
}