-- Complete SQL script to fix Row Level Security policy
-- Run this in your Supabase SQL Editor

-- Step 1: Drop all existing policies on the contacts table
DROP POLICY IF EXISTS "Allow public inserts" ON contacts;
DROP POLICY IF EXISTS "Allow authenticated reads" ON contacts;
DROP POLICY IF EXISTS "Allow users to update own contacts" ON contacts;

-- Step 2: Ensure RLS is enabled
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Step 3: Create a policy that allows anyone (public/anonymous) to insert
-- This is needed for the contact form to work without authentication
CREATE POLICY "Allow public inserts" ON contacts
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Step 4: (Optional) Allow authenticated users to read all contacts
-- Uncomment if you want logged-in users to view submissions
-- CREATE POLICY "Allow authenticated reads" ON contacts
--   FOR SELECT
--   TO authenticated
--   USING (true);

-- Verify the policy was created
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'contacts';

