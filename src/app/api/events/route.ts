import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const featured = searchParams.get('featured');
  const category = searchParams.get('category');
  
  let query = supabase
    .from('events')
    .select('*')
    .order('date', { ascending: true });
  
  if (featured === 'true') {
    query = query.eq('is_featured', true);
  }
  
  if (category) {
    query = query.eq('category', category);
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
    .from('events')
    .insert(body)
    .select()
    .single();
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json(data);
}
