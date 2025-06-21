-- Fix race condition in get_or_create_lobby function
-- The current function has a race condition where concurrent requests could both fail to find
-- a lobby and then both try to insert it, causing a conflict

CREATE OR REPLACE FUNCTION get_or_create_lobby(lobby_code_param text)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  lobby_id uuid;
BEGIN
  -- Use INSERT ... ON CONFLICT to handle race conditions properly
  INSERT INTO lobbies (lobby_code) 
  VALUES (lobby_code_param)
  ON CONFLICT (lobby_code) DO NOTHING
  RETURNING id INTO lobby_id;
  
  -- If the insert didn't return an id (because of conflict), get the existing one
  IF lobby_id IS NULL THEN
    SELECT id INTO lobby_id FROM lobbies WHERE lobby_code = lobby_code_param;
  END IF;
  
  RETURN lobby_id;
END;
$$; 