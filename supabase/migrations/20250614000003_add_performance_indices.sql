-- Add performance indices for the Civ6 Ban Stage application

-- Votes table indices (most critical for performance)
-- Index for looking up votes by leader and lobby (used in ban status checks)
CREATE INDEX IF NOT EXISTS idx_votes_leader_lobby_type 
  ON votes (leader_id, lobby_id, vote_type);

-- Index for looking up votes by user (for user-specific operations)
CREATE INDEX IF NOT EXISTS idx_votes_user_id 
  ON votes (user_id);

-- Index for vote timestamps (for ordering by most recent)
CREATE INDEX IF NOT EXISTS idx_votes_created_at 
  ON votes (created_at DESC);

-- Composite index for vote lookups with user context
CREATE INDEX IF NOT EXISTS idx_votes_leader_lobby_user_type 
  ON votes (leader_id, lobby_id, user_id, vote_type);

-- Leaders table indices
-- Index for leader lookups by civilization
CREATE INDEX IF NOT EXISTS idx_leaders_civilization_id 
  ON leaders (civilization_id);

-- Index for ban status lookups
CREATE INDEX IF NOT EXISTS idx_leaders_is_banned 
  ON leaders (is_banned) WHERE is_banned = true;

-- Index for leader names (for search functionality)
CREATE INDEX IF NOT EXISTS idx_leaders_name 
  ON leaders USING gin (to_tsvector('english', name));

-- Civilizations table indices
-- Index for civilization names (for search functionality)
CREATE INDEX IF NOT EXISTS idx_civilizations_name 
  ON civilizations USING gin (to_tsvector('english', name));

-- Connected users table indices
-- Index for user presence lookups by lobby
CREATE INDEX IF NOT EXISTS idx_connected_users_lobby_user 
  ON connected_users (lobby_id, user_name);

-- Index for user last seen (for cleanup operations)
CREATE INDEX IF NOT EXISTS idx_connected_users_last_seen 
  ON connected_users (last_seen DESC);

-- Index for unique user names
CREATE INDEX IF NOT EXISTS idx_connected_users_user_name 
  ON connected_users (user_name);

-- Lobbies table indices
-- Index for lobby code lookups (already exists, but ensuring it's optimized)
CREATE INDEX IF NOT EXISTS idx_lobbies_code_created 
  ON lobbies (lobby_code, created_at);

-- Index for lobby cleanup (old lobbies)
CREATE INDEX IF NOT EXISTS idx_lobbies_created_at 
  ON lobbies (created_at DESC);

-- Unique units and infrastructure indices
-- Index for civilization-specific units
CREATE INDEX IF NOT EXISTS idx_unique_units_civilization 
  ON unique_units (civilization_id);

-- Index for civilization-specific infrastructure
CREATE INDEX IF NOT EXISTS idx_unique_infrastructure_civilization 
  ON unique_infrastructure (civilization_id);

-- Partial indices for better performance
-- Index for active votes only (non-null lobby_id)
CREATE INDEX IF NOT EXISTS idx_votes_active 
  ON votes (leader_id, lobby_id, vote_type, created_at DESC) 
  WHERE lobby_id IS NOT NULL;

-- Add comments for documentation
COMMENT ON INDEX idx_votes_leader_lobby_type IS 'Optimizes ban status lookups by leader and lobby';
COMMENT ON INDEX idx_votes_created_at IS 'Optimizes ordering by vote timestamp';
COMMENT ON INDEX idx_leaders_name IS 'Optimizes leader name search functionality';
COMMENT ON INDEX idx_connected_users_lobby_user IS 'Optimizes user presence lookups per lobby';
COMMENT ON INDEX idx_votes_active IS 'Optimizes active vote queries (lobby-specific)'; 