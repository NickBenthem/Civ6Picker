import React, { useState, useRef, useEffect } from 'react';
import { Crown, Users, RefreshCw, LogOut, User, ChevronDown, Copy } from 'lucide-react';
import { ConnectedUser } from '../hooks/useUserPresence';
import { ConfirmationDialog } from './ConfirmationDialog';

interface BanStageHeaderProps {
  userName: string;
  lobbyCode: string;
  connectedUsers: ConnectedUser[];
  isConnected: boolean;
  isReconnecting?: boolean;
  isLeaderReconnecting?: boolean;
  onSignOut: () => void;
  onChangeName: () => void;
}

export function BanStageHeader({ 
  userName, 
  lobbyCode,
  connectedUsers, 
  isConnected, 
  isReconnecting = false,
  isLeaderReconnecting = false,
  onSignOut,
  onChangeName
}: BanStageHeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const handleCopyLobbyCode = async () => {
    try {
      await navigator.clipboard.writeText(lobbyCode);
      // You could add a toast notification here if desired
    } catch (err) {
      console.error('Failed to copy lobby code:', err);
    }
  };

  const connectionStatus = getConnectionStatus();

  return (
    <>
      <div className="max-w-7xl mx-auto my-1 sm:my-2">
        {/* Title and User Info */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-3 sm:mb-4">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-white truncate">Civ6 Leader Ban Stage</h1>
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-xs sm:text-sm lg:text-base text-gray-400">Playing as:</p>
                {/* User Menu */}
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-1 text-yellow-500 font-medium hover:text-yellow-400 transition-colors duration-200 rounded px-2 py-1 hover:bg-yellow-500/10"
                  >
                    <span className="truncate max-w-[120px] sm:max-w-[200px]">{userName}</span>
                    <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Dropdown Menu */}
                  {showUserMenu && (
                    <div className="absolute top-full left-0 mt-1 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50">
                      <div className="p-2">
                        <div className="px-3 py-2 text-xs text-gray-400 border-b border-gray-700 mb-1">
                          Signed in as
                        </div>
                        <div className="px-3 py-1 text-sm text-white font-medium truncate">
                          {userName}
                        </div>
                      </div>
                      <div className="p-1">
                        <button
                          onClick={() => {
                            setShowUserMenu(false);
                            onChangeName();
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors duration-200"
                        >
                          <User className="w-4 h-4" />
                          Change Name
                        </button>
                        <button
                          onClick={() => {
                            setShowUserMenu(false);
                            setShowSignOutConfirm(true);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors duration-200"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Lobby Code Display */}
                <div className="flex items-center gap-2 text-gray-400">
                  <span className="text-xs sm:text-sm lg:text-base">Lobby:</span>
                  <div className="flex items-center gap-1 bg-gray-700/50 px-2 py-1 rounded">
                    <span className="text-xs sm:text-sm font-mono text-yellow-500">{lobbyCode}</span>
                    <button
                      onClick={handleCopyLobbyCode}
                      className="p-1 text-gray-400 hover:text-white transition-colors"
                      title="Copy lobby code"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
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

      {/* Sign Out Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={showSignOutConfirm}
        onClose={() => setShowSignOutConfirm(false)}
        onConfirm={onSignOut}
        title="Sign Out"
        message="Are you sure you want to sign out? You'll need to enter your name again when you return."
        confirmText="Sign Out"
        cancelText="Cancel"
        variant="danger"
      />
    </>
  );
} 