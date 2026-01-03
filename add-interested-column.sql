-- Add the "interested" column to existing contacts table
-- Run this in your Supabase SQL Editor if you already created the table

ALTER TABLE contacts ADD COLUMN IF NOT EXISTS interested TEXT;

