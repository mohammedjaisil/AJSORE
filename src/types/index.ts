
export interface Review {
    id: string;
    userName: string;
    rating: number;
    comment: string;
    date: string;
    isVerified: boolean;
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
    stock: number;
    image: string;
    secondaryImage?: string;
    category: string;
    rating: number;
    reviews: number;
    colors?: string[];
    features?: string[];
    isFeatured?: boolean;
    detailedReviews?: Review[];
    type: 'SIMPLE' | 'VARIABLE';
    variations?: ProductVariation[];
}

export interface CartItem extends Product {
    quantity: number;
    selectedColor?: string;
}

export interface Order {
    id: string;
    date: string;
    items: CartItem[];
    total: number;
    status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
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
