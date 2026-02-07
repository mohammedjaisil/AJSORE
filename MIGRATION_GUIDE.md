# Migration Guide: Vite to Next.js 14

## Status: In Progress 🚀

**Completed Integration:**
- [x] Project Structure (App Router)
- [x] UI Components Migration (Tailwind + Framer Motion)
- [x] Global State (Zustand) replacing Context API
- [x] Page Migration:
  - [x] Home, Shop, Product Details
  - [x] Cart, Checkout, Order Confirmation
  - [x] Authentication (Login/Signup)
  - [x] Account Profile
  - [x] Static Pages (About, FAQ, Policies)
  - [x] Blog
  - [x] 404 Page
- [x] Authentication Infrastructure:
  - [x] NextAuth.js v5 configured
  - [x] Supabase Adapter
  - [x] Login/Social Login Server Actions
  - [x] Supabase Schema (SQL)
- [x] Data Fetching:
  - [x] Server Actions for Products with Fallback

**Pending Tasks:**
- [ ] Refactor Pages to use Server Actions (`getProducts`)
  - Currently pages import `PRODUCTS` constant directly. Need to switch to `await getProducts()`.
- [ ] Database Seeding
  - Run SQL script in Supabase
  - Seed `products` table
- [ ] Final Testing & Deployment

## Quick Start
1. **Environment Setup**:
   Copy `.env.local.example` to `.env.local` and fill in Supabase/NextAuth keys.
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   SUPABASE_SERVICE_ROLE_KEY=...
   AUTH_SECRET=...
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```

## Key Architectural Changes

### Authentication
Moved from client-side `useCartStore` mock auth to **NextAuth.js**.
- **Adapter**: Supabase (User persistence)
- **Providers**: Google, Apple, Credentials (Email/Pass)
- **Middleware**: Protected routes configured in `src/auth.ts` / logic in pages.

### Data Fetching
- **Old**: Synchronous import from `constants.ts`.
- **New**: Asynchronous Server Actions `src/actions/products.ts` querying Supabase (with fallback).

### State Management
- **Cart/Wishlist**: Managed by `Zustand` (`src/lib/store.ts`) with persistence.
- **User Session**: Managed by `NextAuth`.
