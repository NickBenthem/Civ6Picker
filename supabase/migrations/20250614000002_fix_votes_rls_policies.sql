-- Fix RLS policies for votes table to allow UPDATE and DELETE operations

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