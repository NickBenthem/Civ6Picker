import React, { useRef, useEffect } from 'react';
import { ChevronDown, Search, X } from 'lucide-react';

type SortOption = 'civilization' | 'leader' | 'lastUpdated';
type FilterOption = 'all' | 'banned' | 'available';

interface BanStageManagementProps {
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
  showSortDropdown: boolean;
  setShowSortDropdown: (show: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  showAutocomplete: boolean;
  setShowAutocomplete: (show: boolean) => void;
  activeFilter: FilterOption;
  setActiveFilter: (filter: FilterOption) => void;
  autocompleteSuggestions: Array<{ id: string; name: string; civilization: string }>;
  handleSearchSelect: (leaderName: string) => void;
  handleClearSearch: () => void;
  normalizeText: (text: string) => string;
  totalCount: number;
  bannedCount: number;
}

export function BanStageManagement({
  sortBy,
  setSortBy,
  showSortDropdown,
  setShowSortDropdown,
  searchQuery,
  setSearchQuery,
  showAutocomplete,
  setShowAutocomplete,
  activeFilter,
  setActiveFilter,
  autocompleteSuggestions,
  handleSearchSelect,
  handleClearSearch,
  normalizeText,
  totalCount,
  bannedCount
}: BanStageManagementProps) {
  const searchRef = useRef<HTMLDivElement>(null);

  // Handle clicking outside to close autocomplete
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowAutocomplete(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setShowAutocomplete]);

  return (
    <>
      {/* Controls Section - More compact and horizontal */}
      <div className="max-w-7xl mx-auto mb-4 sm:mb-6">
        <div className="flex flex-row items-center gap-2 sm:gap-3 min-w-0">
          {/* Sort Options */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <span className="text-sm sm:text-base text-white font-medium">Sort by:</span>
            <div className="relative">
              <button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="flex items-center gap-2 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-lg px-3 py-2 text-sm sm:text-base text-white hover:bg-gray-700/80 transition-colors min-w-0"
              >
                <span className="truncate">{sortBy === 'civilization' ? 'Civilization' : sortBy === 'leader' ? 'Leader' : 'Last Updated'}</span>
                <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} />
              </button>
              
              {showSortDropdown && (
                <div className="absolute top-full left-0 mt-1 bg-gray-800/95 backdrop-blur-sm border border-gray-700 rounded-lg shadow-lg z-10 min-w-[150px]">
                  <button
                    onClick={() => {
                      setSortBy('civilization');
                      setShowSortDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-700/80 transition-colors ${
                      sortBy === 'civilization' ? 'text-yellow-500 bg-gray-700/50' : 'text-white'
                    }`}
                  >
                    Civilization
                  </button>
                  <button
                    onClick={() => {
                      setSortBy('leader');
                      setShowSortDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-700/80 transition-colors ${
                      sortBy === 'leader' ? 'text-yellow-500 bg-gray-700/50' : 'text-white'
                    }`}
                  >
                    Leader
                  </button>
                  <button
                    onClick={() => {
                      setSortBy('lastUpdated');
                      setShowSortDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-700/80 transition-colors ${
                      sortBy === 'lastUpdated' ? 'text-yellow-500 bg-gray-700/50' : 'text-white'
                    }`}
                  >
                    Last Updated
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative flex-1 min-w-0" ref={searchRef}>
            <div className="flex items-center bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-lg px-3 py-2 min-w-0">
              <Search className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowAutocomplete(true);
                }}
                onFocus={() => setShowAutocomplete(true)}
                placeholder={
                  activeFilter === 'all' 
                    ? "Search..." 
                    : activeFilter === 'banned' 
                    ? "Search banned..." 
                    : "Search available..."
                }
                className="bg-transparent text-white placeholder-gray-400 outline-none flex-1 min-w-0 text-sm sm:text-base"
              />
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="ml-2 text-gray-400 hover:text-white transition-colors flex-shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            
            {/* Autocomplete Dropdown */}
            {showAutocomplete && autocompleteSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800/95 backdrop-blur-sm border border-gray-700 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                {autocompleteSuggestions.map((suggestion) => (
                  <button
                    key={suggestion.id}
                    onClick={() => handleSearchSelect(suggestion.name)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-700/80 transition-colors border-b border-gray-700 last:border-b-0"
                  >
                    <div className="text-white font-medium text-sm sm:text-base">{suggestion.name}</div>
                    <div className="text-xs sm:text-sm text-gray-400">{suggestion.civilization}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="max-w-7xl mx-auto mb-4 sm:mb-6">
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <button
            onClick={() => setActiveFilter('all')}
            className={`
              backdrop-blur-sm rounded-lg border p-2 sm:p-3 text-center transition-all duration-200 relative
              ${activeFilter === 'all' 
                ? 'bg-yellow-900/80 border-yellow-500 shadow-lg shadow-yellow-500/20' 
                : 'bg-gray-800/80 border-gray-700 hover:bg-gray-700/80 hover:border-gray-600'
              }
            `}
          >
            {activeFilter === 'all' && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full border-2 border-gray-900"></div>
            )}
            <div className={`text-base sm:text-xl font-bold ${activeFilter === 'all' ? 'text-yellow-200' : 'text-white'}`}>
              {totalCount}
            </div>
            <div className={`text-xs sm:text-sm ${activeFilter === 'all' ? 'text-yellow-300' : 'text-gray-400'}`}>
              Total
            </div>
          </button>
          
          <button
            onClick={() => setActiveFilter('banned')}
            className={`
              backdrop-blur-sm rounded-lg border p-2 sm:p-3 text-center transition-all duration-200 relative
              ${activeFilter === 'banned' 
                ? 'bg-red-900/80 border-red-500 shadow-lg shadow-red-500/20' 
                : 'bg-red-900/80 border-red-700 hover:bg-red-800/80 hover:border-red-600'
              }
            `}
          >
            {activeFilter === 'banned' && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-gray-900"></div>
            )}
            <div className={`text-base sm:text-xl font-bold ${activeFilter === 'banned' ? 'text-red-200' : 'text-red-200'}`}>
              {bannedCount}
            </div>
            <div className={`text-xs sm:text-sm ${activeFilter === 'banned' ? 'text-red-300' : 'text-red-300'}`}>
              Banned
            </div>
          </button>
          
          <button
            onClick={() => setActiveFilter('available')}
            className={`
              backdrop-blur-sm rounded-lg border p-2 sm:p-3 text-center transition-all duration-200 relative
              ${activeFilter === 'available' 
                ? 'bg-green-900/80 border-green-500 shadow-lg shadow-green-500/20' 
                : 'bg-green-900/80 border-green-700 hover:bg-green-800/80 hover:border-green-600'
              }
            `}
          >
            {activeFilter === 'available' && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
            )}
            <div className={`text-base sm:text-xl font-bold ${activeFilter === 'available' ? 'text-green-200' : 'text-green-200'}`}>
              {totalCount - bannedCount}
            </div>
            <div className={`text-xs sm:text-sm ${activeFilter === 'available' ? 'text-green-300' : 'text-green-300'}`}>
              Available
            </div>
          </button>
        </div>
      </div>
    </>
  );
} 