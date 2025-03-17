// src/app/api/auth/register/route.ts
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { registerSchema } from "@/lib/validations/auth"
import { NextResponse } from "next/server"
import { type NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  console.log('Register route called');
  try {
    const body = await request.json();
    const validatedData = registerSchema.parse(body);

    const supabase = await createServerSupabaseClient();
    console.log('Attempting supabase signup');
    const { data, error } = await supabase.auth.signUp({
      email: validatedData.email,
      password: validatedData.password,
      options: {
        emailRedirectTo: `${request.nextUrl.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error('Supabase signup error:', error);
      throw error;
    }
    console.log('Supabase signup successful', data);


    // Get user_type from cookies
    const userType = request.cookies.get('user_type')?.value;

    if (userType) {
      // Update user table with user_type
      const { error: userUpdateError } = await supabase
        .from('users')
        .update({ user_type: userType })
        .eq('id', data.user?.id); // Assuming 'data.user?.id' contains the newly registered user's ID

      if (userUpdateError) {
        console.error('Failed to update user_type in users table:', userUpdateError);
        // Consider how to handle this error - maybe log it and continue or return an error response
      }
    } else {
      console.warn('user_type cookie not found after registration');
      // Handle case where user_type is not found, maybe log a warning
    }


    return NextResponse.json({ data });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to register" },
      { status: 400 }
    );
  }
}
