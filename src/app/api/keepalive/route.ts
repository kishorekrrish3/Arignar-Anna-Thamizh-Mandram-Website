import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const supabaseUrl =
            process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL

        const supabaseKey =
            process.env.SUPABASE_SERVICE_ROLE_KEY ||
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

        if (!supabaseUrl || !supabaseKey) {
            return NextResponse.json(
                { success: false, error: 'Missing Supabase env variables' },
                { status: 500 }
            )
        }

        const supabase = createClient(supabaseUrl, supabaseKey)

        // 🔥 WRITE operation (this keeps Supabase alive)
        const { error } = await supabase
            .from('keepalive')
            .upsert({
                id: 1,
                last_ping: new Date().toISOString()
            })

        if (error) {
            console.error('Keepalive upsert failed:', error.message)
            return NextResponse.json(
                { success: false, error: error.message },
                { status: 500 }
            )
        }

        return NextResponse.json({
            success: true,
            status: 'Supabase kept active',
            timestamp: new Date().toISOString()
        })
    } catch (err: any) {
        return NextResponse.json(
            { success: false, error: err.message },
            { status: 500 }
        )
    }
}
