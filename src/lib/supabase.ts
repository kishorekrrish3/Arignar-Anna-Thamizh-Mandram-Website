import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Event = {
  id: string;
  title: string;
  description: string | null;
  date: string;
  location: string | null;
  image_url: string | null;
  category: string | null;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  position_order: number | null;
  image_url: string | null;
  bio: string | null;
  email: string | null;
  linkedin_url: string | null;
  is_office_bearer: boolean;
  is_faculty: boolean;
  created_at: string;
  updated_at: string;
};

export type Achievement = {
  id: string;
  title: string;
  description: string | null;
  year: number;
  category: string | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
};

export type GalleryImage = {
  id: string;
  title: string | null;
  description: string | null;
  image_url: string;
  event_id: string | null;
  category: string | null;
  display_order: number | null;
  created_at: string;
};

export type Registration = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  reason: string;
  message: string | null;
  registration_date: string;
};

export type KanaiyazhiEdition = {
  id: string;
  edition_number: number;
  title: string;
  subtitle: string | null;
  description: string | null;
  year: number;
  month: string | null;
  cover_image_url: string;
  pdf_url: string;
  page_count: number | null;
  is_featured: boolean;
  display_order: number | null;
  created_at: string;
  updated_at: string;
};
