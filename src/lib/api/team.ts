import { supabase } from '../supabase';
import type { TeamMember } from '../supabase';

/**
 * Fetch office bearers (is_office_bearer = true)
 * Ordered by position_order ascending
 */
export async function getOfficeBearers(): Promise<TeamMember[]> {
    const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .eq('is_office_bearer', true)
        .order('position_order', { ascending: true, nullsFirst: false });

    if (error) {
        console.error('Error fetching office bearers:', error);
        return [];
    }

    return data || [];
}

/**
 * Fetch core committee members (is_office_bearer = false AND is_faculty = false)
 * Ordered by position_order ascending
 */
export async function getCoreCommittee(): Promise<TeamMember[]> {
    const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .eq('is_office_bearer', false)
        .eq('is_faculty', false)
        .order('position_order', { ascending: true, nullsFirst: false });

    if (error) {
        console.error('Error fetching core committee:', error);
        return [];
    }

    return data || [];
}

/**
 * Fetch faculty coordinators (is_faculty = true)
 * Ordered by position_order ascending
 */
export async function getFacultyCoordinators(): Promise<TeamMember[]> {
    const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .eq('is_faculty', true)
        .order('position_order', { ascending: true, nullsFirst: false });

    if (error) {
        console.error('Error fetching faculty coordinators:', error);
        return [];
    }

    return data || [];
}

/**
 * Fetch all team members
 */
export async function getAllTeamMembers(): Promise<TeamMember[]> {
    const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('position_order', { ascending: true, nullsFirst: false });

    if (error) {
        console.error('Error fetching all team members:', error);
        return [];
    }

    return data || [];
}

/**
 * Fetch office bearers by year (is_office_bearer = true)
 * Ordered by position_order ascending
 */
export async function getOfficeBearersByYear(year: number): Promise<TeamMember[]> {
    const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .eq('is_office_bearer', true)
        .eq('year', year)
        .order('position_order', { ascending: true, nullsFirst: false });

    if (error) {
        console.error(`Error fetching office bearers for year ${year}:`, error);
        return [];
    }

    return data || [];
}

/**
 * Fetch core committee members by year (is_office_bearer = false AND is_faculty = false)
 * Ordered by position_order ascending
 */
export async function getCoreCommitteeByYear(year: number): Promise<TeamMember[]> {
    const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .eq('is_office_bearer', false)
        .eq('is_faculty', false)
        .eq('year', year)
        .order('position_order', { ascending: true, nullsFirst: false });

    if (error) {
        console.error(`Error fetching core committee for year ${year}:`, error);
        return [];
    }

    return data || [];
}

/**
 * Fetch team by year (office bearers + core committee, excluding faculty)
 * Combined fetch for better performance
 */
export async function getTeamByYear(year: number): Promise<{ officeBearers: TeamMember[], coreCommittee: TeamMember[] }> {
    const [officeBearers, coreCommittee] = await Promise.all([
        getOfficeBearersByYear(year),
        getCoreCommitteeByYear(year)
    ]);

    return { officeBearers, coreCommittee };
}
