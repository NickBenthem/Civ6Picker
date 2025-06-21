-- Complete lobby system implementation
-- This migration consolidates all lobby-related schema changes:
-- 1. Creates lobbies table and adds lobby support
-- 2. Fixes RLS policies for votes
-- 3. Adds comprehensive performance indices
-- 4. Cleans up obsolete columns from leaders table
-- 5. Changes connected_users to use lobby codes directly

-- ============================================================================
-- PART 1: Create lobbies table and add lobby support
-- ============================================================================

-- Create lobbies table
CREATE TABLE IF NOT EXISTS lobbies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lobby_code text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add lobby_id to votes table
ALTER TABLE votes ADD COLUMN IF NOT EXISTS lobby_id uuid REFERENCES lobbies(id) ON DELETE CASCADE;

-- Create index for lobby lookups
CREATE INDEX IF NOT EXISTS idx_votes_lobby_id ON votes(lobby_id);
CREATE INDEX IF NOT EXISTS idx_lobbies_lobby_code ON lobbies(lobby_code);

-- Enable RLS on lobbies table
ALTER TABLE lobbies ENABLE ROW LEVEL SECURITY;

-- Create policies for lobbies
CREATE POLICY "Anyone can read lobbies"
  ON lobbies
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can insert lobbies"
  ON lobbies
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Update existing policies to include lobby_id
DROP POLICY IF EXISTS "Anyone can read leaders" ON leaders;
CREATE POLICY "Anyone can read leaders"
  ON leaders
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create function to get or create lobby
CREATE OR REPLACE FUNCTION get_or_create_lobby(lobby_code_param text)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  lobby_id uuid;
BEGIN
  -- Try to find existing lobby
  SELECT id INTO lobby_id FROM lobbies WHERE lobby_code = lobby_code_param;
  
  -- If not found, create new lobby
  IF lobby_id IS NULL THEN
    INSERT INTO lobbies (lobby_code) VALUES (lobby_code_param)
    RETURNING id INTO lobby_id;
  END IF;
  
  RETURN lobby_id;
END;
$$;

-- ============================================================================
-- PART 3: Add comprehensive performance indices
-- ============================================================================

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

-- Index for leader names (for search functionality)
CREATE INDEX IF NOT EXISTS idx_leaders_name 
  ON leaders USING gin (to_tsvector('english', name));

-- Civilizations table indices
-- Index for civilization names (for search functionality)
CREATE INDEX IF NOT EXISTS idx_civilizations_name 
  ON civilizations USING gin (to_tsvector('english', name));

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

-- ============================================================================
-- PART 5: Change connected_users table to use lobby codes directly
-- ============================================================================

-- Create index for lobby code lookups
CREATE INDEX IF NOT EXISTS idx_connected_users_lobby_code ON connected_users(lobby_code);

-- Create composite index for user presence lookups
CREATE INDEX IF NOT EXISTS idx_connected_users_lobby_user ON connected_users (lobby_code, user_name);

-- Drop the old index that referenced lobby_id
DROP INDEX IF EXISTS idx_connected_users_lobby_id;

-- Index for user last seen (for cleanup operations)
CREATE INDEX IF NOT EXISTS idx_connected_users_last_seen 
  ON connected_users (last_seen DESC);

-- Index for unique user names
CREATE INDEX IF NOT EXISTS idx_connected_users_user_name 
  ON connected_users (user_name);

-- ============================================================================
-- PART 7: Add comments for documentation
-- ============================================================================
COMMENT ON INDEX idx_votes_leader_lobby_type IS 'Optimizes ban status lookups by leader and lobby';
COMMENT ON INDEX idx_votes_created_at IS 'Optimizes ordering by vote timestamp';
COMMENT ON INDEX idx_leaders_name IS 'Optimizes leader name search functionality';
COMMENT ON INDEX idx_connected_users_lobby_code IS 'Optimizes lobby code lookups in connected_users table';
COMMENT ON INDEX idx_connected_users_lobby_user IS 'Optimizes user presence lookups per lobby using lobby code';
COMMENT ON INDEX idx_votes_active IS 'Optimizes active vote queries (lobby-specific)'; 



ALTER TABLE votes 
ADD CONSTRAINT votes_leader_user_lobby_type_unique 
UNIQUE (leader_id, user_id, lobby_id, vote_type);

-- Add comment explaining the constraint
COMMENT ON CONSTRAINT votes_leader_user_lobby_type_unique ON votes 
IS 'Ensures each user can only have one vote per leader per lobby per vote type'; 