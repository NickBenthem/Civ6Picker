import type { LeaderState } from '../lib/supabase';

const STORAGE_PREFIX = 'civ6picker:lobby:v1:';

type StoredLobbyState = {
  leaders: LeaderState[];
  lastUpdated: string;
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

export function saveLobbyState(
  lobbyCode: string,
  leaders: LeaderState[]
): void {
  if (typeof window === 'undefined' || !window.localStorage) {
    return;
  }

  const payload: StoredLobbyState = {
    leaders,
    lastUpdated: new Date().toISOString(),
  };

  try {
    window.localStorage.setItem(
      getStorageKey(lobbyCode),
      JSON.stringify(payload)
    );
  } catch (error) {
    console.error('Error saving lobby state to localStorage:', error);
  }
}

