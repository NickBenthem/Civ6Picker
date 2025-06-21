-- Migration to populate votes table with sample data
-- This creates a lobby and populates votes for all leaders with their ban status

-- Create a lobby for this data
INSERT INTO lobbies (lobby_code) 
VALUES ('1WV-HBE')
ON CONFLICT (lobby_code) DO NOTHING;

-- Get the lobby ID
DO $$
DECLARE
    target_lobby_id uuid;
BEGIN
    SELECT id INTO target_lobby_id FROM lobbies WHERE lobby_code = '1WV-HBE';
    
    -- Update leaders with ban status and populate votes
    -- First, update all leaders to not banned and clear banned_by
    UPDATE leaders SET is_banned = false, banned_by = NULL, lobby_id = target_lobby_id;
    
    -- Then update specific leaders with their ban status
    UPDATE leaders SET is_banned = true, banned_by = 'Martin' WHERE name = 'Wu Zetian';
    UPDATE leaders SET is_banned = true, banned_by = 'Nick' WHERE name = 'Hammurabi';
    UPDATE leaders SET is_banned = true, banned_by = 'Nick' WHERE name = 'Gandhi';
    UPDATE leaders SET is_banned = true, banned_by = 'Nick' WHERE name = 'Ambiorix';
    UPDATE leaders SET is_banned = true, banned_by = 'Nick' WHERE name = 'Saladin (Vizier)';
    UPDATE leaders SET is_banned = true, banned_by = 'Nick' WHERE name = 'Kupe';
    UPDATE leaders SET is_banned = true, banned_by = 'Nick' WHERE name = 'Dido';
    UPDATE leaders SET is_banned = true, banned_by = 'Nick' WHERE name = 'Nzinga Mbande';
    UPDATE leaders SET is_banned = true, banned_by = 'Nick' WHERE name = 'Harald Hardrada';
    UPDATE leaders SET is_banned = true, banned_by = 'Nick' WHERE name = 'Qin Shi Huang (Unifier)';
    UPDATE leaders SET is_banned = true, banned_by = 'Nick' WHERE name = 'Tomyris';
    UPDATE leaders SET is_banned = true, banned_by = 'Nick' WHERE name = 'Jayavarman VII';
    UPDATE leaders SET is_banned = true, banned_by = 'Nick' WHERE name = 'Philip II';
    UPDATE leaders SET is_banned = true, banned_by = 'Nick' WHERE name = 'Catherine de Medici (Black Queen)';
    UPDATE leaders SET is_banned = true, banned_by = 'Nick' WHERE name = 'Lautaro';
    UPDATE leaders SET is_banned = true, banned_by = 'Nick' WHERE name = 'Teddy Roosevelt';
    UPDATE leaders SET is_banned = true, banned_by = 'Nick' WHERE name = 'Teddy Roosevelt (Bull Moose)';
    UPDATE leaders SET is_banned = true, banned_by = 'Nick' WHERE name = 'Chandragupta';
    UPDATE leaders SET is_banned = true, banned_by = 'Nick' WHERE name = 'Eleanor of Aquitaine (English)';
    UPDATE leaders SET is_banned = true, banned_by = 'Nick' WHERE name = 'Tamar';
    UPDATE leaders SET is_banned = true, banned_by = 'Nick' WHERE name = 'Gitarja';
    UPDATE leaders SET is_banned = true, banned_by = 'Nick' WHERE name = 'Gilgamesh';
    UPDATE leaders SET is_banned = true, banned_by = 'Nick' WHERE name = 'Matthias Corvinus';
    UPDATE leaders SET is_banned = true, banned_by = 'Nick' WHERE name = 'Julius Caesar';
    UPDATE leaders SET is_banned = true, banned_by = 'Nick' WHERE name = 'Kristina';
    UPDATE leaders SET is_banned = true, banned_by = 'Nick' WHERE name = 'Jadwiga';
    UPDATE leaders SET is_banned = true, banned_by = 'Nick' WHERE name = 'Alexander';
    
    -- Insert votes for all leaders
    -- Banned leaders get ban votes
    INSERT INTO votes (leader_id, user_id, vote_type, lobby_id)
    SELECT l.id, l.banned_by, 'ban', target_lobby_id
    FROM leaders l
    WHERE l.is_banned = true AND l.banned_by IS NOT NULL;
    
    -- Non-banned leaders get no votes (they're available)
    -- This is represented by not having any votes in the votes table
    
END $$; 