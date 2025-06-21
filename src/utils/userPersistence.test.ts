import { saveUser, loadUser, loadLastLobbyCode, clearUser, getUserExpirationTime } from './userPersistence';

// Simple test function to verify user persistence utilities
export function testUserPersistence() {
  console.log('Testing user persistence utilities...');
  
  // Mock localStorage for testing
  const originalLocalStorage = window.localStorage;
  const mockStorage: { [key: string]: string } = {};
  
  const mockLocalStorage = {
    getItem: (key: string) => mockStorage[key] || null,
    setItem: (key: string, value: string) => { mockStorage[key] = value; },
    removeItem: (key: string) => { delete mockStorage[key]; },
    clear: () => { Object.keys(mockStorage).forEach(key => delete mockStorage[key]); },
    length: 0,
    key: () => null
  };
  
  // Replace localStorage with mock
  Object.defineProperty(window, 'localStorage', {
    value: mockLocalStorage,
    writable: true
  });
  
  try {
    // Test saveUser with lobby code
    console.log('Testing saveUser with lobby code...');
    saveUser('TestUser', 'ABC-123');
    const savedData = JSON.parse(mockStorage['civ6_user']);
    console.log('Saved data:', savedData);
    console.log('Name saved correctly:', savedData.name === 'TestUser');
    console.log('Lobby code saved correctly:', savedData.lastLobbyCode === 'ABC-123');
    console.log('Timestamp exists:', !!savedData.timestamp);
    
    // Test saveUser without lobby code
    console.log('Testing saveUser without lobby code...');
    mockLocalStorage.clear();
    saveUser('TestUser2');
    const savedData2 = JSON.parse(mockStorage['civ6_user']);
    console.log('Saved data without lobby code:', savedData2);
    console.log('Lobby code is undefined:', savedData2.lastLobbyCode === undefined);
    
    // Test loadUser
    console.log('Testing loadUser...');
    const loadedUser = loadUser();
    console.log('Loaded user:', loadedUser);
    console.log('User loaded correctly:', loadedUser === 'TestUser2');
    
    // Test loadLastLobbyCode
    console.log('Testing loadLastLobbyCode...');
    mockLocalStorage.clear();
    saveUser('TestUser3', 'XYZ-789');
    const loadedLobbyCode = loadLastLobbyCode();
    console.log('Loaded lobby code:', loadedLobbyCode);
    console.log('Lobby code loaded correctly:', loadedLobbyCode === 'XYZ-789');
    
    // Test loadLastLobbyCode when no lobby code exists
    console.log('Testing loadLastLobbyCode with no lobby code...');
    mockLocalStorage.clear();
    saveUser('TestUser4');
    const noLobbyCode = loadLastLobbyCode();
    console.log('No lobby code result:', noLobbyCode);
    console.log('Returns null when no lobby code:', noLobbyCode === null);
    
    // Test expiration
    console.log('Testing expiration...');
    mockLocalStorage.clear();
    const expiredData = {
      name: 'ExpiredUser',
      timestamp: Date.now() - (25 * 60 * 60 * 1000), // 25 hours ago
      lastLobbyCode: 'EXP-123'
    };
    mockStorage['civ6_user'] = JSON.stringify(expiredData);
    const expiredUser = loadUser();
    const expiredLobbyCode = loadLastLobbyCode();
    console.log('Expired user result:', expiredUser);
    console.log('Expired lobby code result:', expiredLobbyCode);
    console.log('Expired data returns null:', expiredUser === null && expiredLobbyCode === null);
    
    // Test clearUser
    console.log('Testing clearUser...');
    mockLocalStorage.clear();
    saveUser('TestUser5', 'CLEAR-123');
    console.log('Data exists before clear:', !!mockStorage['civ6_user']);
    clearUser();
    console.log('Data removed after clear:', !mockStorage['civ6_user']);
    
    // Test getUserExpirationTime
    console.log('Testing getUserExpirationTime...');
    mockLocalStorage.clear();
    const now = Date.now();
    saveUser('TestUser6', 'TIME-123');
    const expirationTime = getUserExpirationTime();
    console.log('Expiration time:', expirationTime);
    console.log('Expiration time is Date object:', expirationTime instanceof Date);
    console.log('Expiration time is 24 hours later:', expirationTime && expirationTime.getTime() === now + (24 * 60 * 60 * 1000));
    
    console.log('User persistence test completed!');
    
  } finally {
    // Restore original localStorage
    Object.defineProperty(window, 'localStorage', {
      value: originalLocalStorage,
      writable: true
    });
  }
}

// Run test if this file is executed directly
if (typeof window !== 'undefined') {
  // Browser environment - can be called from console
  (window as any).testUserPersistence = testUserPersistence;
} 