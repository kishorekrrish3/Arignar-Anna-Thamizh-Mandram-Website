import { supabase } from '../supabase';
import type { GalleryImage } from '../supabase';

/**
 * Fetch gallery images that should be shown in the main Gallery section
 * Filters by show_in_gallery = true
 * Ordered by display_order (if set), then by created_at descending
 */
export async function getGalleryImages(): Promise<GalleryImage[]> {
    const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .eq('show_in_gallery', true)
        .order('display_order', { ascending: true, nullsFirst: false })
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching gallery images:', error);
        return [];
    }

    return data || [];
}

/**
 * Fetch gallery images by category
 */
export async function getGalleryImagesByCategory(category: string): Promise<GalleryImage[]> {
    const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .eq('category', category)
        .order('display_order', { ascending: true, nullsFirst: false })
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching gallery images by category:', error);
        return [];
    }

    return data || [];
}

/**
 * Fetch gallery images by event ID
 */
export async function getGalleryImagesByEvent(eventId: string): Promise<GalleryImage[]> {
    const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .eq('event_id', eventId)
        .order('display_order', { ascending: true, nullsFirst: false })
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching gallery images by event:', error);
        return [];
    }

    return data || [];
}

/**
 * Fetch gallery images for Pongal celebration
 */
export async function getPongalGalleryImages(): Promise<GalleryImage[]> {
    const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .eq('pongal_images', true)
        .order('display_order', { ascending: true, nullsFirst: false })
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching pongal gallery images:', error);
        return [];
    }

    return data || [];
}
