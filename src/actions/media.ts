'use server';

import { supabaseAdmin } from "@/lib/supabase";
import { requireAdmin } from "@/lib/auth-utils";
import { revalidatePath } from "next/cache";
import { Media } from "@/types";

export async function getMedia() {
    await requireAdmin();
    const { data, error } = await supabaseAdmin
        .from('media')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Fetch Media Error:", error);
        return [];
    }
    return data as Media[];
}

export async function uploadMedia(formData: FormData) {
    await requireAdmin();
    const files = formData.getAll('files') as File[];

    if (!files || files.length === 0) return { error: "No files provided" };

    const successfullyUploaded = [];
    const failures = [];

    for (const file of files) {
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
                .from('media')
                .upload(filePath, file);

            if (uploadError) {
                if (uploadError.message.includes('bucket not found')) {
                    throw new Error("Storage bucket 'media' not found. Please create it in your Supabase dashboard.");
                }
                throw uploadError;
            }

            const { data: { publicUrl } } = supabaseAdmin.storage
                .from('media')
                .getPublicUrl(filePath);

            let fileType: 'image' | 'video' | 'pdf' = 'image';
            if (file.type.startsWith('video/')) fileType = 'video';
            else if (file.type === 'application/pdf') fileType = 'pdf';

            const { data: mediaData, error: dbError } = await supabaseAdmin
                .from('media')
                .insert({
                    file_name: file.name,
                    file_url: publicUrl,
                    file_type: fileType,
                    file_size: file.size,
                    bucket: 'media'
                })
                .select()
                .single();

            if (dbError) throw dbError;
            successfullyUploaded.push(mediaData);
        } catch (error: any) {
            console.error(`Upload error for ${file.name}:`, error);
            failures.push({ fileName: file.name, error: error.message });
        }
    }

    revalidatePath('/admin/media');

    if (successfullyUploaded.length === 0 && failures.length > 0) {
        return { success: false, error: failures[0].error, failures };
    }

    return {
        success: true,
        data: successfullyUploaded,
        failures: failures.length > 0 ? failures : undefined
    };
}

export async function deleteMedia(ids: string[]) {
    await requireAdmin();

    for (const id of ids) {
        try {
            // 1. Get file details
            const { data: media, error: fetchError } = await supabaseAdmin
                .from('media')
                .select('*')
                .eq('id', id)
                .single();

            if (fetchError || !media) continue;

            // 1.5 Check if media is used by products (simplistic check for URL)
            const { count: usageCount } = await supabaseAdmin
                .from('products')
                .select('*', { count: 'exact', head: true })
                .or(`image.eq.${media.file_url},secondary_image.eq.${media.file_url}`);

            if (usageCount && usageCount > 0) {
                console.warn(`Media ${id} is in use by ${usageCount} products, skipping delete.`);
                continue;
            }

            // 2. Delete from Storage
            const fileName = media.file_url.split('/').pop();
            const { error: storageError } = await supabaseAdmin.storage
                .from('media')
                .remove([fileName]);

            if (storageError) console.error("Storage delete error:", storageError);

            // 3. Delete from DB
            const { error: dbError } = await supabaseAdmin
                .from('media')
                .delete()
                .eq('id', id);

            if (dbError) throw dbError;
        } catch (error) {
            console.error(`Delete error for media ${id}:`, error);
        }
    }

    revalidatePath('/admin/media');
    return { success: true };
}
