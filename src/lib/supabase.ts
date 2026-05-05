import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://aggwicvrtqgpsqadrmtk.supabase.co';
const supabaseKey = 'sb_publishable_Kz4LmfVEV9S3E6PIDmcpDQ_sx7DXEzJ';

export const supabase = createClient(supabaseUrl, supabaseKey);

export type Service = {
  id: number;
  title: string;
  icon: string;
  description: string;
  sort_order: number;
};

export type Portfolio = {
  id: number;
  title: string;
  emoji: string;
  category: string;
  description: string;
  url: string;
  sort_order: number;
};

export type Pricing = {
  id: number;
  name: string;
  price: number;
  period: string;
  features: string[];
  featured: boolean;
  sort_order: number;
};

export type Message = {
  id: number;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  created_at: string;
};
