-- Migration to clean up obsolete columns from leaders table
ALTER TABLE leaders DROP COLUMN IF EXISTS is_banned;
ALTER TABLE leaders DROP COLUMN IF EXISTS banned_by;
ALTER TABLE leaders DROP COLUMN IF EXISTS banned_at; 