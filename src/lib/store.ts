'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem, Currency, User, Order } from '@/types';
import { CURRENCIES } from '@/lib/constants';

interface CartStore {
    cart: CartItem[];
    wishlist: Product[];
    savedForLater: CartItem[];
    currency: Currency;
    isMiniCartOpen: boolean;
    quickViewProduct: Product | null;
    user: User | null;
    orders: Order[];

    // Actions
    setCurrency: (currency: Currency) => void;
    formatPrice: (amount: number) => string;
    setIsMiniCartOpen: (open: boolean) => void;
    addToCart: (product: Product, quantity?: number, color?: string) => void;
    removeFromCart: (productId: string, color?: string) => void;
    updateQuantity: (productId: string, quantity: number, color?: string) => void;
    toggleWishlist: (product: Product) => void;
    isInWishlist: (productId: string) => boolean;
    moveToSaved: (item: CartItem) => void;
    moveToCart: (item: CartItem) => void;
    removeFromSaved: (productId: string, color?: string) => void;
    clearCart: () => void;
    setQuickViewProduct: (product: Product | null) => void;
    getCartTotal: () => number;
    login: (email: string, role?: string) => void;
    logout: () => void;
    reorder: (orderId: string) => void;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            cart: [],
            wishlist: [],
            savedForLater: [],
            currency: CURRENCIES[0],
            isMiniCartOpen: false,
            quickViewProduct: null,
            user: null,
            orders: [],

            setCurrency: (currency) => set({ currency }),

            formatPrice: (amount: number) => {
                const { currency } = get();
                const converted = amount * currency.rate;
                const fractionDigits = currency.code === 'JPY' ? 0 : 2;

                return new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: currency.code,
                    minimumFractionDigits: fractionDigits,
                    maximumFractionDigits: fractionDigits,
                }).format(converted);
            },

            setIsMiniCartOpen: (open) => set({ isMiniCartOpen: open }),

            addToCart: (product, quantity = 1, color) => {
                set((state) => {
                    const existing = state.cart.find(
                        (item) => item.id === product.id && item.selectedColor === color
                    );

                    if (existing) {
                        return {
                            cart: state.cart.map((item) =>
                                item.id === product.id && item.selectedColor === color
                                    ? { ...item, quantity: item.quantity + quantity }
                                    : item
                            ),
                            isMiniCartOpen: true,
                        };
                    }

                    return {
                        cart: [...state.cart, { ...product, quantity, selectedColor: color }],
                        isMiniCartOpen: true,
                    };
                });
            },

            removeFromCart: (productId, color) => {
                set((state) => ({
                    cart: state.cart.filter(
                        (item) => !(item.id === productId && item.selectedColor === color)
                    ),
                }));
            },

            updateQuantity: (productId, quantity, color) => {
                if (quantity < 1) {
                    get().removeFromCart(productId, color);
                    return;
                }
                set((state) => ({
                    cart: state.cart.map((item) =>
                        item.id === productId && item.selectedColor === color
                            ? { ...item, quantity }
                            : item
                    ),
                }));
            },

            toggleWishlist: (product) => {
                set((state) => {
                    const exists = state.wishlist.find((item) => item.id === product.id);
                    if (exists) {
                        return {
                            wishlist: state.wishlist.filter((item) => item.id !== product.id),
                        };
                    }
                    return {
                        wishlist: [...state.wishlist, product],
                    };
                });
            },

            isInWishlist: (productId) => {
                return get().wishlist.some((item) => item.id === productId);
            },

            moveToSaved: (item) => {
                get().removeFromCart(item.id, item.selectedColor);
                set((state) => ({
                    savedForLater: [...state.savedForLater, item],
                }));
            },

            moveToCart: (item) => {
                get().removeFromSaved(item.id, item.selectedColor);
                get().addToCart(item, item.quantity, item.selectedColor);
            },

            removeFromSaved: (productId, color) => {
                set((state) => ({
                    savedForLater: state.savedForLater.filter(
                        (item) => !(item.id === productId && item.selectedColor === color)
                    ),
                }));
            },

            clearCart: () => set({ cart: [] }),

            setQuickViewProduct: (product) => set({ quickViewProduct: product }),

            getCartTotal: () => {
                const { cart } = get();
                return cart.reduce((total, item) => total + item.price * item.quantity, 0);
            },

            login: (email, role) => {
                set({
                    user: {
                        id: email, // Mock ID
                        name: email.split('@')[0],
                        email,
                        avatar: `https://i.pravatar.cc/150?u=${email}`,
                        addresses: [],
                        payments: [],
                        role: (role as any) || 'USER'
                    }
                });
            },

            logout: () => set({ user: null }),

            reorder: (orderId: string) => {
                // Logic to reorder
                console.log("Reordering", orderId);
            },
        }),
        {
            name: 'ajstore-cart',
            partialize: (state) => ({
                cart: state.cart,
                wishlist: state.wishlist,
                savedForLater: state.savedForLater,
                currency: state.currency,
            }),
        }
    )
);
