import { useState, useEffect, useCallback } from 'react';
import { supabase, type Cursor } from '../lib/supabase';

const CURSOR_COLORS = [
  '#EF4444', '#F97316', '#EAB308', '#22C55E', 
  '#06B6D4', '#3B82F6', '#8B5CF6', '#EC4899'
];

export function useCursors(userName: string) {
  const [cursors, setCursors] = useState<Cursor[]>([]);
  const [userColor] = useState(() => 
    CURSOR_COLORS[Math.floor(Math.random() * CURSOR_COLORS.length)]
  );

  useEffect(() => {
    // Subscribe to cursor changes
    const subscription = supabase
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
            setCursors(prev => {
              const existing = prev.find(c => c.user_id === payload.new.user_id);
              if (existing) {
                return prev.map(c => 
                  c.user_id === payload.new.user_id ? payload.new : c
                );
              } else {
                return [...prev, payload.new];
              }
            });
          } else if (payload.eventType === 'DELETE') {
            setCursors(prev => prev.filter(c => c.user_id !== payload.old.user_id));
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const updateCursor = useCallback(async (x: number, y: number) => {
    try {
      await supabase
        .from('cursors')
        .upsert({
          user_id: userName,
          x,
          y,
          user_name: userName,
          color: userColor,
          updated_at: new Date().toISOString()
        });
    } catch (error) {
      console.error('Error updating cursor:', error);
    }
  }, [userName, userColor]);

  return { cursors: cursors.filter(c => c.user_id !== userName), updateCursor, userColor };
}