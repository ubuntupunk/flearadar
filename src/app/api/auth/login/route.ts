// src/app/api/auth/login/route.ts
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { loginSchema } from "@/lib/validations/auth"
import { NextResponse } from "next/server"
import { type NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  console.log('Login route called');
  try {
    const body = await request.json();
    const validatedData = loginSchema.parse(body);

    const supabase = await createServerSupabaseClient();
    console.log('Attempting supabase sign in with password');
    const { data, error } = await supabase.auth.signInWithPassword({
      email: validatedData.email,
      password: validatedData.password,
    });

    if (error) {
      console.error('Supabase sign in error:', error);
      throw error;
    }
    console.log('Supabase sign in successful', data);

    // Check if user has user_type
    console.log('Checking for user_type');
    const { data: userWithProfile, error: userProfileError } = await supabase
      .from('users')
      .select('user_type')
      .eq('id', data.user?.id)
      .single();

    if (userProfileError) {
      console.error('Error fetching user profile:', userProfileError);
      // Handle error appropriately, maybe return an error response
    }

    if (!userWithProfile?.user_type) {
      // Redirect to onboarding if user_type is missing
      const redirectUrl = `/onboarding?callbackUrl=${request.nextUrl.pathname}`;
      return NextResponse.redirect(redirectUrl)
    }

    // Redirect to appropriate dashboard based on user_type
    const userType = userWithProfile.user_type;
    let redirectPath = '';

    switch (userType) {
      case 'user':
        redirectPath = '/user-dash';
        break;
      case 'vendor':
        redirectPath = '/vendor-dash';
        break;
      case 'market':
        redirectPath = '/market-dash';
        break;
      default:
        redirectPath = '/user-dash'; // Default to user-dash if user_type is unexpected
        console.warn(`Unexpected user_type: ${userType}, redirecting to user-dash`);
    }

    return NextResponse.redirect(redirectPath);
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to login" },
      { status: 400 }
    )
  }
}
