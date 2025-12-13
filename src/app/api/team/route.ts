import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const officeBearers = searchParams.get('office_bearers');
  
  let query = supabase
    .from('team_members')
    .select('*')
    .order('position_order', { ascending: true });
  
  if (officeBearers === 'true') {
    query = query.eq('is_office_bearer', true);
  } else if (officeBearers === 'false') {
    query = query.eq('is_office_bearer', false);
  }
  
  const { data, error } = await query;
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();
  
  const { data, error } = await supabase
    .from('team_members')
    .insert(body)
    .select()
    .single();
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json(data);
}
