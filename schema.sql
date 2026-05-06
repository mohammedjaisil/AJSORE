-- AJ STORE Database Schema
-- Supabase / PostgreSQL

-- 1. Users Table
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    avatar TEXT,
    role TEXT DEFAULT 'USER' CHECK (role IN ('USER', 'ADMIN')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Products Table
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC NOT NULL DEFAULT 0,
    image TEXT,
    category TEXT,
    rating NUMERIC DEFAULT 0,
    reviews INTEGER DEFAULT 0,
    stock INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    detailed_reviews JSONB DEFAULT '[]'::jsonb,
    features JSONB DEFAULT '[]'::jsonb,
    specifications JSONB DEFAULT '{}'::jsonb,
    colors JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Categories Table
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    icon TEXT,
    description TEXT,
    count INTEGER DEFAULT 0,
    image TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT, -- Can be linked to auth.users.id
    user_name TEXT,
    user_email TEXT,
    status TEXT DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'PAID', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED')),
    total NUMERIC NOT NULL DEFAULT 0,
    shipping_address TEXT,
    tracking_number TEXT,
    courier TEXT,
    notes TEXT,
    shipped_at TIMESTAMPTZ,
    delivered_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    payment_status TEXT DEFAULT 'PENDING'
);

-- 5. Order Items Table
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id TEXT,
    product_name TEXT,
    price NUMERIC NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    image TEXT,
    color TEXT,
    size TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Coupons Table
CREATE TABLE IF NOT EXISTS public.coupons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE NOT NULL,
    discount NUMERIC NOT NULL,
    type TEXT DEFAULT 'PERCENT' CHECK (type IN ('PERCENT', 'FIXED')),
    expiry_date TIMESTAMPTZ,
    usage_limit INTEGER DEFAULT 100,
    used_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Notifications Table
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type TEXT,
    title TEXT NOT NULL,
    message TEXT,
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Settings Table
CREATE TABLE IF NOT EXISTS public.settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS) Recommendations:
-- ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Public Access" ON public.products FOR SELECT USING (true);
-- CREATE POLICY "Admin Full Access" ON public.products FOR ALL USING (auth.jwt() ->> 'role' = 'ADMIN');

-- 9. Storage Buckets (For Image Uploads)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('assets', 'assets', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies for 'assets' bucket
CREATE POLICY "Public read access for assets" 
ON storage.objects FOR SELECT 
USING ( bucket_id = 'assets' );

CREATE POLICY "Authenticated users can upload assets" 
ON storage.objects FOR INSERT 
WITH CHECK ( bucket_id = 'assets' AND auth.role() = 'authenticated' );

CREATE POLICY "Authenticated users can update assets" 
ON storage.objects FOR UPDATE 
WITH CHECK ( bucket_id = 'assets' AND auth.role() = 'authenticated' );

CREATE POLICY "Authenticated users can delete assets" 
ON storage.objects FOR DELETE 
USING ( bucket_id = 'assets' AND auth.role() = 'authenticated' );
