import React from 'react';
import { Crown, Users, RefreshCw } from 'lucide-react';
import { ConnectedUser } from '../hooks/useUserPresence';

interface BanStageHeaderProps {
  userName: string;
  connectedUsers: ConnectedUser[];
  isConnected: boolean;
  isReconnecting?: boolean;
  isLeaderReconnecting?: boolean;
}

export function BanStageHeader({ 
  userName, 
  connectedUsers, 
  isConnected, 
  isReconnecting = false,
  isLeaderReconnecting = false 
}: BanStageHeaderProps) {
  // Sort connected users by who joined first (online_at timestamp)
  const sortedConnectedUsers = React.useMemo(() => {
    return [...connectedUsers].sort((a, b) => {
      const timeA = new Date(a.online_at).getTime();
      const timeB = new Date(b.online_at).getTime();
      return timeA - timeB; // Sort by earliest first
    });
  }, [connectedUsers]);

  const getConnectionStatus = () => {
    if (isReconnecting || isLeaderReconnecting) {
      return {
        icon: <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />,
        text: 'Reconnecting...',
        color: 'text-yellow-500',
        bgColor: 'bg-yellow-500'
      };
    }
    
    if (isConnected) {
      return {
        icon: null,
        text: 'Connected',
        color: 'text-gray-400',
        bgColor: 'bg-green-500'
      };
    }
    
    return {
      icon: null,
      text: 'Disconnected',
      color: 'text-gray-400',
      bgColor: 'bg-red-500'
    };
  };

  const connectionStatus = getConnectionStatus();

  return (
    <div className="max-w-7xl mx-auto mb-4 sm:mb-6">
      {/* Title and User Info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-3 sm:mb-4">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500 flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-white truncate">Civ6 Leader Ban Stage</h1>
            <p className="text-xs sm:text-sm lg:text-base text-gray-400">Playing as: <span className="text-yellow-500 font-medium">{userName}</span></p>
          </div>
        </div>
        
        {/* User List - More compact on mobile */}
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg border border-gray-700 p-2 sm:p-3 flex-shrink-0 w-full sm:w-[280px] sm:max-w-[400px]">
          <div className="flex items-center gap-2 text-gray-300 mb-1">
            <Users className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            <span className="font-medium text-xs sm:text-sm lg:text-base truncate">{connectedUsers.length} Online</span>
            <div className="flex items-center gap-1 ml-auto flex-shrink-0">
              <div 
                className={`w-2 h-2 rounded-full ${connectionStatus.bgColor}`} 
              />
              <span className={`text-xs ${connectionStatus.color} hidden sm:inline flex items-center gap-1`}>
                {connectionStatus.icon}
                {connectionStatus.text}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-1 max-h-12 sm:max-h-16 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
            {sortedConnectedUsers.map((u) => (
              <div
                key={u.id}
                className="text-xs sm:text-sm text-gray-400 bg-gray-700/50 px-1 sm:px-2 py-1 rounded flex-shrink-0"
                title={u.name ?? undefined}
              >
                {u.name ?? 'Unknown'}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 