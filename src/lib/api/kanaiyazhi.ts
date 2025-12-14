import { supabase } from '@/lib/supabase';
import type { KanaiyazhiEdition } from '@/lib/supabase';

/**
 * Fetch all Kanaiyazhi editions ordered by year and edition number (newest first)
 */
export async function getKanaiyazhiEditions(): Promise<KanaiyazhiEdition[]> {
    const { data, error } = await supabase
        .from('kanaiyazhi_editions')
        .select('*')
        .order('year', { ascending: false })
        .order('edition_number', { ascending: false });

    if (error) {
        console.error('Error fetching Kanaiyazhi editions:', error);
        return [];
    }

    return data || [];
}

/**
 * Fetch the featured/latest edition
 */
export async function getFeaturedEdition(): Promise<KanaiyazhiEdition | null> {
    const { data, error } = await supabase
        .from('kanaiyazhi_editions')
        .select('*')
        .eq('is_featured', true)
        .limit(1)
        .single();

    if (error) {
        console.error('Error fetching featured edition:', error);
        return null;
    }

    return data;
}

/**
 * Fetch editions by year
 */
export async function getEditionsByYear(year: number): Promise<KanaiyazhiEdition[]> {
    const { data, error } = await supabase
        .from('kanaiyazhi_editions')
        .select('*')
        .eq('year', year)
        .order('edition_number', { ascending: false });

    if (error) {
        console.error('Error fetching editions by year:', error);
        return [];
    }

    return data || [];
}
