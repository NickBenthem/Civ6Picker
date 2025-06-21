-- Clean up redundant indices and optimize overlapping ones
-- This migration removes indices that are automatically created by unique constraints
-- and optimizes overlapping indices for better query performance

-- Remove redundant lobby_code index (automatically created by UNIQUE constraint)
DROP INDEX IF EXISTS idx_lobbies_lobby_code;

-- Remove redundant user_name index (automatically created by UNIQUE constraint)
DROP INDEX IF EXISTS idx_connected_users_user_name;

-- Remove the overlapping index since idx_votes_leader_lobby_user_type covers the same queries
-- and provides more specific functionality
DROP INDEX IF EXISTS idx_votes_leader_lobby_type;

-- Add comments for the remaining optimized indices
COMMENT ON INDEX idx_votes_leader_lobby_user_type IS 'Optimizes vote lookups by leader, lobby, user, and vote type (covers ban status checks)';
COMMENT ON INDEX idx_votes_active IS 'Optimizes active vote queries with timestamp ordering (lobby-specific)'; 