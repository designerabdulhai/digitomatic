import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://aggwicvrtqgpsqadrmtk.supabase.co';
const supabaseKey = 'sb_publishable_Kz4LmfVEV9S3E6PIDmcpDQ_sx7DXEzJ';

export const supabase = createClient(supabaseUrl, supabaseKey);

export type Service = {
  id: string | number;
  title: string;
  icon: string;
  description: string;
  sort_order: number;
};

export type Portfolio = {
  id: string | number;
  title: string;
  emoji: string;
  category: string;
  description: string;
  url: string;
  video_url?: string;
  sort_order: number;
};

export type Pricing = {
  id: string | number;
  name: string;
  price: number;
  period: string;
  features: string[];
  featured: boolean;
  sort_order: number;
};

export type Message = {
  id: string | number;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  created_at: string;
};

export type SiteSettings = {
  id: number;
  site_name: string;
  logo_url: string;
  contact_email: string;
  contact_phone: string;
  contact_address: string;
  facebook_url?: string;
  instagram_url?: string;
  linkedin_url?: string;
  hero_video_url?: string;
};

export type ClientLogo = {
  id: string | number;
  name: string;
  logo_url: string;
  sort_order: number;
};

export type Testimonial = {
  id: string | number;
  client_name: string;
  client_role: string;
  content: string;
  rating: number;
  avatar_url?: string;
  sort_order: number;
};
