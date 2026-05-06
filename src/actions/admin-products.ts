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
    tags: z.string().optional(),
    type: z.enum(['SIMPLE', 'VARIABLE']).default('SIMPLE'),
    sku: z.string().optional(),
    meta_title: z.string().optional(),
    meta_description: z.string().optional(),
    slug: z.string().optional(),
    supplier_id: z.string().optional().nullable(),
    supplier_price: z.coerce.number().optional().nullable(),
    supplier_link: z.string().optional().nullable(),
    shipping_cost: z.coerce.number().optional().nullable(),
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
        tags: formData.get('tags'),
        type: formData.get('type') || 'SIMPLE',
        sku: formData.get('sku'),
        meta_title: formData.get('meta_title'),
        meta_description: formData.get('meta_description'),
        slug: formData.get('slug'),
        supplier_price: formData.get('supplier_price'),
        supplier_link: formData.get('supplier_link'),
        shipping_cost: formData.get('shipping_cost'),
        variations: formData.get('variations')
    };

    const validated = productSchema.safeParse(raw);

    if (!validated.success) {
        return { error: validated.error.flatten().fieldErrors };
    }

    const { data } = validated;
    const featuresArray = data.features ? data.features.split(',').map(s => s.trim()).filter(Boolean) : [];
    const colorsArray = data.colors ? data.colors.split(',').map(s => s.trim()).filter(Boolean) : [];
    const tagsArray = data.tags ? data.tags.split(',').map(s => s.trim()).filter(Boolean) : [];

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
        tags: tagsArray,
        type: data.type,
        sku: data.sku,
        meta_title: data.meta_title,
        meta_description: data.meta_description,
        slug: data.slug || data.name.toLowerCase().replace(/ /g, '-'),
        supplier_price: data.supplier_price || 0,
        supplier_link: data.supplier_link || null,
        supplier_id: data.supplier_id || null,
        shipping_cost: data.shipping_cost || 0,
        rating: 0,
        reviews_count: 0
    }).select().single();

    if (prodError) return { error: "Failed to create product." };

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
                await supabaseAdmin.from('product_variations').insert(variationsToInsert);
                const totalStock = variations.reduce((acc: number, v: any) => acc + (v.stock || 0), 0);
                await supabaseAdmin.from('products').update({ stock: totalStock }).eq('id', product.id);
            }
        } catch (e) { console.error(e); }
    }

    revalidatePath('/admin/products');
    revalidatePath('/shop');
    return { success: true };
}

export async function bulkUploadProducts(csvContent: string) {
    await requireAdmin();
    // Simple CSV parser for demo purposes
    const lines = csvContent.split('\n').filter(Boolean);
    const headers = lines[0].split(',').map(h => h.trim());
    const products = lines.slice(1).map(line => {
        const values = line.split(',').map(v => v.trim());
        const prod: any = {};
        headers.forEach((header, i) => prod[header] = values[i]);
        return prod;
    });

    for (const p of products) {
        const formData = new FormData();
        formData.append('name', p.name);
        formData.append('price', p.price);
        formData.append('stock', p.stock || '0');
        formData.append('category', p.category || 'Uncategorized');
        formData.append('image', p.image || 'https://images.unsplash.com/photo-1560343090-f0409e92791a?q=80&w=400&auto=format&fit=crop');
        formData.append('description', p.description || '');
        await createProduct(formData);
    }

    revalidatePath('/admin/products');
    return { success: true, count: products.length };
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
        tags: formData.get('tags'),
        type: formData.get('type') || 'SIMPLE',
        sku: formData.get('sku'),
        meta_title: formData.get('meta_title'),
        meta_description: formData.get('meta_description'),
        slug: formData.get('slug'),
        supplier_price: formData.get('supplier_price'),
        supplier_link: formData.get('supplier_link'),
        shipping_cost: formData.get('shipping_cost'),
        variations: formData.get('variations')
    };

    const validated = productSchema.safeParse(raw);
    if (!validated.success) return { error: validated.error.flatten().fieldErrors };

    const { data } = validated;
    const featuresArray = data.features ? data.features.split(',').map(s => s.trim()).filter(Boolean) : [];
    const colorsArray = data.colors ? data.colors.split(',').map(s => s.trim()).filter(Boolean) : [];
    const tagsArray = data.tags ? data.tags.split(',').map(s => s.trim()).filter(Boolean) : [];

    await supabaseAdmin.from('products').update({
        name: data.name,
        description: data.description,
        price: data.price,
        old_price: data.oldPrice || null,
        stock: data.type === 'VARIABLE' ? 0 : data.stock,
        image: data.image,
        category_name: data.category,
        features: featuresArray,
        colors: colorsArray,
        tags: tagsArray,
        type: data.type,
        sku: data.sku,
        meta_title: data.meta_title,
        meta_description: data.meta_description,
        slug: data.slug,
        supplier_price: data.supplier_price || 0,
        supplier_link: data.supplier_link || null,
        supplier_id: data.supplier_id || null,
        shipping_cost: data.shipping_cost || 0,
    }).eq('id', id);

    if (data.type === 'VARIABLE' && data.variations) {
        try {
            const variations = JSON.parse(data.variations);
            await supabaseAdmin.from('product_variations').delete().eq('product_id', id);
            if (variations.length > 0) {
                const variationsToInsert = variations.map((v: any) => ({
                    product_id: id,
                    sku: v.sku, price: v.price, stock: v.stock, attributes: v.attributes, image: v.image || data.image
                }));
                await supabaseAdmin.from('product_variations').insert(variationsToInsert);
                const totalStock = variations.reduce((acc: number, v: any) => acc + (v.stock || 0), 0);
                await supabaseAdmin.from('products').update({ stock: totalStock }).eq('id', id);
            }
        } catch (e) { console.error(e); }
    }

    revalidatePath('/admin/products');
    revalidatePath(`/product/${id}`);
    revalidatePath('/shop');
    return { success: true };
}

export async function deleteProduct(id: string) {
    await requireAdmin();
    const { error } = await supabaseAdmin.from('products').delete().eq('id', id);
    if (error) return { error: "Failed to delete" };
    revalidatePath('/admin/products');
    return { success: true };
}
