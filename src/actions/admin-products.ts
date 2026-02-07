'use server';

import { supabaseAdmin } from "@/lib/supabase";
import { requireAdmin } from "@/lib/auth-utils";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const productSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
    price: z.coerce.number().min(0, "Price must be positive"),
    oldPrice: z.coerce.number().optional().nullable(),
    stock: z.coerce.number().int().min(0),
    category: z.string().min(1, "Category is required"),
    image: z.string().url("Valid image URL required"),
    features: z.string().optional(),
    colors: z.string().optional(),
    type: z.enum(['SIMPLE', 'VARIABLE']).default('SIMPLE'),
    variations: z.string().optional() // JSON string
});

export async function createProduct(formData: FormData) {
    await requireAdmin();

    const raw = {
        name: formData.get('name'),
        description: formData.get('description'),
        price: formData.get('price'),
        oldPrice: formData.get('oldPrice'),
        stock: formData.get('stock'),
        category: formData.get('category'),
        image: formData.get('image'),
        features: formData.get('features'),
        colors: formData.get('colors'),
        type: formData.get('type') || 'SIMPLE',
        variations: formData.get('variations')
    };

    const validated = productSchema.safeParse(raw);

    if (!validated.success) {
        return { error: validated.error.flatten().fieldErrors };
    }

    const { data } = validated;
    const featuresArray = data.features ? data.features.split(',').map(s => s.trim()).filter(Boolean) : [];
    const colorsArray = data.colors ? data.colors.split(',').map(s => s.trim()).filter(Boolean) : [];

    let categoryId = null;
    const { data: cat } = await supabaseAdmin.from('categories').select('id').eq('name', data.category).single();
    if (cat) {
        categoryId = cat.id;
    } else {
        const { data: newCat } = await supabaseAdmin.from('categories').insert({
            name: data.category,
            slug: data.category.toLowerCase().replace(/ /g, '-')
        }).select().single();
        if (newCat) categoryId = newCat.id;
    }

    // 1. Insert Product
    const { data: product, error: prodError } = await supabaseAdmin.from('products').insert({
        name: data.name,
        description: data.description,
        price: data.price,
        old_price: data.oldPrice || null,
        stock: data.type === 'VARIABLE' ? 0 : data.stock,
        image: data.image,
        category_name: data.category,
        category_id: categoryId,
        features: featuresArray,
        colors: colorsArray,
        type: data.type,
        rating: 0,
        reviews_count: 0
    }).select().single();

    if (prodError) {
        console.error("Create Product Error", prodError);
        return { error: "Failed to create product" };
    }

    // 2. Insert Variations if any
    if (data.type === 'VARIABLE' && data.variations) {
        try {
            const variations = JSON.parse(data.variations);
            if (variations.length > 0) {
                const variationsToInsert = variations.map((v: any) => ({
                    product_id: product.id,
                    sku: v.sku,
                    price: v.price,
                    stock: v.stock,
                    attributes: v.attributes,
                    image: v.image || data.image
                }));

                const { error: varError } = await supabaseAdmin.from('product_variations').insert(variationsToInsert);
                if (varError) throw varError;

                // Sync total stock
                const totalStock = variations.reduce((acc: number, v: any) => acc + (v.stock || 0), 0);
                await supabaseAdmin.from('products').update({ stock: totalStock }).eq('id', product.id);
            }
        } catch (e) {
            console.error("Variations Parsing/Insert Error", e);
        }
    }

    revalidatePath('/admin/products');
    revalidatePath('/shop');
    return { success: true };
}

export async function updateProduct(id: string, formData: FormData) {
    await requireAdmin();

    const raw = {
        name: formData.get('name'),
        description: formData.get('description'),
        price: formData.get('price'),
        oldPrice: formData.get('oldPrice'),
        stock: formData.get('stock'),
        category: formData.get('category'),
        image: formData.get('image'),
        features: formData.get('features'),
        colors: formData.get('colors'),
        type: formData.get('type') || 'SIMPLE',
        variations: formData.get('variations')
    };

    const validated = productSchema.safeParse(raw);
    if (!validated.success) return { error: validated.error.flatten().fieldErrors };

    const { data } = validated;
    const featuresArray = data.features ? data.features.split(',').map(s => s.trim()).filter(Boolean) : [];
    const colorsArray = data.colors ? data.colors.split(',').map(s => s.trim()).filter(Boolean) : [];

    // Update product
    const { error: prodError } = await supabaseAdmin.from('products').update({
        name: data.name,
        description: data.description,
        price: data.price,
        old_price: data.oldPrice || null,
        stock: data.type === 'VARIABLE' ? 0 : data.stock,
        image: data.image,
        category_name: data.category,
        features: featuresArray,
        colors: colorsArray,
        type: data.type,
    }).eq('id', id);

    if (prodError) return { error: "Update failed" };

    // Update Variations
    if (data.type === 'VARIABLE' && data.variations) {
        try {
            const variations = JSON.parse(data.variations);
            // Simple approach: delete existing and re-insert for MVP
            await supabaseAdmin.from('product_variations').delete().eq('product_id', id);

            if (variations.length > 0) {
                const variationsToInsert = variations.map((v: any) => ({
                    product_id: id,
                    sku: v.sku,
                    price: v.price,
                    stock: v.stock,
                    attributes: v.attributes,
                    image: v.image || data.image
                }));
                const { error: varError } = await supabaseAdmin.from('product_variations').insert(variationsToInsert);
                if (varError) throw varError;

                const totalStock = variations.reduce((acc: number, v: any) => acc + (v.stock || 0), 0);
                await supabaseAdmin.from('products').update({ stock: totalStock }).eq('id', id);
            }
        } catch (e) {
            console.error("Variations Update Error", e);
        }
    }

    revalidatePath('/admin/products');
    revalidatePath(`/product/${id}`);
    return { success: true };
}

export async function deleteProduct(id: string) {
    await requireAdmin();
    const { error } = await supabaseAdmin.from('products').delete().eq('id', id);
    if (error) return { error: "Failed to delete" };
    revalidatePath('/admin/products');
    return { success: true };
}

