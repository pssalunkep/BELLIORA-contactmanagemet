# Supabase Setup Instructions

## 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign up/login
2. Create a new project
3. Wait for the project to be set up (takes a few minutes)

## 2. Create the Contacts Table

Once your project is ready, go to the SQL Editor and run this SQL to create the contacts table:

```sql
-- Create contacts table
CREATE TABLE contacts (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  interested TEXT,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anonymous inserts (for form submissions)
-- This allows anyone to insert data without authentication
CREATE POLICY "Allow public inserts" ON contacts
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create a policy that allows authenticated users to read (optional)
-- This allows logged-in users to view all contacts
CREATE POLICY "Allow authenticated reads" ON contacts
  FOR SELECT
  TO authenticated
  USING (true);
```

## 3. Get Your API Keys

1. Go to your Supabase project dashboard
2. Navigate to **Settings** → **API**
3. Copy the following values:
   - **Project URL** → Use as `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → Use as `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 4. Set Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Add your Supabase credentials to `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

## 5. Deploy to Vercel

1. Push your code to GitHub
2. Import your repository to Vercel
3. Add the environment variables in Vercel's project settings:
   - Go to **Settings** → **Environment Variables**
   - Add `NEXT_PUBLIC_SUPABASE_URL`
   - Add `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy!

## 6. Add the "interested" Column (If Table Already Exists)

If you already created the contacts table without the `interested` field, run this SQL to add it:

```sql
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS interested TEXT;
```

## 7. View Your Data

You can view submitted contacts in your Supabase dashboard:
- Go to **Table Editor** → **contacts**

