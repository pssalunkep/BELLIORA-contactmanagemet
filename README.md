# QR Code Contact Form

A mobile-friendly contact form designed to be accessed via QR code. Visitors scan the QR code, fill out the form, and their information is saved to Supabase.

## Features

- 📱 Mobile-optimized responsive design
- ✅ Form validation
- 💾 Data storage in Supabase
- 🎨 Modern, clean UI with dark mode support
- 🚀 Ready for Vercel deployment

## Flow

📱 Visitor scans QR code → 📝 Mobile-friendly form → ✅ Thank-you message → 📊 Data saved

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Create a Supabase project at [https://supabase.com](https://supabase.com)
2. Follow the detailed instructions in [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) to:
   - Create the contacts table
   - Set up Row Level Security policies
   - Get your API keys

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the contact form.

## Deploy on Vercel

1. Push your code to GitHub
2. Import your repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel project settings:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy!

Your form will be live and ready for QR code scanning!

## Project Structure

```
qr-contact-form/
├── app/
│   ├── api/
│   │   └── submit/          # API route for form submissions
│   ├── thank-you/           # Thank you page after submission
│   ├── page.tsx             # Main contact form
│   └── layout.tsx           # Root layout
├── lib/
│   └── supabase.ts          # Supabase client configuration
└── SUPABASE_SETUP.md        # Detailed Supabase setup guide
```

## Form Fields

- **Name** (required)
- **Email** (required)
- **Phone Number** (optional)
- **Message** (optional)

## Technologies

- [Next.js 16](https://nextjs.org/) - React framework
- [Supabase](https://supabase.com/) - Backend and database
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [TypeScript](https://www.typescriptlang.org/) - Type safety
