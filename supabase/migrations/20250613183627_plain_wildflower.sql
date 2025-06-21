-- Drop existing tables if they exist
DROP TABLE IF EXISTS votes CASCADE;
DROP TABLE IF EXISTS unique_units CASCADE;
DROP TABLE IF EXISTS unique_infrastructure CASCADE;
DROP TABLE IF EXISTS leaders CASCADE;
DROP TABLE IF EXISTS civilizations CASCADE;
DROP TABLE IF EXISTS connected_users CASCADE;

-- Create civilizations table
CREATE TABLE IF NOT EXISTS civilizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  image_key text NOT NULL,
  civilization_bonus text,
  created_at timestamptz DEFAULT now()
);

-- Create leaders table with updated schema
CREATE TABLE IF NOT EXISTS leaders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  civilization_id uuid NOT NULL,
  image_key text NOT NULL,
  ability text NOT NULL,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT fk_civilization
    FOREIGN KEY (civilization_id)
    REFERENCES civilizations(id)
    ON DELETE CASCADE
);

-- Create unique units table
CREATE TABLE IF NOT EXISTS unique_units (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  civilization_id uuid NOT NULL,
  name text NOT NULL,
  image_key text NOT NULL,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT fk_civilization_units
    FOREIGN KEY (civilization_id)
    REFERENCES civilizations(id)
    ON DELETE CASCADE
);

-- Create unique infrastructure table
CREATE TABLE IF NOT EXISTS unique_infrastructure (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  civilization_id uuid NOT NULL,
  name text NOT NULL,
  image_key text NOT NULL,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT fk_civilization_infra
    FOREIGN KEY (civilization_id)
    REFERENCES civilizations(id)
    ON DELETE CASCADE
);

-- Create votes table
CREATE TABLE IF NOT EXISTS votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  leader_id uuid NOT NULL,
  user_id text NOT NULL,
  vote_type text DEFAULT 'ban',
  created_at timestamptz DEFAULT now(),
  CONSTRAINT fk_leader
    FOREIGN KEY (leader_id)
    REFERENCES leaders(id)
    ON DELETE CASCADE
);

-- Create connected_users table
CREATE TABLE IF NOT EXISTS connected_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lobby_code text,
  user_name text NOT NULL UNIQUE,
  last_seen timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE civilizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaders ENABLE ROW LEVEL SECURITY;
ALTER TABLE unique_units ENABLE ROW LEVEL SECURITY;
ALTER TABLE unique_infrastructure ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE connected_users ENABLE ROW LEVEL SECURITY;

-- Create policies for civilizations
CREATE POLICY "Anyone can read civilizations"
  ON civilizations
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create policies for leaders
CREATE POLICY "Anyone can read leaders"
  ON leaders
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create policies for unique units
CREATE POLICY "Anyone can read unique units"
  ON unique_units
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create policies for unique infrastructure
CREATE POLICY "Anyone can read unique infrastructure"
  ON unique_infrastructure
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create policies for votes
CREATE POLICY "Anyone can read votes"
  ON votes
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can insert votes"
  ON votes
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

  -- Add UPDATE policy for votes
CREATE POLICY "Anyone can update votes"
  ON votes
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Add DELETE policy for votes
CREATE POLICY "Anyone can delete votes"
  ON votes
  FOR DELETE
  TO anon, authenticated
  USING (true);


-- Create policies for connected_users
CREATE POLICY "Anyone can read connected users"
  ON connected_users
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can insert connected users"
  ON connected_users
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can update connected users"
  ON connected_users
  FOR UPDATE
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can delete connected users"
  ON connected_users
  FOR DELETE
  TO anon, authenticated
  USING (true);
