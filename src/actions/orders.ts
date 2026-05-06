'use server';

import { supabaseAdmin } from "@/lib/supabase";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function createOrder(orderData: {
    user_email: string;
    user_name: string;
    total: number;
    shipping_address: any;
    payment_info: any;
    items: any[];
}) {
    try {
        const session = await auth();
        const userId = session?.user?.id;

        // 1. Insert into orders table
        const { data: order, error: orderError } = await supabaseAdmin
            .from('orders')
            .insert({
                user_id: userId || null,
                user_email: orderData.user_email,
                user_name: orderData.user_name,
                total: orderData.total,
                shipping_address: orderData.shipping_address,
                payment_info: orderData.payment_info,
                status: 'Processing'
            })
            .select()
            .single();

        if (orderError) {
            console.error('Error creating order:', orderError);
            return { success: false, error: orderError.message };
        }

        // 2. Insert into order_items table
        const orderItems = orderData.items.map(item => {
            // Validate if item.id is a proper UUID
            const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(item.id);

            return {
                order_id: order.id,
                product_id: isUUID ? item.id : null,
                product_name: item.name,
                price: item.price,
                quantity: item.quantity,
                selected_color: item.selectedColor,
                product_image: item.image
            };
        });

        const { error: itemsError } = await supabaseAdmin
            .from('order_items')
            .insert(orderItems);

        if (itemsError) {
            console.error('Error creating order items:', itemsError);
            return { success: false, error: itemsError.message };
        }

        revalidatePath('/account');
        revalidatePath('/admin/orders');

        return { success: true, orderId: order.id };
    } catch (error: any) {
        console.error('Unexpected error creating order:', error);
        return { success: false, error: error.message };
    }
}

export async function getUserOrders() {
    try {
        const session = await auth();
        const userEmail = session?.user?.email;
        if (!userEmail) return [];

        // Fetch orders where user_email matches
        const { data: orders, error: ordersError } = await supabaseAdmin
            .from('orders')
            .select(`
                *,
                order_items (
                    *,
                    products (image)
                )
            `)
            .eq('user_email', userEmail)
            .order('created_at', { ascending: false });

        if (ordersError) {
            console.error('Error fetching orders:', ordersError);
            return [];
        }

        if (!orders) return [];

        // Map to our Order type
        return orders.map(order => ({
            id: order.id,
            user_id: order.user_id,
            user_name: order.user_name,
            user_email: order.user_email,
            total: Number(order.total),
            status: order.status,
            shipping_address: typeof order.shipping_address === 'string' ? order.shipping_address : JSON.stringify(order.shipping_address),
            tracking_number: order.tracking_number,
            courier: order.courier,
            shipped_at: order.shipped_at,
            delivered_at: order.delivered_at,
            created_at: order.created_at,
            updated_at: order.updated_at,
            items: (order.order_items || []).map((item: any) => {
                const productImage = item.product_image ||
                    item.products?.image ||
                    'https://images.unsplash.com/photo-152327533bc68-f29729c237f5?q=80&w=200&auto=format&fit=crop';

                return {
                    id: item.product_id,
                    name: item.product_name,
                    price: Number(item.price),
                    quantity: item.quantity,
                    selectedColor: item.selected_color,
                    image: productImage
                };
            })
        }));
    } catch (error) {
        console.error('Unexpected error fetching user orders:', error);
        return [];
    }
}


