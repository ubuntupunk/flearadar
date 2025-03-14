// src/app/api/auth/login/route.ts
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { loginSchema } from "@/lib/validations/auth"
import { NextResponse } from "next/server"
import { type NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = loginSchema.parse(body)

    const supabase = await createServerSupabaseClient()
    const { data, error } = await supabase.auth.signInWithPassword({
      email: validatedData.email,
      password: validatedData.password,
    })

    if (error) throw error

    const userId = data?.user?.id;
    console.log("User ID after login:", userId); // Log user ID

    // Check if profile type is set, redirect to profile selection if not
    const supabaseServerClient = await createServerSupabaseClient();
    const { data: profileData, error: profileError } = await supabaseServerClient
      .from('profiles')
      .select('profile_type')
      .eq('id', userId) // Use userId here
      .single();

    console.log("Profile data:", profileData, "Profile error:", profileError); // Log profile data and error

    if (profileError) {
      console.error("Error fetching profile:", profileError);
      // Handle error appropriately, maybe still redirect to dashboard or show an error
    }

    if (!profileData?.profile_type) {
      console.log("Redirecting to profile selection"); // Log redirection status
      return NextResponse.redirect(`${request.nextUrl.origin}/auth/profile-selection`);
    }


    return NextResponse.json({ data })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to login" },
      { status: 400 }
    )
  }
}
