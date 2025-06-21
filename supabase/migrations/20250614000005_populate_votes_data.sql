-- Migration to populate votes table with sample data
-- This creates a lobby and populates votes for banned leaders

-- Create a lobby for this data
INSERT INTO lobbies (lobby_code) 
VALUES ('1WV-HBE')
ON CONFLICT (lobby_code) DO NOTHING;

-- Get the lobby ID and insert votes for banned leaders
DO $$
DECLARE
    target_lobby_id uuid;
BEGIN
    SELECT id INTO target_lobby_id FROM lobbies WHERE lobby_code = '1WV-HBE';
    
    -- Insert ban votes for specific leaders
    INSERT INTO votes (leader_id, user_id, vote_type, lobby_id)
    SELECT l.id, 'Martin', 'ban', target_lobby_id
    FROM leaders l
    WHERE l.name = 'Wu Zetian'
    ON CONFLICT DO NOTHING;
    
    INSERT INTO votes (leader_id, user_id, vote_type, lobby_id)
    SELECT l.id, 'Nick', 'ban', target_lobby_id
    FROM leaders l
    WHERE l.name IN (
        'Hammurabi',
        'Gandhi',
        'Ambiorix',
        'Saladin (Vizier)',
        'Kupe',
        'Dido',
        'Nzinga Mbande',
        'Harald Hardrada',
        'Qin Shi Huang (Unifier)',
        'Tomyris',
        'Jayavarman VII',
        'Philip II',
        'Catherine de Medici (Black Queen)',
        'Lautaro',
        'Teddy Roosevelt',
        'Teddy Roosevelt (Bull Moose)',
        'Chandragupta',
        'Eleanor of Aquitaine (English)',
        'Tamar',
        'Gitarja',
        'Gilgamesh',
        'Matthias Corvinus',
        'Julius Caesar',
        'Kristina',
        'Jadwiga',
        'Alexander'
    )
    ON CONFLICT DO NOTHING;
    
END $$; 