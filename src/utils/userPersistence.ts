interface StoredUser {
  name: string;
  timestamp: number;
  lastLobbyCode?: string;
}

const USER_STORAGE_KEY = 'civ6_user';
const EXPIRATION_HOURS = 2400;

export function saveUser(name: string, lobbyCode?: string): void {
  const userData: StoredUser = {
    name,
    timestamp: Date.now(),
    ...(lobbyCode && { lastLobbyCode: lobbyCode })
  };
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
}

export function loadUser(): string | null {
  try {
    const stored = localStorage.getItem(USER_STORAGE_KEY);
    if (!stored) return null;

    const userData: StoredUser = JSON.parse(stored);
    const now = Date.now();
    const expirationTime = userData.timestamp + (EXPIRATION_HOURS * 60 * 60 * 1000);

    // Check if the stored data has expired
    if (now > expirationTime) {
      localStorage.removeItem(USER_STORAGE_KEY);
      return null;
    }

    return userData.name;
  } catch (error) {
    console.error('Error loading user data:', error);
    localStorage.removeItem(USER_STORAGE_KEY);
    return null;
  }
}

export function loadLastLobbyCode(): string | null {
  try {
    const stored = localStorage.getItem(USER_STORAGE_KEY);
    if (!stored) return null;

    const userData: StoredUser = JSON.parse(stored);
    const now = Date.now();
    const expirationTime = userData.timestamp + (EXPIRATION_HOURS * 60 * 60 * 1000);

    // Check if the stored data has expired
    if (now > expirationTime) {
      localStorage.removeItem(USER_STORAGE_KEY);
      return null;
    }

    return userData.lastLobbyCode || null;
  } catch (error) {
    console.error('Error loading last lobby code:', error);
    return null;
  }
}

export function clearUser(): void {
  localStorage.removeItem(USER_STORAGE_KEY);
}

export function getUserExpirationTime(): Date | null {
  try {
    const stored = localStorage.getItem(USER_STORAGE_KEY);
    if (!stored) return null;

    const userData: StoredUser = JSON.parse(stored);
    return new Date(userData.timestamp + (EXPIRATION_HOURS * 60 * 60 * 1000));
  } catch (error) {
    return null;
  }
} 