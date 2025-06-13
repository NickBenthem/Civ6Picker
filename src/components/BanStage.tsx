import React, { useEffect, useCallback } from 'react';
import { Crown, Users, Ban, RefreshCw } from 'lucide-react';
import { LeaderCard } from './LeaderCard';
import { CursorOverlay } from './CursorOverlay';
import { useLeaders } from '../hooks/useLeaders';
import { useCursors } from '../hooks/useCursors';

interface BanStageProps {
  userName: string;
  onBack: () => void;
}

export function BanStage({ userName, onBack }: BanStageProps) {
  const { leaders, loading, toggleBanLeader, refetch } = useLeaders();
  const { cursors, updateCursor } = useCursors(userName);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    updateCursor(e.clientX, e.clientY);
  }, [updateCursor]);

  const handleToggleBan = useCallback((leaderId: string) => {
    console.log('BanStage handleToggleBan called for:', leaderId, 'by:', userName);
    toggleBanLeader(leaderId, userName);
  }, [toggleBanLeader, userName]);

  const bannedCount = leaders.filter(leader => leader.is_banned).length;
  const totalCount = leaders.length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Crown className="w-12 h-12 text-yellow-500 animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">Loading leaders...</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4"
      onMouseMove={handleMouseMove}
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Crown className="w-8 h-8 text-yellow-500" />
            <div>
              <h1 className="text-3xl font-bold text-white">Civ6 Leader Ban Stage</h1>
              <p className="text-gray-400">Playing as: <span className="text-yellow-500 font-medium">{userName}</span></p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={refetch}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
              title="Refresh data"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <button
              onClick={onBack}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              Leave Session
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-400" />
              <span className="text-gray-400">Active Players</span>
            </div>
            <p className="text-2xl font-bold text-white mt-1">{cursors.length + 1}</p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-2">
              <Ban className="w-5 h-5 text-red-400" />
              <span className="text-gray-400">Leaders Banned</span>
            </div>
            <p className="text-2xl font-bold text-white mt-1">{bannedCount}</p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-yellow-400" />
              <span className="text-gray-400">Available</span>
            </div>
            <p className="text-2xl font-bold text-white mt-1">{totalCount - bannedCount}</p>
          </div>
        </div>
      </div>

      {/* Leaders Grid */}
      <div className="max-w-7xl mx-auto">
        {leaders.length === 0 ? (
          <div className="text-center py-12">
            <Crown className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No leaders found</p>
            <button
              onClick={refetch}
              className="mt-4 px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-black rounded-lg transition-colors"
            >
              Retry Loading
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {leaders.map((leader) => (
              <LeaderCard
                key={leader.id}
                leader={leader}
                onToggleBan={handleToggleBan}
              />
            ))}
          </div>
        )}
      </div>

      {/* Cursor Overlay */}
      <CursorOverlay cursors={cursors} />

      {/* Instructions */}
      <div className="fixed bottom-4 left-4 bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 border border-gray-700 max-w-xs">
        <h3 className="text-white font-semibold mb-2">How to Play</h3>
        <ul className="text-sm text-gray-300 space-y-1">
          <li>• Click on a leader to ban them</li>
          <li>• Click on a banned leader to unban them</li>
          <li>• See other players' cursors in real-time</li>
          <li>• All actions are visible to everyone</li>
        </ul>
      </div>

      {/* Debug Info (remove in production) */}
      <div className="fixed bottom-4 right-4 bg-gray-800/90 backdrop-blur-sm rounded-lg p-3 border border-gray-700 text-xs text-gray-400">
        <div>Total Leaders: {totalCount}</div>
        <div>Banned: {bannedCount}</div>
        <div>Available: {totalCount - bannedCount}</div>
      </div>
    </div>
  );
}