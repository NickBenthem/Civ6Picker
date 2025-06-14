import { useState, useEffect } from 'react';
import { supabase, type Leader } from '../lib/supabase';

export function useLeaders() {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  async function fetchLeaders() {
    try {
      const { data, error } = await supabase
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
      setLeaders(data || []);
    } catch (e) {
      setError(e instanceof Error ? e : new Error('Failed to fetch leaders'));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchLeaders();
  }, []);

  async function toggleBanLeader(leaderId: string, userName: string) {
    try {
      setLoading(true);
      const { data: currentLeader, error: fetchError } = await supabase
        .from('leaders')
        .select('is_banned')
        .eq('id', leaderId)
        .single();

      if (fetchError) throw fetchError;

      const { error: updateError } = await supabase
        .from('leaders')
        .update({
          is_banned: !currentLeader.is_banned,
          banned_by: !currentLeader.is_banned ? userName : null,
          banned_at: !currentLeader.is_banned ? new Date().toISOString() : null
        })
        .eq('id', leaderId);

      if (updateError) throw updateError;
      await fetchLeaders();
    } catch (e) {
      setError(e instanceof Error ? e : new Error('Failed to toggle ban'));
    } finally {
      setLoading(false);
    }
  }

  return { leaders, loading, error, toggleBanLeader, refetch: fetchLeaders };
}