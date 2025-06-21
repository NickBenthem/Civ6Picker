import React, { useState, useEffect } from 'react';
import { Users, Crown, Copy, RefreshCw } from 'lucide-react';
import { generateLobbyCode, isValidLobbyCode, normalizeLobbyCode } from '../utils/lobbyUtils';

interface LobbySetupProps {
  onReady: (lobbyCode: string, userName: string) => void;
  initialLobbyCode?: string;
}

export function LobbySetup({ onReady, initialLobbyCode }: LobbySetupProps) {
  const [lobbyCode, setLobbyCode] = useState('');
  const [userName, setUserName] = useState('');
  const [isLobbyValid, setIsLobbyValid] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  // Set initial lobby code on component mount
  useEffect(() => {
    if (initialLobbyCode && isValidLobbyCode(initialLobbyCode)) {
      setLobbyCode(initialLobbyCode);
    } else {
      setLobbyCode(generateLobbyCode());
    }
  }, [initialLobbyCode]);

  // Validate lobby code whenever it changes
  useEffect(() => {
    setIsLobbyValid(isValidLobbyCode(lobbyCode));
  }, [lobbyCode]);

  // Check if form is valid (both lobby code and username)
  useEffect(() => {
    setIsFormValid(isLobbyValid && userName.trim().length > 0);
  }, [isLobbyValid, userName]);

  const handleLobbyCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLobbyCode(value);
  };

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handleGenerateNewCode = () => {
    setLobbyCode(generateLobbyCode());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      const normalizedCode = normalizeLobbyCode(lobbyCode);
      onReady(normalizedCode, userName.trim());
    }
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(lobbyCode);
      // You could add a toast notification here if desired
    } catch (err) {
      console.error('Failed to copy lobby code:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-start sm:items-center justify-center p-2 sm:p-4 mobile-container overflow-x-hidden pt-16 sm:pt-4">
      <div className="bg-gray-800 rounded-xl border-2 border-yellow-500/20 p-4 sm:p-6 lg:p-8 max-w-sm sm:max-w-md w-full shadow-2xl">
        <div className="text-center mb-4 sm:mb-6 lg:mb-8">
          <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
            <Crown className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-yellow-500" />
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Civ6 Ban Stage</h1>
          </div>
          <p className="text-xs sm:text-sm lg:text-base text-gray-400">Join the multiplayer leader ban phase</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 lg:space-y-6">
          {/* Lobby Code Input */}
          <div>
            <label htmlFor="lobbyCode" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">
              Lobby Code
            </label>
            <div className="relative">
              <input
                type="text"
                id="lobbyCode"
                value={lobbyCode}
                onChange={handleLobbyCodeChange}
                className={`w-full px-2 sm:px-3 lg:px-4 py-2 sm:py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 text-sm sm:text-base font-mono ${
                  isLobbyValid 
                    ? 'border-green-500 focus:border-green-500 focus:ring-green-500' 
                    : 'border-gray-600 focus:border-yellow-500 focus:ring-yellow-500'
                }`}
                placeholder="XXX-XXX"
                maxLength={7}
                required
                style={{ fontSize: '16px', transform: 'scale(1)', transformOrigin: 'top left' }}
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                <button
                  type="button"
                  onClick={handleCopyToClipboard}
                  className="p-1 text-gray-400 hover:text-white transition-colors"
                  title="Copy lobby code"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleGenerateNewCode}
                  className="p-1 text-gray-400 hover:text-white transition-colors"
                  title="Generate new code"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>
            {!isLobbyValid && lobbyCode && (
              <p className="text-xs text-red-400 mt-1">Please enter a valid lobby code (XXX-XXX)</p>
            )}
          </div>

          {/* Username Input */}
          <div>
            <label htmlFor="userName" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">
              Your Name
            </label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={handleUserNameChange}
              className="w-full px-2 sm:px-3 lg:px-4 py-2 sm:py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 text-sm sm:text-base"
              placeholder="Enter your name..."
              maxLength={20}
              required
              style={{ fontSize: '16px', transform: 'scale(1)', transformOrigin: 'top left' }}
            />
          </div>

          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center gap-2 mobile-touch-target ${
              isFormValid
                ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Users className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm lg:text-base">Join Ban Stage</span>
          </button>
        </form>

        <div className="mt-3 sm:mt-4 lg:mt-6 text-center text-xs sm:text-sm text-gray-500">
          <p>Share the lobby code with other players to join the same session</p>
        </div>
      </div>
    </div>
  );
} 