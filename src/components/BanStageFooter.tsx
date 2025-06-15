import React from 'react';

interface BanStageFooterProps {
  windowWidth: number;
  isScrolled: boolean;
  totalCount: number;
  bannedCount: number;
}

export function BanStageFooter({
  windowWidth,
  isScrolled,
  totalCount,
  bannedCount
}: BanStageFooterProps) {
  return (
    <div className="bg-gray-800/95 backdrop-blur-sm border-t border-gray-700 shadow-lg">
      {windowWidth < 640 ? (
        // Mobile: stacked, animated, compact
        <div className="p-2">
          {/* Debug info */}
          <div className="text-xs text-red-400 mb-1">Debug: isScrolled = {isScrolled.toString()}, windowWidth = {windowWidth}</div>
          
          <div className="flex flex-col items-center w-full gap-1">
            {/* Collapsible section - Conditionally rendered */}
            {!isScrolled && (
              <div className="w-full flex flex-col gap-1">
                {/* Instructions */}
                <div className="w-full bg-gray-900/70 border border-gray-700 rounded-lg px-2 py-1 flex items-center justify-center text-center">
                  <span className="font-semibold text-sm text-white mr-2">How to use:</span>
                  <span className="text-xs text-gray-300">Click to ban/unban leaders</span>
                </div>
                {/* Attribution */}
                <div className="w-full bg-gray-900/70 border border-gray-700 rounded-lg px-2 py-1 flex items-center justify-center text-center">
                  <span className="font-semibold text-sm text-white">Created by <a href="https://github.com/nickbenthem" target="_blank" rel="noopener noreferrer" className="text-yellow-500 hover:text-yellow-400 transition-colors font-bold">NickBenthem</a></span>
                </div>
              </div>
            )}
            {/* Stats - Always visible, becomes more prominent when scrolled */}
            <div 
              className="bg-gray-900/70 border border-gray-700 flex items-center justify-center text-center transition-all duration-300 ease-out"
              style={{
                padding: isScrolled ? '8px 12px' : '4px 8px',
                borderRadius: isScrolled ? '8px' : '6px',
                transform: isScrolled ? 'scale(1.05)' : 'scale(1)'
              }}
            >
              <span className="font-semibold text-sm text-white mr-2">Stats:</span>
              <span className="text-xs text-gray-300 mr-2">Total: {totalCount}</span>
              <span className="text-xs text-gray-300 mr-2">Banned: {bannedCount}</span>
              <span className="text-xs text-gray-300">Available: {totalCount - bannedCount}</span>
            </div>
          </div>
        </div>
      ) : (
        // Desktop: single horizontal bar with three sections
        <div className="max-w-7xl mx-auto p-2 sm:p-3">
          <div className="flex flex-row items-center w-full gap-4">
            {/* Instructions */}
            <div className="flex-1 bg-gray-900/70 border border-gray-700 rounded-lg px-4 py-2 flex items-center justify-center text-center">
              <span className="font-semibold text-base text-white mr-2">How to use:</span>
              <span className="text-sm text-gray-300">Click to ban/unban leaders</span>
            </div>
            {/* Attribution */}
            <div className="flex-1 bg-gray-900/70 border border-gray-700 rounded-lg px-4 py-2 flex items-center justify-center text-center">
              <span className="font-semibold text-base text-white">Created by <a href="https://github.com/nickbenthem" target="_blank" rel="noopener noreferrer" className="text-yellow-500 hover:text-yellow-400 transition-colors font-bold">NickBenthem</a></span>
            </div>
            {/* Stats */}
            <div className="flex-1 bg-gray-900/70 border border-gray-700 rounded-lg px-4 py-2 flex items-center justify-center text-center">
              <span className="font-semibold text-base text-white mr-3">Stats:</span>
              <span className="text-sm text-gray-300 mr-3">Total: {totalCount}</span>
              <span className="text-sm text-gray-300 mr-3">Banned: {bannedCount}</span>
              <span className="text-sm text-gray-300">Available: {totalCount - bannedCount}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 