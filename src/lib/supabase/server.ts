// src/lib/supabase/server.ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Database } from "./types";

export async function createServerSupabaseClient() {
  const cookieStore = await cookies();

  const client = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          const allCookies = cookieStore.getAll();
          return allCookies;
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              // Handle null or undefined values
              if (value === null || value === undefined) {
                console.log(`Skipping null/undefined cookie value for ${name}`);
                return;
              }

              // Ensure proper serialization of objects
              const cookieValue = typeof value === 'object' 
                ? JSON.stringify(value)
                : String(value);

              try {
                cookieStore.set(name, cookieValue, {
                  ...options,
                  // Ensure proper cookie attributes
                  path: options?.path || '/',
                  secure: process.env.NODE_ENV === 'production',
                  sameSite: 'lax',
                });
              } catch (parseError) {
                console.error(`Failed to set cookie ${name}:`, parseError);
                // Continue with other cookies instead of throwing
              }
            });
          } catch (error) {
            console.error("Error in setAll cookies:", error);
            // You might want to throw here depending on your error handling strategy
            throw error;
          }
        },
      },
    }
  );

  return client;
}

// Helper function to handle profile fetching
export async function getUserProfile(supabase: ReturnType<typeof createServerSupabaseClient>) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return { user: null, profile: null };
    }

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No profile found
        console.log(`No profile found for user ${user.id}`);
        return { user, profile: null };
      }
      throw error;
    }

    return { user, profile };
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return { user: null, profile: null };
  }
}
