import { useEffect, useRef, useState } from 'react';
import type { RealtimeChannel } from '@supabase/supabase-js';
import {
  type BaseLeader,
  type Leader,
  type LeaderState,
} from '../lib/supabase';
import { baseLeaders } from '../data/leaders';
import { clearLobbyState, loadLobbyState } from '../utils/lobbyStateStorage';
import { createReconnectionManager } from '../utils/reconnectionManager';
import { supabase } from '../lib/supabaseClient';

type LeaderBroadcastEvent = {
  type: 'ban_toggled';
  lobbyCode: string;
  leaderId: string;
  userName: string;
  isBanned: boolean;
  timestamp: string;
};

type LobbyBan = {
  leader_id: string;
  banned_by: string | null;
  banned_at: string;
};

type BanFields = Omit<LeaderState, 'id'>;

function mergeBaseWithBans(base: BaseLeader[], bans: LobbyBan[]): Leader[] {
  const banMap = new Map(bans.map((ban) => [ban.leader_id, ban]));
  return base.map((leader) => {
    const ban = banMap.get(leader.id);
    return {
      ...leader,
      is_banned: Boolean(ban),
      banned_by: ban?.banned_by ?? null,
      banned_at: ban?.banned_at ?? null,
    };
  });
}

function applyBanFields(
  leaders: Leader[],
  leaderId: string,
  fields: BanFields
): Leader[] {
  return leaders.map((leader) =>
    leader.id === leaderId ? { ...leader, ...fields } : leader
  );
}

function banFields(isBanned: boolean, userName: string, timestamp: string): BanFields {
  return {
    is_banned: isBanned,
    banned_by: isBanned ? userName : null,
    banned_at: isBanned ? timestamp : null,
  };
}

// Bans saved in this browser before they were stored server-side. The server
// applies them only to a lobby it has never stored, so sending them is safe.
function localSeed(lobbyCode: string) {
  const stored = loadLobbyState(lobbyCode);
  const bans = (stored?.leaders ?? [])
    .filter((state) => state.is_banned)
    .map((state) => ({
      leader_id: state.id,
      banned_by: state.banned_by,
      banned_at: state.banned_at,
    }));
  return bans.length ? bans : null;
}

export function useLeaders(lobbyCode: string) {
  const [leaders, setLeaders] = useState<Leader[]>(() =>
    mergeBaseWithBans(baseLeaders, [])
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isReconnecting, setIsReconnecting] = useState(false);

  const leadersRef = useRef<Leader[]>(leaders);
  const channelRef = useRef<RealtimeChannel | null>(null);
  const loadSeqRef = useRef(0);

  const reconnectionManagerRef = useRef(
    createReconnectionManager({
      maxRetries: 12,
      baseDelay: 1500,
      maxDelay: 45000,
      jitterFactor: 0.2,
      onRetry: (attempt, delay) => {
        console.log(
          `Reconnecting leader socket (attempt ${attempt}/${12}) in ${delay}ms`
        );
        setIsReconnecting(true);
        setError(
          new Error(
            `Leader updates connection lost. Reconnecting... (attempt ${attempt})`
          )
        );
      },
      onMaxRetriesReached: () => {
        console.error('Max reconnection attempts reached for leader channel');
        setIsReconnecting(false);
        setError(
          new Error(
            'Failed to reconnect to leader updates after multiple attempts. Please refresh the page.'
          )
        );
      },
    })
  );

  useEffect(() => {
    leadersRef.current = leaders;
  }, [leaders]);

  // Runs on open and after every (re)subscribe, so toggles missed while
  // disconnected are picked up. Only the latest request's result is applied.
  async function loadBans() {
    const seq = ++loadSeqRef.current;
    const { data, error: rpcError } = await supabase.rpc('load_lobby_bans', {
      p_lobby_code: lobbyCode,
      p_seed: localSeed(lobbyCode),
    });
    if (seq !== loadSeqRef.current) {
      return;
    }

    if (rpcError) {
      console.error('Failed to load lobby bans:', rpcError);
      setError(new Error('Failed to load lobby bans'));
    } else {
      clearLobbyState(lobbyCode);
      setLeaders(mergeBaseWithBans(baseLeaders, data as LobbyBan[]));
    }
    setLoading(false);
  }

  async function toggleBanLeader(leaderId: string, userName: string) {
    const currentLeader = leadersRef.current.find((l) => l.id === leaderId);
    if (!currentLeader) {
      throw new Error('Leader not found');
    }

    const nextIsBanned = !currentLeader.is_banned;
    const timestamp = new Date().toISOString();

    setLeaders((prevLeaders) =>
      applyBanFields(prevLeaders, leaderId, banFields(nextIsBanned, userName, timestamp))
    );

    const { error: rpcError } = await supabase.rpc('set_lobby_ban', {
      p_lobby_code: lobbyCode,
      p_leader_id: leaderId,
      p_banned: nextIsBanned,
      p_banned_by: userName,
    });
    if (rpcError) {
      console.error('Failed to save ban toggle:', rpcError);
      setLeaders((prevLeaders) =>
        applyBanFields(prevLeaders, leaderId, {
          is_banned: currentLeader.is_banned,
          banned_by: currentLeader.banned_by,
          banned_at: currentLeader.banned_at,
        })
      );
      setError(new Error('Failed to save ban toggle'));
      return;
    }

    const channel = channelRef.current;
    if (!channel) {
      return;
    }

    const event: LeaderBroadcastEvent = {
      type: 'ban_toggled',
      lobbyCode,
      leaderId,
      userName,
      isBanned: nextIsBanned,
      timestamp,
    };

    try {
      await channel.send({
        type: 'broadcast',
        event: 'leader_event',
        payload: event,
      });
    } catch (e) {
      console.error('Failed to broadcast ban toggle:', e);
      setError(
        e instanceof Error ? e : new Error('Failed to broadcast ban toggle')
      );
    }
  }

  const setupChannel = () => {
    if (!lobbyCode) {
      return null;
    }

    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
      channelRef.current = null;
    }

    const channel = supabase.channel(`lobby:${lobbyCode}`, {
      config: {
        broadcast: { self: false },
      },
    });

    channel.on('broadcast', { event: 'leader_event' }, (payload) => {
      const event = payload.payload as LeaderBroadcastEvent;

      if (event.lobbyCode !== lobbyCode || event.type !== 'ban_toggled') {
        return;
      }

      setLeaders((prevLeaders) =>
        applyBanFields(
          prevLeaders,
          event.leaderId,
          banFields(event.isBanned, event.userName, event.timestamp)
        )
      );
    });

    channel.subscribe((status) => {
      if (status === 'SUBSCRIBED') {
        setIsReconnecting(false);
        setError(null);
        reconnectionManagerRef.current.reset();
        loadBans();
      }

      if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
        setIsReconnecting(true);
        reconnectionManagerRef.current.scheduleRetry(() => {
          setupChannel();
        });
      }
    });

    channelRef.current = channel;
    return channel;
  };

  useEffect(() => {
    if (lobbyCode) {
      setLeaders(mergeBaseWithBans(baseLeaders, []));
      setLoading(true);
      loadBans();
      setupChannel();
    }

    return () => {
      reconnectionManagerRef.current.cancel();
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
  }, [lobbyCode]);

  return { leaders, loading, error, toggleBanLeader, isReconnecting };
}
