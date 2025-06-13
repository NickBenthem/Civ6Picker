/*
  # Civ6 Ban Stage Database Schema

  1. New Tables
    - `leaders`
      - `id` (uuid, primary key)
      - `name` (text, leader name)
      - `civilization` (text, civilization name)
      - `image_url` (text, leader portrait URL)
      - `is_banned` (boolean, ban status)
      - `banned_by` (text, user who banned)
      - `banned_at` (timestamp, when banned)
      - `created_at` (timestamp)
    
    - `votes`
      - `id` (uuid, primary key)
      - `leader_id` (uuid, foreign key)
      - `user_id` (text, voter identifier)
      - `vote_type` (text, 'ban' for now)
      - `created_at` (timestamp)
    
    - `cursors`
      - `user_id` (text, primary key)
      - `x` (integer, cursor x position)
      - `y` (integer, cursor y position)
      - `user_name` (text, display name)
      - `color` (text, cursor color)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for read/write access
    
  3. Real-time
    - Enable real-time for all tables to support live updates
*/

-- Leaders table
CREATE TABLE IF NOT EXISTS leaders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  civilization text NOT NULL,
  image_url text NOT NULL,
  is_banned boolean DEFAULT false,
  banned_by text,
  banned_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Votes table
CREATE TABLE IF NOT EXISTS votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  leader_id uuid REFERENCES leaders(id) ON DELETE CASCADE,
  user_id text NOT NULL,
  vote_type text DEFAULT 'ban',
  created_at timestamptz DEFAULT now()
);

-- Cursors table for real-time cursor tracking
CREATE TABLE IF NOT EXISTS cursors (
  user_id text PRIMARY KEY,
  x integer NOT NULL,
  y integer NOT NULL,
  user_name text NOT NULL,
  color text DEFAULT '#3B82F6',
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE leaders ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE cursors ENABLE ROW LEVEL SECURITY;

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

-- Create policies for cursors
CREATE POLICY "Anyone can read cursors"
  ON cursors
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can insert cursors"
  ON cursors
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can update cursors"
  ON cursors
  FOR UPDATE
  TO anon, authenticated
  USING (true);

-- Insert sample Civ6 leaders (using placeholder images for now)
INSERT INTO leaders (name, civilization, image_url) VALUES
  ('Alexander', 'Macedonia', 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop'),
  ('Cleopatra', 'Egypt', 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop'),
  ('Gandhi', 'India', 'https://images.pexels.com/photos/1040879/pexels-photo-1040879.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop'),
  ('Gilgamesh', 'Sumeria', 'https://images.pexels.com/photos/1040878/pexels-photo-1040878.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop'),
  ('Montezuma', 'Aztec', 'https://images.pexels.com/photos/1040877/pexels-photo-1040877.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop'),
  ('Napoleon', 'France', 'https://images.pexels.com/photos/1040876/pexels-photo-1040876.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop'),
  ('Peter', 'Russia', 'https://images.pexels.com/photos/1040875/pexels-photo-1040875.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop'),
  ('Qin Shi Huang', 'China', 'https://images.pexels.com/photos/1040874/pexels-photo-1040874.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop'),
  ('Roosevelt', 'America', 'https://images.pexels.com/photos/1040873/pexels-photo-1040873.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop'),
  ('Saladin', 'Arabia', 'https://images.pexels.com/photos/1040872/pexels-photo-1040872.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop'),
  ('Trajan', 'Rome', 'https://images.pexels.com/photos/1040871/pexels-photo-1040871.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop'),
  ('Victoria', 'England', 'https://images.pexels.com/photos/1040870/pexels-photo-1040870.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop');