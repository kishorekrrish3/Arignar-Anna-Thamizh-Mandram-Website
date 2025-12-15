-- Migration: Add is_faculty column to team_members table
-- Date: 2025-12-15
-- Description: Adds a boolean field to distinguish faculty coordinators from other team members

-- Add the is_faculty column
ALTER TABLE team_members
ADD COLUMN is_faculty BOOLEAN NOT NULL DEFAULT false;

-- Add a comment to document the column
COMMENT ON COLUMN team_members.is_faculty IS 'Indicates if the team member is a faculty coordinator';

-- Create an index for better query performance
CREATE INDEX idx_team_members_is_faculty ON team_members(is_faculty);

-- Optional: If you want to update existing records
-- Example: Mark specific members as faculty (update IDs as needed)
-- UPDATE team_members SET is_faculty = true WHERE id IN ('id1', 'id2', 'id3');
