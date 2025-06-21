import { generateLobbyCode, isValidLobbyCode, normalizeLobbyCode } from './lobbyUtils';

// Simple test function to verify lobby utilities
export function testLobbyUtils() {
  console.log('Testing lobby utilities...');
  
  // Test generateLobbyCode
  const code1 = generateLobbyCode();
  const code2 = generateLobbyCode();
  console.log('Generated codes:', code1, code2);
  console.log('Codes are different:', code1 !== code2);
  
  // Test isValidLobbyCode
  console.log('Valid codes:', isValidLobbyCode('ABC-123'), isValidLobbyCode('XYZ-789'));
  console.log('Invalid codes:', isValidLobbyCode('ABC123'), isValidLobbyCode('ABC-12'), isValidLobbyCode('ABC-1234'));
  
  // Test normalizeLobbyCode
  console.log('Normalized codes:', 
    normalizeLobbyCode('abc-123'), 
    normalizeLobbyCode('ABC-123'), 
    normalizeLobbyCode('abc123')
  );
  
  console.log('Lobby utilities test completed!');
}

// Run test if this file is executed directly
if (typeof window !== 'undefined') {
  // Browser environment - can be called from console
  (window as any).testLobbyUtils = testLobbyUtils;
} 