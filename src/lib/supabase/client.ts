// src/lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'
import { Database } from './types'

export function createClientSupabaseClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}
