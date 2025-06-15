import React from 'react';
import { Crown, Users, Ban, RefreshCw } from 'lucide-react';
import { LeaderCard } from './LeaderCard';
import { useLeaders } from '../hooks/useLeaders';
import { useUserPresence } from '../hooks/useUserPresence';

interface BanStageProps {
  userName: string;
  onBack: () => void;
}

export function BanStage({ userName, onBack }: BanStageProps) {
  const { leaders, loading, toggleBanLeader } = useLeaders();
  const { connectedUsers, isConnected } = useUserPresence(userName, userName);

  const handleToggleBan = (leaderId: string) => {
    console.log('BanStage handleToggleBan called for:', leaderId, 'by:', userName);
    toggleBanLeader(leaderId, userName);
  };

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 pb-32">
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
          
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg border border-gray-700 p-3 min-w-[200px] max-w-[250px]">
            <div className="flex items-center gap-2 text-gray-300 mb-2">
              <Users className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium">{connectedUsers.length} Online</span>
              <div className="flex items-center gap-1 ml-auto">
                <div 
                  className={`w-2 h-2 rounded-full ${
                    isConnected 
                      ? 'bg-green-500 animate-pulse' 
                      : 'bg-red-500'
                  }`} 
                />
                <span className="text-xs text-gray-400">
                  {isConnected ? 'Connected' : 'Disconnected'}
                </span>
              </div>
            </div>
            <div className="space-y-1 max-h-[120px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
              {connectedUsers.map((u) => (
                <div
                  key={u.id}
                  className="text-sm text-gray-400 truncate"
                  title={u.name ?? undefined}
                >
                  {u.name ?? 'Unknown'}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg border border-gray-700 p-4 text-center">
            <div className="text-2xl font-bold text-white mb-1">{totalCount}</div>
            <div className="text-gray-400">Total Leaders</div>
          </div>
          <div className="bg-red-900/80 backdrop-blur-sm rounded-lg border border-red-700 p-4 text-center">
            <div className="text-2xl font-bold text-red-200 mb-1">{bannedCount}</div>
            <div className="text-red-300">Banned</div>
          </div>
          <div className="bg-green-900/80 backdrop-blur-sm rounded-lg border border-green-700 p-4 text-center">
            <div className="text-2xl font-bold text-green-200 mb-1">{totalCount - bannedCount}</div>
            <div className="text-green-300">Available</div>
          </div>
        </div>
      </div>

      {/* Leaders Grid */}
      <div className="max-w-7xl mx-auto mb-24">
        {leaders.length === 0 ? (
          <div className="text-center py-12">
            <Crown className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No leaders found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-center">
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

      {/* Footer with Instructions and Stats */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800/95 backdrop-blur-sm border-t border-gray-700 shadow-lg">
        <div className="max-w-7xl mx-auto p-4">
          <div className="flex justify-between items-stretch gap-4">
            {/* Instructions */}
            <div className="flex-1 bg-gray-900/50 px-4 py-4 rounded-lg border border-gray-700 flex flex-col justify-center">
              <h3 className="text-white font-semibold mb-2">How to use</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>Click on a leader to ban them</li>
                <li>Click on a banned leader to unban them</li>
              </ul>
            </div>

            {/* Attribution */}
            <div className="flex-1 bg-gray-900/50 px-4 py-4 rounded-lg border border-gray-700 text-center flex flex-col justify-center">
              {/* <h3 className="text-white font-semibold mb-2">About</h3> */}
              <h3 className="text-white font-semibold mb-2">
                Created by <a href="https://github.com/nickbenthem" target="_blank" rel="noopener noreferrer" className="text-yellow-500 hover:text-yellow-400 transition-colors">NickBenthem</a>
              </h3>
            </div>

            {/* Stats */}
            <div className="flex-1 bg-gray-900/50 px-4 py-4 rounded-lg border border-gray-700 text-right flex flex-col justify-center">
              <h3 className="text-white font-semibold mb-2">Leader Stats</h3>
              <div className="text-sm text-gray-300">
                <div>Total Leaders: {totalCount}</div>
                <div>Banned: {bannedCount}</div>
                <div>Available: {totalCount - bannedCount}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}