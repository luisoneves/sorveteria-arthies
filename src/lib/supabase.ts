/**
 * @deprecated Use '@/lib/supabase/browser', '@/lib/supabase/server', or '@/lib/supabase/admin' instead
 * This file is kept for backward compatibility.
 */

import { createBrowserClient } from '@supabase/ssr';

export function createBrowserSupabaseClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

import { supabaseAdmin } from './supabase/admin';
export { supabaseAdmin };