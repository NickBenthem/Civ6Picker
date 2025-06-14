import { useState, useEffect, useCallback } from 'react';
import { supabase, type Cursor } from '../lib/supabase';

const CURSOR_COLORS = [
  '#FF0000', // Red
  '#00FF00', // Green
  '#0000FF', // Blue
  '#FFFF00', // Yellow
  '#FF00FF', // Magenta
  '#00FFFF', // Cyan
  '#FFA500', // Orange
  '#800080', // Purple
  '#008000', // Dark Green
  '#800000', // Maroon
];

export function useCursors(userId: string, userName: string) {
  const [cursors, setCursors] = useState<Cursor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const updateCursor = useCallback(async (x: number, y: number) => {
    try {
      const { error } = await supabase
        .from('cursors')
        .upsert({
          user_id: userId,
          x,
          y,
          user_name: userName,
          color: CURSOR_COLORS[Math.abs(userId.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % CURSOR_COLORS.length],
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
    } catch (e) {
      setError(e instanceof Error ? e : new Error('Failed to update cursor'));
    }
  }, [userId, userName]);

  useEffect(() => {
    let subscription: any;

    async function setupCursors() {
      try {
        // Initial fetchs
        const { data, error } = await supabase
          .from('cursors')
          .select('*')
          .order('updated_at', { ascending: false });

        if (error) throw error;
        setCursors(data || []);

        // Subscribe to changes
        subscription = supabase
          .channel('cursors-changes')
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'cursors'
            },
            (payload) => {
              if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
                setCursors(current => {
                  const newCursor = payload.new as Cursor;
                  const filtered = current.filter(c => c.user_id !== newCursor.user_id);
                  return [newCursor, ...filtered];
                });
              } else if (payload.eventType === 'DELETE') {
                setCursors(current => 
                  current.filter(c => c.user_id !== payload.old.user_id)
                );
              }
            }
          )
          .subscribe();
      } catch (e) {
        setError(e instanceof Error ? e : new Error('Failed to setup cursors'));
      } finally {
        setLoading(false);
      }
    }

    setupCursors();

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  return { cursors, loading, error, updateCursor };
}