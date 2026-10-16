import type { LeaderState } from '../lib/supabase';

// Bans used to live only in localStorage. They are now stored server-side;
// this is read once per lobby to upload them, then cleared.
const STORAGE_PREFIX = 'civ6picker:lobby:v1:';

type StoredLobbyState = {
  leaders: LeaderState[];
};

function getStorageKey(lobbyCode: string): string {
  return `${STORAGE_PREFIX}${lobbyCode}`;
}

export function loadLobbyState(
  lobbyCode: string
): StoredLobbyState | null {
  if (typeof window === 'undefined' || !window.localStorage) {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(getStorageKey(lobbyCode));
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as StoredLobbyState;

    if (!parsed || !Array.isArray(parsed.leaders)) {
      return null;
    }

    return parsed;
  } catch (error) {
    console.error('Error loading lobby state from localStorage:', error);
    return null;
  }
}

export function clearLobbyState(lobbyCode: string): void {
  if (typeof window === 'undefined' || !window.localStorage) {
    return;
  }

  try {
    window.localStorage.removeItem(getStorageKey(lobbyCode));
  } catch (error) {
    console.error('Error clearing lobby state from localStorage:', error);
  }
}
