import { useState, useEffect } from 'react';
import { fetchLeaders, type Leader } from '../lib/supabase';

const supabaseUrl  = import.meta.env.NEXT_PUBLIC_SUPABASE_URL  as string;

const API_URL = `${supabaseUrl}/functions/v1`;

function sortLeaders(leaders: Leader[]): Leader[] {
  return [...leaders].sort((a, b) => {
    // First sort by civilization name
    const leaderA = a.name || '';
    const leaderB = b.name || '';
    return leaderA.localeCompare(leaderB);
  });
}

export function useLeaders() {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  async function fetchLeadersData() {
    try {
      const data = await fetchLeaders();
      setLeaders(sortLeaders(data));
    } catch (e) {
      setError(e instanceof Error ? e : new Error('Failed to fetch leaders'));
    } finally {
      setLoading(false);
    }
  }

  async function toggleBanLeader(leaderId: string, userName: string) {
    const currentLeader = leaders.find(l => l.id === leaderId);
    if (!currentLeader) throw new Error('Leader not found');

    try {
      // Update the local state immediately for better UX
      setLeaders(prevLeaders => 
        sortLeaders(prevLeaders.map(leader => 
          leader.id === leaderId 
            ? {
                ...leader,
                is_banned: !leader.is_banned,
                banned_by: !leader.is_banned ? userName : null,
                banned_at: !leader.is_banned ? new Date().toISOString() : null
              }
            : leader
        ))
      );

      // Call the broadcast-leader-state endpoint
      const response = await fetch(`${API_URL}/broadcast-leader-state`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          leaderId,
          userName,
          isBanned: !currentLeader.is_banned
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update ban status');
      }
    } catch (e) {
      setError(e instanceof Error ? e : new Error('Failed to toggle ban'));
      // Revert the local state change on error
      setLeaders(prevLeaders => 
        sortLeaders(prevLeaders.map(leader => 
          leader.id === leaderId 
            ? {
                ...leader,
                is_banned: currentLeader.is_banned,
                banned_by: currentLeader.banned_by,
                banned_at: currentLeader.banned_at
              }
            : leader
        ))
      );
    }
  }

  useEffect(() => {
    let eventSource: EventSource;

    async function setupLeaders() {
      try {
        // Initial fetch
        await fetchLeadersData();

        // Setup Server-Sent Events connection
        eventSource = new EventSource(`${API_URL}/broadcast-leader-state`);

        eventSource.addEventListener('leader-updated', (event) => {
          const updatedLeader = JSON.parse(event.data);
          setLeaders(prevLeaders => 
            sortLeaders(prevLeaders.map(leader => 
              leader.id === updatedLeader.id ? updatedLeader : leader
            ))
          );
        });

        eventSource.onerror = (error) => {
          console.error('EventSource failed:', error);
          setError(new Error('Failed to maintain realtime connection'));
        };

      } catch (e) {
        setError(e instanceof Error ? e : new Error('Failed to setup leaders'));
      }
    }

    setupLeaders();

    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, []);

  return { leaders, loading, error, toggleBanLeader };
}