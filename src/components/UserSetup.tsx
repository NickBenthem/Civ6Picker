import React, { useState, useEffect } from 'react';
import { Users, Crown } from 'lucide-react';

interface UserSetupProps {
  onUserReady: (name: string) => void;
}

export function UserSetup({ onUserReady }: UserSetupProps) {
  const [userName, setUserName] = useState('');

  // Reset viewport when component mounts and before transitioning
  useEffect(() => {
    // Ensure proper viewport on mount
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover');
    }
    
    // Prevent zoom and scroll on input focus
    const preventZoomAndScroll = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT') {
        // Force viewport to stay at scale 1
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport) {
          viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover');
        }
        
        // Prevent any transform scaling
        document.body.style.transform = 'scale(1)';
        document.body.style.transformOrigin = 'top left';
        
        // Prevent scroll position changes
        const currentScrollY = window.scrollY;
        setTimeout(() => {
          window.scrollTo(0, currentScrollY);
        }, 0);
      }
    };
    
    // Add event listeners
    document.addEventListener('focusin', preventZoomAndScroll);
    document.addEventListener('touchstart', preventZoomAndScroll);
    
    return () => {
      document.removeEventListener('focusin', preventZoomAndScroll);
      document.removeEventListener('touchstart', preventZoomAndScroll);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim()) {
      // Reset viewport and scroll position before transitioning to prevent zoom issues
      window.scrollTo(0, 0);
      document.body.style.transform = 'scale(1)';
      document.body.style.transformOrigin = 'top left';
      
      // Force a reflow to ensure the reset takes effect
      document.body.offsetHeight;
      
      // Small delay to ensure the reset takes effect before transition
      setTimeout(() => {
        onUserReady(userName.trim());
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-2 sm:p-4 mobile-container overflow-x-hidden">
      <div className="bg-gray-800 rounded-xl border-2 border-yellow-500/20 p-4 sm:p-6 lg:p-8 max-w-sm sm:max-w-md w-full shadow-2xl">
        <div className="text-center mb-4 sm:mb-6 lg:mb-8">
          <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
            <Crown className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-yellow-500" />
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Civ6 Ban Stage</h1>
          </div>
          <p className="text-xs sm:text-sm lg:text-base text-gray-400">Join the multiplayer leader ban phase</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 lg:space-y-6">
          <div>
            <label htmlFor="userName" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">
              Your Name
            </label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-2 sm:px-3 lg:px-4 py-2 sm:py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 text-sm sm:text-base"
              placeholder="Enter your name..."
              maxLength={20}
              required
              style={{ fontSize: '16px', transform: 'scale(1)', transformOrigin: 'top left' }}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center gap-2 mobile-touch-target"
          >
            <Users className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm lg:text-base">Join Ban Stage</span>
          </button>
        </form>

        <div className="mt-3 sm:mt-4 lg:mt-6 text-center text-xs sm:text-sm text-gray-500">
          <p>Vote to ban leaders by clicking on them</p>
        </div>
      </div>
    </div>
  );
}