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

  })

   if (rateLimitResult) return rateLimitResult
  
  return withAuth(request, async (userId) => {
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json({ data: userId });
  });
}

export async function PUT(request: NextRequest) {
  return withAuth(request, async () => {
    try {
      const body = await request.json();
      const validatedData = profileSchema.parse(body);

      const supabase = await createServerSupabaseClient();
      const { error } = await supabase.auth.updateUser({
        data: {
          ...validatedData,
        },
      });

      if (error) throw error;

      return NextResponse.json({ message: "Profile updated successfully" });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Failed to update profile" },
        { status: 500 }
      );
    }
  });
}
