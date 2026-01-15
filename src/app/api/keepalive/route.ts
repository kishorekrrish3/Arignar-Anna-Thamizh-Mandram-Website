import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        if (!supabaseUrl || !supabaseServiceKey) {
            return NextResponse.json(
                { error: 'Supabase configuration is missing environment variables' },
                { status: 500 }
            );
        }

        const supabase = createClient(supabaseUrl, supabaseServiceKey);

        // Perform a simple query to keep the database connection active
        // We use a small query on any existing table, or just a generic health check
        const { data, error } = await supabase
            .from('events') // Using 'events' table which we know exists from other routes
            .select('id')
            .limit(1);

        if (error) {
            console.error('Keepalive query error:', error);
            return NextResponse.json({ success: false, error: error.message }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            message: 'Database keepalive successful',
            timestamp: new Date().toISOString(),
            data: data
        });
    } catch (err) {
        console.error('Keepalive route error:', err);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}
