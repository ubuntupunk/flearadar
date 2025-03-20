


npm install supabase --save-dev

npx supabase gen types typescript --project-id your-project-id > src/lib/types/database.ts

// src/lib/types/database.ts
// ... generated types above

// Helper types
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]

// Example usage:
export type Profile = Tables<'profiles'>
export type UpdateProfile = Database['public']['Tables']['profiles']['Update']
export type InsertProfile = Database['public']['Tables']['profiles']['Insert']

// Type for the Supabase client
export type TypedSupabaseClient = SupabaseClient<Database>

Then update your client.ts to use these types:

// src/lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'
import type { Database, TypedSupabaseClient } from '../types/database'
// ... other imports

export function createClientSupabaseClient(): TypedSupabaseClient {
  const supabase = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  
  // ... rest of the implementation
  
  return supabase
}

After generating the types, you can create helper types for common operations:

// src/lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'
import type { Database, TypedSupabaseClient } from '../types/database'
// ... other imports

export function createClientSupabaseClient(): TypedSupabaseClient {
  const supabase = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  
  // ... rest of the implementation
  
  return supabase
}

Would you like me to:

Show how to generate types for your specific database schema?

Add more helper types for common operations?

Show how to use these types effectively in your queries?