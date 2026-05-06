
export interface Review {
    id: string;
    user_name: string;
    user_email: string;
    product_id: string;
    rating: number;
    comment: string;
    is_verified: boolean;
    admin_reply?: string;
    created_at: string;
    avatar?: string;
}

export interface Media {
    id: string;
    file_name: string;
    file_url: string;
    file_type: 'image' | 'video' | 'pdf';
    file_size: number;
    bucket: string;
    created_at: string;
}

export interface ProductVariation {
    id: string;
    product_id: string;
    sku: string;
    price: number;
    stock: number;
    attributes: { name: string; value: string }[];
    image?: string;
    created_at: string;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    oldPrice?: number;
    old_price?: number;
    stock: number;
    image: string;
    secondaryImage?: string;
    secondary_image?: string;
    category: string;
    category_id?: string;
    category_name?: string;
    rating: number;
    reviews: number;
    reviews_count?: number;
    colors?: string[];
    features?: string[];
    isFeatured?: boolean;
    is_featured?: boolean;
    detailedReviews?: Review[];
    type: 'SIMPLE' | 'VARIABLE';
    variations?: ProductVariation[];
    tags?: string[];
    sku?: string;
    meta_title?: string;
    meta_description?: string;
    slug?: string;
    supplier_price?: number;
    cost_price?: number;
    supplier_id?: string;
    supplier_name?: string;
    supplier_link?: string;
    shipping_cost?: number;
    status?: string;
}

export interface CartItem extends Product {
    quantity: number;
    selectedColor?: string;
    selectedSize?: string;
}

export interface Order {
    id: string;
    user_id: string;
    user_name: string;
    user_email: string;
    total: number;
    status: 'Pending' | 'Paid' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Refunded';
    shipping_address: string;
    tracking_number?: string;
    courier?: string;
    shipped_at?: string;
    delivered_at?: string;
    created_at: string;
    updated_at: string;
    items?: CartItem[];
}

export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    image: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role: 'USER' | 'ADMIN' | 'SUPER_ADMIN';
    addresses: Address[];
    payments: PaymentMethod[];
    created_at: string;
}

export interface Address {
    id: string;
    type: string;
    address: string;
    isDefault?: boolean;
}

export interface PaymentMethod {
    id: string;
    type: string;
    last4: string;
    isDefault?: boolean;
}

export interface Currency {
    code: string;
    symbol: string;
    rate: number;
    flag: string;
    name: string;
}

export interface Coupon {
    id: string;
    code: string;
    type: 'PERCENT' | 'FIXED';
    value: number;
    expiry_date?: string;
    usage_limit?: number;
    used_count: number;
    is_active: boolean;
    created_at: string;
}
