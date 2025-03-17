// src/lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'
import { Database } from './types'

export function createClientSupabaseClient() {
  const supabase = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  // Add logging to inspect cookies on the client-side - CORRECTED PLACEMENT
  supabase.auth.getSession().then(({ data, error }) => {
    console.log("Client-side cookies (getSession):", document.cookie);
    if (data?.session?.access_token) {
      console.log("Access Token from session:", data.session.access_token);
    }
    if (error) {
      console.error("Error getting session on client-side:", error);
    }
  });

  console.log("Client-side cookies (document.cookie):", document.cookie); // Log document.cookie directly
  // END CORRECTED PLACEMENT


  return supabase;
}
