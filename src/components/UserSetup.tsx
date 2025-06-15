import React, { useState } from 'react';
import { Users, Crown } from 'lucide-react';

interface UserSetupProps {
  onUserReady: (name: string) => void;
}

export function UserSetup({ onUserReady }: UserSetupProps) {
  const [userName, setUserName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim()) {
      onUserReady(userName.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4 mobile-container overflow-x-hidden">
      <div className="bg-gray-800 rounded-xl border-2 border-yellow-500/20 p-6 sm:p-8 max-w-md w-full shadow-2xl">
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500" />
            <h1 className="text-xl sm:text-2xl font-bold text-white">Civ6 Ban Stage</h1>
          </div>
          <p className="text-sm sm:text-base text-gray-400">Join the multiplayer leader ban phase</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div>
            <label htmlFor="userName" className="block text-sm font-medium text-gray-300 mb-2">
              Your Name
            </label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-3 sm:px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 text-sm sm:text-base"
              placeholder="Enter your name..."
              maxLength={20}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center gap-2 mobile-touch-target"
          >
            <Users className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base">Join Ban Stage</span>
          </button>
        </form>

        <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-gray-500">
          <p>Vote to ban leaders by clicking on them</p>
        </div>
      </div>
    </div>
  );
}