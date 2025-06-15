import React, { useState, useMemo, useEffect } from 'react';
import { Crown } from 'lucide-react';
import { useLeaders } from '../hooks/useLeaders';
import { useUserPresence } from '../hooks/useUserPresence';
import { BanStageHeader } from './BanStageHeader';
import { BanStageManagement } from './BanStageManagement';
import { BanStageLeadersGrid } from './BanStageLeadersGrid';
import { BanStageFooter } from './BanStageFooter';

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
  const [windowWidth, setWindowWidth] = useState(0);
  const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(null);

  // Reset viewport when component mounts to fix mobile zoom issues
  useEffect(() => {
    // Simple scroll reset
    window.scrollTo(0, 0);
    
    // Basic mobile fixes without aggressive manipulation
    if (window.innerWidth <= 768) {
      document.body.style.overflowX = 'hidden';
      document.documentElement.style.overflowX = 'hidden';
    }
    
    // Ensure the viewport meta tag is properly applied
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover');
    }
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
    if (!scrollContainer) {
      return;
    }
    
    const handleScroll = () => {
      const containerScrollTop = scrollContainer.scrollTop;
      const windowScrollTop = window.scrollY;
      
      // Use container scroll as primary, fallback to window scroll
      const shouldBeScrolled = containerScrollTop > 5 || windowScrollTop > 5;
      
      setIsScrolled(shouldBeScrolled);
    };

    // Listen to scroll events on both window and the container
    window.addEventListener('scroll', handleScroll, { passive: true });
    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, [scrollContainer]); // Only run when scrollContainer changes

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col overflow-x-hidden" style={{ 
      height: '100vh'
    }}>
      {/* Main content area - scrollable */}
      <div 
        className="flex-1 p-4 overflow-y-auto" 
        ref={setScrollContainer}
        style={{
          // Add bottom padding to account for fixed footer
          // Use a larger value to ensure content is visible above the footer
          paddingBottom: 'calc(env(safe-area-inset-bottom) + 140px)'
        }}
      >
        {/* Header */}
        <BanStageHeader
          userName={userName}
          connectedUsers={connectedUsers}
          isConnected={isConnected}
        />

        {/* Management Controls */}
        <BanStageManagement
          sortBy={sortBy}
          setSortBy={setSortBy}
          showSortDropdown={showSortDropdown}
          setShowSortDropdown={setShowSortDropdown}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          showAutocomplete={showAutocomplete}
          setShowAutocomplete={setShowAutocomplete}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          autocompleteSuggestions={autocompleteSuggestions}
          handleSearchSelect={handleSearchSelect}
          handleClearSearch={handleClearSearch}
          normalizeText={normalizeText}
          totalCount={totalCount}
          bannedCount={bannedCount}
        />

        {/* Leaders Grid */}
        <BanStageLeadersGrid
          filteredLeaders={filteredLeaders}
          activeFilter={activeFilter}
          searchQuery={searchQuery}
          onToggleBan={handleToggleBan}
        />
      </div>

      {/* Sticky Footer */}
      <div className="flex-shrink-0">
        <BanStageFooter
          windowWidth={windowWidth}
          isScrolled={isScrolled}
          totalCount={totalCount}
          bannedCount={bannedCount}
        />
      </div>
    </div>
  );
}