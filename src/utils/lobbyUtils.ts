// Generate a random lobby code in the format XXX-XXX
export function generateLobbyCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const part1 = Array.from({ length: 3 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  const part2 = Array.from({ length: 3 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `${part1}-${part2}`;
}

// Validate lobby code format
export function isValidLobbyCode(code: string): boolean {
  const lobbyCodeRegex = /^[A-Z0-9]{3}-[A-Z0-9]{3}$/;
  return lobbyCodeRegex.test(code.toUpperCase());
}

// Normalize lobby code (convert to uppercase and ensure format)
export function normalizeLobbyCode(code: string): string {
  return code.toUpperCase().replace(/[^A-Z0-9-]/g, '');
} 