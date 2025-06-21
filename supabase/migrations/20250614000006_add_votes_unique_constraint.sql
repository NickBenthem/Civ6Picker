-- Add unique constraint for votes table to support upsert operations
-- This constraint ensures that each user can only have one vote per leader per lobby per vote type

-- Add unique constraint on (leader_id, user_id, lobby_id, vote_type)
-- This allows multiple users to vote on the same leader, but prevents duplicate votes from the same user
ALTER TABLE votes 
ADD CONSTRAINT votes_leader_user_lobby_type_unique 
UNIQUE (leader_id, user_id, lobby_id, vote_type);

-- Add comment explaining the constraint
COMMENT ON CONSTRAINT votes_leader_user_lobby_type_unique ON votes 
IS 'Ensures each user can only have one vote per leader per lobby per vote type'; 