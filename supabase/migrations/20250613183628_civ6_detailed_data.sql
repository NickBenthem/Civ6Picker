-- Drop existing tables if they exist
DROP TABLE IF EXISTS votes CASCADE;
DROP TABLE IF EXISTS unique_units CASCADE;
DROP TABLE IF EXISTS unique_infrastructure CASCADE;
DROP TABLE IF EXISTS leaders CASCADE;
DROP TABLE IF EXISTS civilizations CASCADE;

-- Create civilizations table
CREATE TABLE IF NOT EXISTS civilizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  image_key text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create leaders table with updated schema
CREATE TABLE IF NOT EXISTS leaders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  civilization_id uuid NOT NULL,
  image_key text NOT NULL,
  ability text NOT NULL,
  is_banned boolean DEFAULT false,
  banned_by text,
  banned_at timestamptz,
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

-- Enable Row Level Security
ALTER TABLE civilizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaders ENABLE ROW LEVEL SECURITY;
ALTER TABLE unique_units ENABLE ROW LEVEL SECURITY;
ALTER TABLE unique_infrastructure ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

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

CREATE POLICY "Anyone can update leaders"
  ON leaders
  FOR UPDATE
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

-- Insert sample data
INSERT INTO civilizations (name, image_key) VALUES
  ('American', 'American__Civ6_.png'),
  ('Arabian', 'Arabian__Civ6_.png'),
  ('Australian', 'Australian__Civ6_.png');

-- Insert American leaders
WITH american_civ AS (SELECT id FROM civilizations WHERE name = 'American')
INSERT INTO leaders (name, civilization_id, image_key, ability)
SELECT 
  'Teddy Roosevelt',
  id,
  'Teddy_Roosevelt__Civ6_.png',
  'Founding Fathers Government legacy bonuses accumulate in half the usual number of turns. \n All Diplomatic policy slots in the current government are converted to Wildcard slots. \n All Diplomatic policy slots in the current government are converted to Wildcard slots. \n +1 Diplomatic Favor per turn for each Wildcard slot in the current government.'
FROM american_civ
UNION ALL
SELECT 
  'Teddy Roosevelt (Bull Moose)',
  id,
  'Teddy_Roosevelt__Civ6_.png',
  'Founding Fathers Government legacy bonuses accumulate in half the usual number of turns. \n All Diplomatic policy slots in the current government are converted to Wildcard slots. \n All Diplomatic policy slots in the current government are converted to Wildcard slots. \n +1 Diplomatic Favor per turn for each Wildcard slot in the current government.'
FROM american_civ
UNION ALL
SELECT 
  'Teddy Roosevelt (Rough Rider)',
  id,
  'Teddy_Roosevelt__Rough_Rider___Civ6_.png',
  'Founding Fathers Government legacy bonuses accumulate in half the usual number of turns. \n All Diplomatic policy slots in the current government are converted to Wildcard slots. \n All Diplomatic policy slots in the current government are converted to Wildcard slots. \n +1 Diplomatic Favor per turn for each Wildcard slot in the current government.'
FROM american_civ
UNION ALL
SELECT 
  'Abraham Lincoln',
  id,
  'Abraham_Lincoln__Civ6_.png',
  'Founding Fathers Government legacy bonuses accumulate in half the usual number of turns. \n All Diplomatic policy slots in the current government are converted to Wildcard slots. \n All Diplomatic policy slots in the current government are converted to Wildcard slots. \n +1 Diplomatic Favor per turn for each Wildcard slot in the current government.'
FROM american_civ;

-- Insert Arabian leaders
WITH arabian_civ AS (SELECT id FROM civilizations WHERE name = 'Arabian')
INSERT INTO leaders (name, civilization_id, image_key, ability)
SELECT 
  'Saladin (Vizier)',
  id,
  'Saladin__Civ6_.png',
  'The Last Prophet Automatically receives the final Great Prophet when the next-to-last one is claimed (unless one has already been earned through other means). \n +1 Science per foreign city following Arabia''s Religion.'
FROM arabian_civ
UNION ALL
SELECT 
  'Saladin (Sultan)',
  id,
  'Saladin__Sultan___Civ6_.png',
  'The Last Prophet Automatically receives the final Great Prophet when the next-to-last one is claimed (unless one has already been earned through other means). \n +1 Science per foreign city following Arabia''s Religion.'
FROM arabian_civ;

-- Insert Australian leaders
WITH australian_civ AS (SELECT id FROM civilizations WHERE name = 'Australian')
INSERT INTO leaders (name, civilization_id, image_key, ability)
SELECT 
  'John Curtin',
  id,
  'John_Curtin__Civ6_.png',
  'Land Down Under +3 Housing in coastal cities. \n Building a Pasture triggers a Culture Bomb, claiming surrounding tiles. \n Campus, Commercial Hub, Holy Site, and Theater Square districts gain +1 to their yields in tiles with Charming Appeal, and +3 in tiles with Breathtaking Appeal.'
FROM australian_civ;

-- Insert unique units
WITH american_civ AS (SELECT id FROM civilizations WHERE name = 'American'),
     arabian_civ AS (SELECT id FROM civilizations WHERE name = 'Arabian'),
     australian_civ AS (SELECT id FROM civilizations WHERE name = 'Australian')
INSERT INTO unique_units (civilization_id, name, image_key)
SELECT id, 'P-51 Mustang', 'P-51_Mustang__Civ6_.png' FROM american_civ
UNION ALL
SELECT id, 'Mamluk', 'Mamluk__Civ6_.png' FROM arabian_civ
UNION ALL
SELECT id, 'Digger', 'Digger__Civ6_.png' FROM australian_civ;

-- Insert unique infrastructure
WITH american_civ AS (SELECT id FROM civilizations WHERE name = 'American'),
     arabian_civ AS (SELECT id FROM civilizations WHERE name = 'Arabian'),
     australian_civ AS (SELECT id FROM civilizations WHERE name = 'Australian')
INSERT INTO unique_infrastructure (civilization_id, name, image_key)
SELECT id, 'Film Studio', 'Film_Studio__Civ6_.png' FROM american_civ
UNION ALL
SELECT id, 'Madrasa', 'Madrasa__Civ6_.png' FROM arabian_civ
UNION ALL
SELECT id, 'Outback Station', 'Outback_Station__Civ6_.png' FROM australian_civ;