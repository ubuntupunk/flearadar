// src/app/api/auth/register/route.ts
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { registerSchema } from "@/lib/validations/auth"
import { NextResponse } from "next/server"
import { type NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = registerSchema.parse(body)

    const supabase = await createServerSupabaseClient()
    const { data, error } = await supabase.auth.signUp({
      email: validatedData.email,
      password: validatedData.password,
      options: {
        emailRedirectTo: `${request.nextUrl.origin}/auth/callback`,
      },
    })

    if (error) throw error

    // Create user profile in profiles table
    const supabaseServerClient = await createServerSupabaseClient();
    const { error: profileCreationError } = await supabaseServerClient
      .from('profiles')
      .insert({
        id: data.user?.id, // Use the newly created user's ID
        email: validatedData.email,
        profile_type: null, // Set initial profile_type to null
      });

    if (profileCreationError) {
      console.error("Profile creation error:", profileCreationError);
      // Consider whether to throw an error or handle it differently
      // For now, let's log and continue to redirection
    }


    return NextResponse.redirect(`${request.nextUrl.origin}/auth/profile-selection`);
  } catch (error) {
    console.error("Registration error:", error); // More specific error logging
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to register" },
      { status: 400 }
    );
  }
}
