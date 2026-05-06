'use server';

import { supabaseAdmin } from "@/lib/supabase";
import { requireAdmin } from "@/lib/auth-utils";

export async function uploadImage(fileDataUrl: string, path: string) {
    try {
        await requireAdmin();

        // Convert base64 data URL to Buffer
        const base64Data = fileDataUrl.split(',')[1];
        if (!base64Data) throw new Error('Invalid file data URL');
        
        const buffer = Buffer.from(base64Data, 'base64');
        
        // Extract content type
        const matches = fileDataUrl.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,/);
        const contentType = matches ? matches[1] : 'application/octet-stream';

        // Assuming a public bucket named "assets"
        const { data, error } = await supabaseAdmin.storage
            .from('assets')
            .upload(path, buffer, {
                contentType,
                upsert: true
            });

        if (error) {
            console.error('Supabase upload error:', error);
            return { error: 'Failed to upload image' };
        }

        const { data: { publicUrl } } = supabaseAdmin.storage
            .from('assets')
            .getPublicUrl(path);

        return { url: publicUrl };
    } catch (e: any) {
        console.error('Upload Error:', e);
        return { error: e.message || 'Error uploading file' };
    }
}
