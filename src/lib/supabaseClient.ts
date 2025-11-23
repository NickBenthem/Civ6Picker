import { createClient } from '@supabase/supabase-js';

// In a Next.js environment, NEXT_PUBLIC_* variables are replaced
// at build time, so these will be string literals in the bundle.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

if (!supabaseUrl || !supabaseAnonKey) {
  // In dev this will surface clearly in the console; in production
  // these should be configured as public env vars.
  // eslint-disable-next-line no-console
  console.error(
    'Supabase URL or anon key is not configured. Realtime features will be disabled.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});
