import { SupabaseClient } from "@supabase/supabase-js"

// src/lib/types/database.ts
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          updated_at: string | null
          username: string | null
          full_name: string | null
          avatar_url: string | null
          website: string | null
        }
        Insert: {
          id: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
        }
        Update: {
          id?: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
        }
      }
      // Add other tables here...
    }
    Views: {
      // Add views here if you have any
    }
    Functions: {
      // Add custom functions here if you have any
    }
    Enums: {
      // Add custom enums here if you have any
    }
  }
}


// Helper types
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]

// Example usage:
export type Profile = Tables<'profiles'>
export type UpdateProfile = Database['public']['Tables']['profiles']['Update']
export type InsertProfile = Database['public']['Tables']['profiles']['Insert']


// Type for the Supabase client
export type TypedSupabaseClient = SupabaseClient<Database>