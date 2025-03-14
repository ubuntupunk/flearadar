// src/app/api/profile/route.ts
import { withAuth } from "@/lib/api/with-auth";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { rateLimit } from "@/lib/utils/rate-limit";
import { profileSchema } from "@/lib/validations/profile";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  // Check rate limit first
  const rateLimitResult = await rateLimit(request, {
    maxRequests: 5,
    windowMs: 60000, // 1 minute
  });

  if (rateLimitResult) return rateLimitResult;

  return withAuth(request, async (userId) => {
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = await createServerSupabaseClient();
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Supabase error fetching profile:", error);
      return NextResponse.json(
        { error: "Failed to fetch profile", details: error.message },
        { status: 500 }
      );
    }

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    return NextResponse.json({ data: profile });
  });
}

export async function PUT(request: NextRequest) {
  return withAuth(request, async (userId) => {
    try {
      const body = await request.json();
      const validatedData = profileSchema.parse(body);

      const supabase = await createServerSupabaseClient();

      // Ensure website is not null if provided
      const updateData = validatedData.website ? { ...validatedData, website: validatedData.website || null } : validatedData;


      const { error } = await supabase
        .from("profiles")
        .upsert({
          id: userId, // Use userId for row identification
          ...updateData,
        })


      if (error) {
        console.error("Supabase error updating profile:", error);
        return NextResponse.json(
          { error: "Failed to update profile", details: error.message },
          { status: 500 }
        );
      }

      return NextResponse.json({ message: "Profile updated successfully" });
    } catch (error: any) {
      console.error("Validation error or other error updating profile:", error);
      return NextResponse.json(
        { error: "Failed to update profile", details: error.message },
        { status: 400 }
      );
    }
  });
}
