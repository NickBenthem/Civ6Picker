import React from 'react';
import { Ban, User, RotateCcw } from 'lucide-react';
import { Leader } from '../lib/supabase';

interface LeaderCardProps {
  leader: Leader;
  onToggleBan: (leaderId: string) => void;
  disabled?: boolean;
}

export function LeaderCard({ leader, onToggleBan, disabled }: LeaderCardProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!disabled) {
      onToggleBan(leader.id);
    }
  };
  const abilityText =
  (leader.ability || '')
  .split('.')
  .map((s) => s.trim())
  .filter(Boolean);          // remove empty strings

  const civilizationBonusText =
  (leader.civilization?.civilization_bonus || '')
  .split('.')
  .map((s) => s.trim())
  .filter(Boolean);          // remove empty strings

  const uniqueUnit = leader.civilization?.unique_units?.[0];
  const uniqueInfra = leader.civilization?.unique_infrastructure?.[0];

  return (
    <div
      className={`
        w-full h-[600px] sm:h-[700px] lg:h-[800px]    /* responsive height and width */
        relative group transition-all duration-300
        transform hover:scale-105 hover:z-10
        ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
        overflow-hidden
      `}
    >
      <div
        className={`
          h-full flex flex-col                                 /* stretch + column */
          bg-gray-800 rounded-lg border-2 divide-y divide-gray-700
          transition-all duration-300
          ${disabled ? 'cursor-not-allowed opacity-50' : ''}
          ${
            leader.is_banned
              ? 'border-red-500 shadow-lg shadow-red-500/20'
              : 'border-gray-700 hover:border-yellow-500 hover:shadow-xl hover:shadow-yellow-500/20'
          }
        `}
        onClick={handleClick}
      >
        {/* 1. Leader portrait */}
        <div className="w-full flex justify-center items-center p-3 sm:p-4">
          <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 relative overflow-hidden rounded-full">
            <img
              src={`/images/leaders/${leader.image_key}`}
              alt={leader.name}
              loading="lazy"
              className={`
                w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 object-cover transition-all duration-300
                ${leader.is_banned ? 'grayscale brightness-50' : ''}
              `}
              onError={(e) => {
                e.currentTarget.src = '/images/leaders/placeholder.png';
              }}
            />

            {/* Ban overlays */}
            {leader.is_banned && (
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/40 to-red-600/60 flex items-center justify-center group-hover:opacity-0 transition-opacity duration-300">
                <div className="text-center group-hover:scale-110 transform transition-transform duration-200">
                  <Ban className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-red-100 mx-auto mb-1 drop-shadow-lg" />
                  <div className="text-red-100 font-bold text-xs bg-red-600/80 px-2 py-1 rounded">
                    BANNED
                  </div>
                </div>
              </div>
            )}

            {/* Hover call-to-action */}
            {!disabled && !leader.is_banned && (
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-red-600/0 group-hover:from-red-500/30 group-hover:to-red-600/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                <div className="text-center transform scale-90 group-hover:scale-100 transition-transform duration-200">
                  <Ban className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-red-100 mx-auto mb-1 drop-shadow-lg" />
                  <div className="text-red-100 font-bold text-xs bg-red-600/90 px-2 sm:px-3 py-1 rounded-full border border-red-400/50">
                    CLICK TO BAN
                  </div>
                </div>
              </div>
            )}

            {!disabled && leader.is_banned && (
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-green-600/0 group-hover:from-green-500/40 group-hover:to-green-600/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                <div className="text-center transform scale-90 group-hover:scale-100 transition-transform duration-200">
                  <RotateCcw className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-green-100 mx-auto mb-1 drop-shadow-lg animate-pulse" />
                  <div className="text-green-100 font-bold text-xs bg-green-600/90 px-2 sm:px-3 py-1 rounded-full border border-green-400/50">
                    CLICK TO UNBAN
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 2. Leader name + civ */}
        <div
          className={`
            p-3 sm:p-4 flex flex-col items-center text-center gap-1
            ${leader.is_banned ? 'bg-red-900/20' : ''}
          `}
        >
          <h3
            className={`
              font-bold text-sm sm:text-base truncate
              ${leader.is_banned ? 'text-red-200' : 'text-white'}
            `}
          >
            <span>{leader.name.split('(')[0]}</span>
            <br />
            {leader.name.includes('(') && (
              <span className="text-xs sm:text-sm text-gray-400">({leader.name.split('(')[1]}</span>
            )}
            <span><br /></span>
          </h3>
          <p
            className={`text-xs sm:text-sm truncate
              ${leader.is_banned ? 'text-red-300' : 'text-gray-400'}
            `}
          >
            {leader.civilization?.name}
          </p>
        </div>

        {/* 3. Unique unit / infra */}
        <div className="p-3 sm:p-4 flex flex-col items-center gap-2">
          {uniqueUnit && (
            <div className="flex items-center gap-1 text-blue-400 bg-blue-900/30 rounded px-2 py-1">
              <img
                src={`/images/units/${uniqueUnit.image_key}`}
                alt={uniqueUnit.name}
                className="w-5 h-5 sm:w-6 sm:h-6"
                onError={(e) => {
                  e.currentTarget.src = '/images/placeholder.png';
                }}
              />
              <span className="truncate text-xs sm:text-sm">{uniqueUnit.name}</span>
            </div>
          )}
          {uniqueInfra && (
            <div className="flex items-center gap-1 text-green-400 bg-green-900/30 rounded px-2 py-1">
              <img
                src={`/images/infrastructure/${uniqueInfra.image_key}`}
                alt={uniqueInfra.name}
                className="w-5 h-5 sm:w-6 sm:h-6"
                onError={(e) => {
                  e.currentTarget.src = '/images/placeholder.png';
                }}
              />
              <span className="truncate text-xs sm:text-sm">{uniqueInfra.name}</span>
            </div>
          )}
        </div>

        {/* 4. Civilization Bonus and 5. Ability description combined container */}
        <div className="flex-grow flex flex-col">
          {/* 4. Civilization Bonus */}
          {leader.civilization?.civilization_bonus && (
            <div className="p-3 sm:p-4 text-sm sm:text-base text-gray-300 bg-gray-900/50 overflow-hidden text-left flex-grow">
              <div className="font-semibold text-yellow-400 mb-2">Civilization Bonus:</div>
              <div className="relative h-full overflow-hidden">
                <div className="group-hover:animate-scroll-text absolute w-full pb-4">
                  {civilizationBonusText.map((sentence, i) => (
                    <li key={i} className="list-none mb-1">{sentence}.</li>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 5. Ability description */}
          <div className="p-3 sm:p-4 flex-grow text-xs sm:text-sm text-gray-300 bg-gray-900/50 text-left">
            <div className="font-semibold text-yellow-400 mb-2">Leader Ability:</div>
            <div className="relative h-full overflow-hidden">
              <div className="group-hover:animate-scroll-text absolute w-full pb-4">
                {abilityText.map((sentence, i) => (
                  <li key={i} className="list-none mb-1">{sentence}.</li>   
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 6. Ban footer */}
        {leader.is_banned && leader.banned_by && (
          <div className="p-3 sm:p-4 flex items-center justify-center gap-1 text-xs text-red-300 bg-red-900/30">
            <User className="w-3 h-3" />
            <span className="truncate">Banned by {leader.banned_by}</span>
          </div>
        )}
      </div>
    </div>
  );
}

