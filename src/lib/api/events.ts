import { supabase } from '../supabase';
import type { Event } from '../supabase';

/**
 * Fetch upcoming events (date >= today)
 * Ordered by date ascending
 */
export async function getUpcomingEvents(): Promise<Event[]> {
    const today = new Date().toISOString();

    const { data, error } = await supabase
        .from('events')
        .select('*')
        .gte('date', today)
        .order('date', { ascending: true });

    if (error) {
        console.error('Error fetching upcoming events:', error);
        return [];
    }

    return data || [];
}

/**
 * Fetch past events (date < today)
 * Ordered by date descending, limited to 10 most recent
 */
export async function getPastEvents(limit: number = 10): Promise<Event[]> {
    const today = new Date().toISOString();

    const { data, error } = await supabase
        .from('events')
        .select('*')
        .lt('date', today)
        .order('date', { ascending: false })
        .limit(limit);

    if (error) {
        console.error('Error fetching past events:', error);
        return [];
    }

    return data || [];
}

/**
 * Fetch featured events
 */
export async function getFeaturedEvents(): Promise<Event[]> {
    const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('is_featured', true)
        .order('date', { ascending: false });

    if (error) {
        console.error('Error fetching featured events:', error);
        return [];
    }

    return data || [];
}
