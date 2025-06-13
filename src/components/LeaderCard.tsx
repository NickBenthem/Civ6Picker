import React from 'react';
import { Ban, User, RotateCcw, Sword, Building } from 'lucide-react';
import { Leader } from '../lib/supabase';

interface LeaderCardProps {
  leader: Leader;
  onToggleBan: (leaderId: string) => void;
  disabled?: boolean;
}

export function LeaderCard({ leader, onToggleBan, disabled }: LeaderCardProps) {
  console.log('LeaderCard rendering with data:', {
    name: leader.name,
    civilization: leader.civilization?.name,
    ability: leader.ability,
    uniqueUnit: leader.civilization?.unique_units?.[0],
    uniqueInfra: leader.civilization?.unique_infrastructure?.[0]
  });

  const handleClick = () => {
    console.log('Leader card clicked:', leader.name, 'is_banned:', leader.is_banned);
    if (!disabled) {
      console.log('Calling onToggleBan for leader:', leader.id);
      onToggleBan(leader.id);
    } else {
      console.log('Click ignored - card is disabled');
    }
  };

  const uniqueUnit = leader.civilization?.unique_units?.[0];
  const uniqueInfra = leader.civilization?.unique_infrastructure?.[0];

  return (
    <div
      className={`
        w-full max-w-[300px] relative group cursor-pointer transition-all duration-300 transform hover:scale-105
        ${disabled ? 'cursor-not-allowed opacity-50' : ''}
      `}
      onClick={handleClick}
    >
      <div 
        className={`
          bg-gray-800 rounded-lg border-2 
          flex flex-col flex-direction-column
          divide-y divide-gray-700 
          transition-all duration-300
          ${disabled ? 'cursor-not-allowed opacity-50' : ''}
          ${leader.is_banned 
            ? 'border-red-500 shadow-lg shadow-red-500/20' 
            : 'border-gray-700 hover:border-yellow-500 hover:shadow-xl hover:shadow-yellow-500/20'
          }
        `}
        style={{ flexDirection: 'column' }}
        onClick={handleClick}
      >
        {/* 1. Leader Portrait */}
        <div className="w-full flex justify-center items-center p-4">
          <div className="w-32 h-32 relative object-center flex-shrink-0 overflow-hidden rounded-full">
            <img
              src={`/images/leaders/${leader.image_key}`}
              alt={leader.name}
              loading="lazy"
              className={`w-32 h-32 object-cover object-center transition-all duration-300 ${
                leader.is_banned ? 'grayscale brightness-50' : ''
              }`}
              onError={(e) => {
                e.currentTarget.src = '/images/leaders/placeholder.png';
              }}
            />
            
            {/* Ban Overlays */}
            {leader.is_banned && (
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/40 to-red-600/60 flex items-center justify-center">
                <div className="text-center transform group-hover:scale-110 transition-transform duration-200">
                  <Ban className="w-10 h-10 text-red-100 mx-auto mb-1 drop-shadow-lg" />
                  <div className="text-red-100 font-bold text-xs bg-red-600/80 px-2 py-1 rounded backdrop-blur-sm">
                    BANNED
                  </div>
                </div>
              </div>
            )}
            
            {!disabled && (
              <>
                {!leader.is_banned && (
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-red-600/0 group-hover:from-red-500/30 group-hover:to-red-600/50 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="text-center transform scale-90 group-hover:scale-100 transition-transform duration-200">
                      <Ban className="w-8 h-8 text-red-100 mx-auto mb-1 drop-shadow-lg" />
                      <div className="text-red-100 font-bold text-xs bg-red-600/90 px-3 py-1 rounded-full backdrop-blur-sm border border-red-400/50">
                        CLICK TO BAN
                      </div>
                    </div>
                  </div>
                )}
                
                {leader.is_banned && (
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-green-600/0 group-hover:from-green-500/40 group-hover:to-green-600/60 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="text-center transform scale-90 group-hover:scale-100 transition-transform duration-200">
                      <RotateCcw className="w-8 h-8 text-green-100 mx-auto mb-1 drop-shadow-lg animate-pulse" />
                      <div className="text-green-100 font-bold text-xs bg-green-600/90 px-3 py-1 rounded-full backdrop-blur-sm border border-green-400/50">
                        CLICK TO UNBAN
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* 2. Leader Name and Civilization */}
        <div className={`p-4 flex flex-row items-center text-center justify-between ${
          leader.is_banned ? 'bg-red-900/20' : ''
        }`}>
          <h3 className={`font-bold text-lg truncate transition-colors duration-300 ${
            leader.is_banned ? 'text-red-200' : 'text-white'
          }`}>
            {leader.name}
          </h3>
          <p className={`text-sm truncate transition-colors duration-300 ${
            leader.is_banned ? 'text-red-300' : 'text-gray-400'
          }`}>
            {leader.civilization?.name}
          </p>
        </div>

        {/* 3. Unique Unit and Infrastructure */}
        <div className="p-4 flex flex-col items-center gap-2">
          {uniqueUnit && (
            <div className="flex items-center gap-1 text-blue-400 bg-blue-900/30 rounded px-2 py-1">
              <img src={`/images/units/${uniqueUnit.image_key}`} alt={uniqueUnit.name} className="w-6 h-6 flex-shrink-0" onError={(e) => { e.currentTarget.src = '/images/placeholder.png'; }} />
              <span className="truncate text-sm">{uniqueUnit.name}</span>
            </div>
          )}
          {uniqueInfra && (
            <div className="flex items-center gap-1 text-green-400 bg-green-900/30 rounded px-2 py-1">
              <img src={`/images/infrastructure/${uniqueInfra.image_key}`} alt={uniqueInfra.name} className="w-6 h-6 flex-shrink-0" onError={(e) => { e.currentTarget.src = '/images/placeholder.png'; }} />
              <span className="truncate text-sm">{uniqueInfra.name}</span>
            </div>
          )}
        </div>

        {/* 4. Ability Description */}
        <div className="p-4 text-sm text-gray-300 bg-gray-900/50 text-center">
          {leader.ability || 'No ability description available'}
        </div>

        {/* Ban Info */}
        {leader.is_banned && leader.banned_by && (
          <div className="p-4 flex items-center justify-center gap-1 text-xs text-red-300 bg-red-900/30">
            <User className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">Banned by {leader.banned_by}</span>
          </div>
        )}
      </div>
    </div>
  );
}