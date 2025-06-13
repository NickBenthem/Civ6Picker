import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key length:', supabaseAnonKey?.length);

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Test the connection
supabase.from('leaders').select('count').then(
  ({ data, error }) => {
    if (error) {
      console.error('Supabase connection test failed:', error);
    } else {
      console.log('Supabase connection test successful:', data);
    }
  }
);

export type UniqueUnit = {
  id: string;
  civilization_id: string;
  name: string;
  image_key: string;
  created_at: string;
};

export type UniqueInfrastructure = {
  id: string;
  civilization_id: string;
  name: string;
  image_key: string;
  created_at: string;
};

export type Civilization = {
  id: string;
  name: string;
  image_key: string;
  created_at: string;
  unique_units?: UniqueUnit[];
  unique_infrastructure?: UniqueInfrastructure[];
};

export type Leader = {
  id: string;
  name: string;
  civilization_id: string;
  image_key: string;
  ability: string;
  is_banned: boolean;
  banned_by: string | null;
  banned_at: string | null;
  created_at: string;
  civilization?: Civilization;
};

export type Vote = {
  id: string;
  leader_id: string;
  user_id: string;
  vote_type: string;
  created_at: string;
};

export type Cursor = {
  user_id: string;
  x: number;
  y: number;
  user_name: string;
  color: string;
  updated_at: string;
};