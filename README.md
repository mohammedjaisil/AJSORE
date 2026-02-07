# AJ Store - Next.js Migration

A premium e-commerce experience migrated from Vite/React to Next.js 14 App Router, powered by Supabase and NextAuth.

## 🛠️ Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Framer Motion
- **State**: Zustand (Cart/Wishlist)
- **Auth**: NextAuth.js v5 + Supabase Adapter
- **Database**: Supabase (PostgreSQL)

## 🚀 Getting Started

### 1. Environment Setup
Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
AUTH_SECRET=generate_with_openssl_rand_base64_32
```

### 2. Database Setup
Run the SQL script located in `supabase/schema.sql` in your Supabase SQL Editor to create the necessary tables for Auth and Products.

### 3. Install & Run
```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📂 Project Structure
- `src/app`: Page routes and layouts
- `src/components`: Reusable UI components
- `src/lib`: Utilities, Constants, and Supabase client
- `src/actions`: Server Actions (Auth, Data Fetching)
- `src/types`: TypeScript definitions
