import React from 'react';
import { MousePointer2 } from 'lucide-react';
import { Cursor } from '../lib/supabase';

interface CursorOverlayProps {
  cursors: Cursor[];
}

export function CursorOverlay({ cursors }: CursorOverlayProps) {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {cursors.map((cursor) => (
        <div
          key={cursor.user_id}
          className="absolute transition-all duration-100 ease-out"
          style={{
            left: cursor.x,
            top: cursor.y,
            transform: 'translate(-2px, -2px)'
          }}
        >
          <MousePointer2 
            className="w-5 h-5 drop-shadow-lg" 
            style={{ color: cursor.color }}
          />
          <div 
            className="absolute top-5 left-2 px-2 py-1 rounded text-xs font-medium text-white shadow-lg whitespace-nowrap"
            style={{ backgroundColor: cursor.color }}
          >
            {cursor.user_name}
          </div>
        </div>
      ))}
    </div>
  );
}