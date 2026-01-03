# Fix Row Level Security Policy Error

If you're getting the error: `new row violates row-level security policy for table "contacts"`, follow these steps:

## Quick Fix (Recommended)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the entire contents of `fix-rls.sql` file
4. Click **Run** to execute the SQL
5. Try submitting the form again

Alternatively, run this SQL directly:

```sql
-- Drop the existing policy if it exists
DROP POLICY IF EXISTS "Allow public inserts" ON contacts;

-- Create a new policy that allows public inserts
CREATE POLICY "Allow public inserts" ON contacts
  FOR INSERT
  TO public
  WITH CHECK (true);
```

## Alternative: Disable RLS (Not Recommended for Production)

If you want to disable RLS temporarily for testing:

```sql
ALTER TABLE contacts DISABLE ROW LEVEL SECURITY;
```

**Note:** This is not recommended for production as it allows anyone to insert, update, or delete data without restrictions.

## Verify Your Policy

To check if your policy exists, run:

```sql
SELECT * FROM pg_policies WHERE tablename = 'contacts';
```

You should see a policy named "Allow public inserts" with:
- `cmd` = `INSERT`
- `roles` = `{public}`

## Complete Policy Setup (Recommended)

For a complete setup with proper security:

```sql
-- Drop existing policies
DROP POLICY IF EXISTS "Allow public inserts" ON contacts;
DROP POLICY IF EXISTS "Allow authenticated reads" ON contacts;

-- Allow anyone to insert (for form submissions)
CREATE POLICY "Allow public inserts" ON contacts
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow authenticated users to read all contacts
CREATE POLICY "Allow authenticated reads" ON contacts
  FOR SELECT
  TO authenticated
  USING (true);

-- Optionally: Allow authenticated users to update/delete their own contacts
-- (Uncomment if needed)
-- CREATE POLICY "Allow users to update own contacts" ON contacts
--   FOR UPDATE
--   TO authenticated
--   USING (auth.uid() = user_id)
--   WITH CHECK (auth.uid() = user_id);
```

After running this SQL, try submitting the form again. It should work!

