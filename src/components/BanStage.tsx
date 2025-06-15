import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Crown, Users, Ban, RefreshCw, ChevronDown, Search, X } from 'lucide-react';
import { LeaderCard } from './LeaderCard';
import { useLeaders } from '../hooks/useLeaders';
import { useUserPresence } from '../hooks/useUserPresence';

interface BanStageProps {
  userName: string;
  onBack: () => void;
}

type SortOption = 'civilization' | 'leader';
type FilterOption = 'all' | 'banned' | 'available';

export function BanStage({ userName, onBack }: BanStageProps) {
  const { leaders, loading, toggleBanLeader } = useLeaders();
  const { connectedUsers, isConnected } = useUserPresence(userName, userName);
  const [sortBy, setSortBy] = useState<SortOption>('leader');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterOption>('all');
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const searchRef = useRef<HTMLDivElement>(null);

  // Reset viewport when component mounts to fix mobile zoom issues
  useEffect(() => {
    // Reset any zoom that might have occurred from the previous component
    // Scroll to top to reset any scroll position
    window.scrollTo(0, 0);
    
    // Reset any transform that might be applied
    document.body.style.transform = 'scale(1)';
    document.body.style.transformOrigin = 'top left';
    
    // Ensure no horizontal scroll
    document.body.style.overflowX = 'hidden';
    document.documentElement.style.overflowX = 'hidden';
    
    // Ensure the viewport meta tag is properly applied
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover');
    }
    
    // Force a reflow to ensure the viewport is properly reset
    document.body.offsetHeight;
    
    // Additional mobile-specific fixes
    if (window.innerWidth <= 768) {
      // On mobile, ensure the body doesn't exceed viewport width
      document.body.style.width = '100vw';
      document.body.style.maxWidth = '100vw';
      document.body.style.overflowX = 'hidden';
    }
    
    // Ensure title is visible by scrolling to top after a brief delay
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }, []);

  // Function to normalize text by removing diacritics
  const normalizeText = (text: string): string => {
    return text
      .normalize('NFD') // Decompose characters into base + diacritic
      .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
      .toLowerCase();
  };

  // Handle window resize and initial width
  useEffect(() => {
    const updateWidth = () => setWindowWidth(window.innerWidth);
    updateWidth(); // Set initial width
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Handle scrolling for mobile footer visibility with smooth transitions
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = 200; // Full transition over 200px of scroll
      const progress = Math.min(scrollTop / maxScroll, 1);
      
      setScrollProgress(progress);
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
  }, []);

  const handleToggleBan = (leaderId: string) => {
    console.log('BanStage handleToggleBan called for:', leaderId, 'by:', userName);
    toggleBanLeader(leaderId, userName);
  };

  const sortedLeaders = useMemo(() => {
    return [...leaders].sort((a, b) => {
      if (sortBy === 'civilization') {
        const civA = a.civilization?.name || '';
        const civB = b.civilization?.name || '';
        return civA.localeCompare(civB);
      } else {
        return a.name.localeCompare(b.name);
      }
    });
  }, [leaders, sortBy]);

  const filteredLeaders = useMemo(() => {
    // First apply the active filter
    let filtered = sortedLeaders;
    
    if (activeFilter === 'banned') {
      filtered = filtered.filter(leader => leader.is_banned);
    } else if (activeFilter === 'available') {
      filtered = filtered.filter(leader => !leader.is_banned);
    }
    // 'all' filter shows everyone, so no additional filtering needed
    
    // Then apply search query if present
    if (!searchQuery.trim()) {
      return filtered;
    }
    
    const query = normalizeText(searchQuery);
    return filtered.filter(leader => {
      const leaderName = normalizeText(leader.name);
      const civName = normalizeText(leader.civilization?.name || '');
      
      return leaderName.includes(query) || civName.includes(query);
    });
  }, [sortedLeaders, searchQuery, activeFilter]);

  const autocompleteSuggestions = useMemo(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) {
      return [];
    }
    
    const query = normalizeText(searchQuery);
    // For autocomplete, we want to search through all leaders regardless of filter
    // but respect the current filter for the suggestions
    let searchableLeaders = leaders;
    
    if (activeFilter === 'banned') {
      searchableLeaders = searchableLeaders.filter(leader => leader.is_banned);
    } else if (activeFilter === 'available') {
      searchableLeaders = searchableLeaders.filter(leader => !leader.is_banned);
    }
    
    const suggestions = searchableLeaders
      .filter(leader => {
        const leaderName = normalizeText(leader.name);
        const civName = normalizeText(leader.civilization?.name || '');
        
        return leaderName.includes(query) || civName.includes(query);
      })
      .slice(0, 5) // Limit to 5 suggestions
      .map(leader => ({
        id: leader.id,
        name: leader.name,
        civilization: leader.civilization?.name || ''
      }));
    
    return suggestions;
  }, [leaders, searchQuery, activeFilter]);

  const handleSearchSelect = (leaderName: string) => {
    setSearchQuery(leaderName);
    setShowAutocomplete(false);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setShowAutocomplete(false);
  };

  const bannedCount = leaders.filter(leader => leader.is_banned).length;
  const totalCount = leaders.length;

  // Sort connected users by who joined first (online_at timestamp)
  const sortedConnectedUsers = useMemo(() => {
    return [...connectedUsers].sort((a, b) => {
      const timeA = new Date(a.online_at).getTime();
      const timeB = new Date(b.online_at).getTime();
      return timeA - timeB; // Sort by earliest first
    });
  }, [connectedUsers]);

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 pb-32 mobile-container overflow-x-hidden">
      {/* Header */}
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
                  className={`w-2 h-2 rounded-full ${
                    isConnected 
                      ? 'bg-green-500 animate-pulse' 
                      : 'bg-red-500'
                  }`} 
                />
                <span className="text-xs text-gray-400 hidden sm:inline">
                  {isConnected ? 'Connected' : 'Disconnected'}
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

        {/* Controls Section - More compact and horizontal */}
        <div className="flex flex-row items-center gap-2 sm:gap-3 min-w-0">
          {/* Sort Options */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <span className="text-sm sm:text-base text-white font-medium">Sort by:</span>
            <div className="relative">
              <button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="flex items-center gap-2 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-lg px-3 py-2 text-sm sm:text-base text-white hover:bg-gray-700/80 transition-colors min-w-0"
              >
                <span className="truncate">{sortBy === 'civilization' ? 'Civilization' : 'Leader'}</span>
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

      {/* Leaders Grid */}
      <div className="max-w-7xl mx-auto mb-24 grid-container">
        {/* Results count */}
        {filteredLeaders.length > 0 && (
          <div className="mb-4 text-center">
            <p className="text-gray-400 text-sm">
              Showing {filteredLeaders.length} {activeFilter === 'all' ? '' : activeFilter} leader{filteredLeaders.length !== 1 ? 's' : ''}
              {searchQuery.trim() && ` matching "${searchQuery}"`}
            </p>
          </div>
        )}
        
        {filteredLeaders.length === 0 ? (
          <div className="text-center py-12">
            <Crown className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">
              {searchQuery.trim() 
                ? `No ${activeFilter === 'all' ? '' : activeFilter} leaders found matching "${searchQuery}"`
                : `No ${activeFilter === 'all' ? '' : activeFilter} leaders available`
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-center w-full max-w-full overflow-x-hidden">
            {filteredLeaders.map((leader) => (
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
        {windowWidth < 640 ? (
          // Mobile: stacked, animated, compact
          <div style={{padding: scrollProgress === 1 ? 0 : '0.5rem', transition: 'padding 0.5s cubic-bezier(0.4,0,0.2,1)'}}>
            <div className={`flex flex-col items-center w-full ${scrollProgress === 1 ? 'gap-0 h-full' : 'gap-0.5'}`} style={{height: scrollProgress === 1 ? '100%' : undefined}}>
              {/* Collapsible section - Smoothly hidden on mobile when scrolled */}
              <div 
                className="w-full flex flex-col gap-0.5 transition-all duration-700 ease-out"
                style={{
                  opacity: 1 - scrollProgress,
                  transform: `translateY(${scrollProgress * -20}px)`,
                  maxHeight: `${Math.max(0, 100 - scrollProgress * 100)}px`,
                  overflow: 'hidden'
                }}
              >
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
              {/* Stats - Always visible, smoothly expands to full width when scrolled on mobile only */}
              <div 
                className="bg-gray-900/70 border border-gray-700 flex items-center justify-center text-center transition-all duration-700 ease-out"
                style={{
                  width: '100%',
                  maxWidth: `calc(${(1 - scrollProgress) * 100 + scrollProgress * 100}%)`,
                  paddingLeft: `${8 - 6 * scrollProgress}px`,
                  paddingRight: `${8 - 6 * scrollProgress}px`,
                  paddingTop: `${4 - 3 * scrollProgress}px`,
                  paddingBottom: `${4 - 3 * scrollProgress}px`,
                  borderRadius: `${8 - 8 * scrollProgress}px`,
                  borderWidth: `${1 - 1 * scrollProgress}px`,
                  height: scrollProgress === 1 ? '100%' : undefined,
                  transition: 'all 0.7s cubic-bezier(0.4,0,0.2,1)'
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
    </div>
  );
}