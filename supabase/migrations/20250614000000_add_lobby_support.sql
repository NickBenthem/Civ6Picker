-- Add lobby support to the database

-- Create lobbies table
CREATE TABLE IF NOT EXISTS lobbies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lobby_code text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add lobby_id to leaders table
ALTER TABLE leaders ADD COLUMN IF NOT EXISTS lobby_id uuid REFERENCES lobbies(id) ON DELETE CASCADE;

-- Add lobby_id to votes table
ALTER TABLE votes ADD COLUMN IF NOT EXISTS lobby_id uuid REFERENCES lobbies(id) ON DELETE CASCADE;

-- Add lobby_id to connected_users table
ALTER TABLE connected_users ADD COLUMN IF NOT EXISTS lobby_id uuid REFERENCES lobbies(id) ON DELETE CASCADE;

-- Create index for lobby lookups
CREATE INDEX IF NOT EXISTS idx_leaders_lobby_id ON leaders(lobby_id);
CREATE INDEX IF NOT EXISTS idx_votes_lobby_id ON votes(lobby_id);
CREATE INDEX IF NOT EXISTS idx_connected_users_lobby_id ON connected_users(lobby_id);
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

DROP POLICY IF EXISTS "Anyone can update leaders" ON leaders;
CREATE POLICY "Anyone can update leaders"
  ON leaders
  FOR UPDATE
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