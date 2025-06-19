import React from 'react';
import { Crown } from 'lucide-react';
import { LeaderCard } from './LeaderCard';
import { Leader } from '../lib/supabase';

type FilterOption = 'all' | 'banned' | 'available';

interface BanStageLeadersGridProps {
  filteredLeaders: Leader[];
  activeFilter: FilterOption;
  searchQuery: string;
  onToggleBan: (leaderId: string) => void;
}

export function BanStageLeadersGrid({
  filteredLeaders,
  activeFilter,
  searchQuery,
  onToggleBan
}: BanStageLeadersGridProps) {
  return (
    <div className="max-w-7xl mx-auto mb-4 sm:mb-6 px-4 sm:px-6 grid-container">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 place-items-center overflow-x-hidden p-2">
          {filteredLeaders.map((leader) => (
            <LeaderCard
              key={leader.id}
              leader={leader}
              onToggleBan={onToggleBan}
            />
          ))}
        </div>
      )}
    </div>
  );
} 