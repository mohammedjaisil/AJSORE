-- AJ Store Complete Supabase Schema
-- Includes Auth (NextAuth Adapter compatibility) and Business Logic

-- 1. UTILITIES
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUMS
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('USER', 'ADMIN');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE order_status AS ENUM ('Processing', 'Shipped', 'Delivered', 'Cancelled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. AUTH & USERS (NextAuth Compatible)
CREATE TABLE IF NOT EXISTS public.users (
  id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
  name text,
  email text UNIQUE,
  email_verified timestamp with time zone,
  image text,
  password text,
  role user_role DEFAULT 'USER',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.accounts (
  id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
  userId uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  type text NOT NULL,
  provider text NOT NULL,
  providerAccountId text NOT NULL,
  refresh_token text,
  access_token text,
  expires_at bigint,
  token_type text,
  scope text,
  id_token text,
  session_state text,
  oauth_token_secret text,
  oauth_token text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT provider_unique UNIQUE(provider, providerAccountId)
);

CREATE TABLE IF NOT EXISTS public.sessions (
  id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
  expires timestamp with time zone NOT NULL,
  sessionToken text NOT NULL UNIQUE,
  userId uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.verification_tokens (
  identifier text NOT NULL,
  token text NOT NULL UNIQUE,
  expires timestamp with time zone NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  PRIMARY KEY (identifier, token)
);

-- 4. E-COMMERCE CORE
-- Categories
CREATE TABLE IF NOT EXISTS public.categories (
    id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    name text NOT NULL UNIQUE,
    slug text NOT NULL UNIQUE,
    description text,
    image text,
    icon text,
    bg_color text,
    created_at timestamp with time zone DEFAULT now()
);

-- Products
CREATE TABLE IF NOT EXISTS public.products (
    id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    name text NOT NULL,
    description text,
    price numeric(10, 2) NOT NULL,
    old_price numeric(10, 2),
    stock integer NOT NULL DEFAULT 0,
    image text NOT NULL,
    secondary_image text,
    category_id uuid REFERENCES public.categories(id) ON DELETE SET NULL,
    category_name text, 
    rating numeric(3, 2) DEFAULT 0,
    reviews_count integer DEFAULT 0,
    colors text[],
    features text[],
    is_featured boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- Reviews
CREATE TABLE IF NOT EXISTS public.reviews (
    id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    user_id uuid REFERENCES public.users(id) ON DELETE SET NULL,
    user_name text NOT NULL,
    rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment text,
    is_verified boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now()
);

-- Orders
CREATE TABLE IF NOT EXISTS public.orders (
    id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id uuid REFERENCES public.users(id) ON DELETE SET NULL,
    user_email text NOT NULL,
    total numeric(10, 2) NOT NULL,
    status order_status DEFAULT 'Processing',
    shipping_address jsonb,
    payment_info jsonb,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- Order Items
CREATE TABLE IF NOT EXISTS public.order_items (
    id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    order_id uuid NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id uuid REFERENCES public.products(id) ON DELETE SET NULL,
    product_name text NOT NULL,
    price numeric(10, 2) NOT NULL,
    quantity integer NOT NULL DEFAULT 1,
    selected_color text
);

-- Blog Posts
CREATE TABLE IF NOT EXISTS public.posts (
    id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    title text NOT NULL,
    slug text NOT NULL UNIQUE,
    excerpt text,
    content text,
    image text,
    author_id uuid REFERENCES public.users(id),
    is_published boolean DEFAULT false,
    published_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- User Addresses
CREATE TABLE IF NOT EXISTS public.addresses (
    id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    type text DEFAULT 'Home',
    address text NOT NULL,
    is_default boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now()
);

-- 5. UTILITY FUNCTIONS
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'ADMIN'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. SECURITY POLICIES (Row Level Security)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist before recreating
DROP POLICY IF EXISTS "Users read own" ON public.users;
DROP POLICY IF EXISTS "Admins read all users" ON public.users;
DROP POLICY IF EXISTS "Public read products" ON public.products;
DROP POLICY IF EXISTS "Admin write products" ON public.products;

-- Users: Read own data
CREATE POLICY "Users read own" ON public.users FOR SELECT USING (auth.uid() = id);

-- Admins: Read all users
CREATE POLICY "Admins read all users" ON public.users FOR SELECT USING (is_admin());

-- Products: Public read
CREATE POLICY "Public read products" ON public.products FOR SELECT USING (true);

-- Products: Admin write
CREATE POLICY "Admin write products" ON public.products FOR ALL USING (is_admin());


-- 6. INDEXES
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_orders_user ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);

-- 7. SEED DATA
INSERT INTO public.categories (name, slug, icon, bg_color) VALUES
('Audio', 'audio', '🎧', '#f3f9f6'),
('Wearables', 'wearables', '⌚', '#f0f4ff'),
('Computing', 'computing', '💻', '#fff7ed'),
('Accessories', 'accessories', '🔌', '#fdf2f8')
ON CONFLICT (name) DO NOTHING;
