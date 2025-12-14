import { supabase } from '../supabase';
import type { Registration } from '../supabase';

export type RegistrationInput = {
    name: string;
    email: string;
    phone?: string | null;
    reason: string;
    message?: string | null;
};

/**
 * Create a new registration in the database
 */
export async function createRegistration(data: RegistrationInput): Promise<{ success: boolean; error?: string }> {
    // Validate required fields
    if (!data.name || !data.email || !data.reason) {
        return {
            success: false,
            error: 'Name, email, and reason are required fields',
        };
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        return {
            success: false,
            error: 'Invalid email format',
        };
    }

    const { error } = await supabase
        .from('registrations')
        .insert([
            {
                name: data.name,
                email: data.email,
                phone: data.phone || null,
                reason: data.reason,
                message: data.message || null,
            },
        ]);

    if (error) {
        console.error('Error creating registration:', error);
        return {
            success: false,
            error: 'Failed to submit registration. Please try again.',
        };
    }

    return { success: true };
}
