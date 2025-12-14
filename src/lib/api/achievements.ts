import { supabase } from '../supabase';
import type { Achievement } from '../supabase';

/**
 * Fetch all achievements ordered by year descending
 */
export async function getAchievements(): Promise<Achievement[]> {
    const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .order('year', { ascending: false });

    if (error) {
        console.error('Error fetching achievements:', error);
        return [];
    }

    return data || [];
}

/**
 * Fetch achievements by category
 */
export async function getAchievementsByCategory(category: string): Promise<Achievement[]> {
    const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .eq('category', category)
        .order('year', { ascending: false });

    if (error) {
        console.error('Error fetching achievements by category:', error);
        return [];
    }

    return data || [];
}
