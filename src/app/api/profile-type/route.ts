import { createServerSupabaseClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const profileType = body.profileType;

    console.log("Profile type received:", profileType); // ADDED LOGGING

    if (!profileType) {
      return NextResponse.json({ error: "Profile type is required" }, { status: 400 });
    }

    const supabase = await createServerSupabaseClient();
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user_id = session.user.id;

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ profile_type: profileType })
      .eq("id", user_id);

    if (updateError) {
      throw updateError;
    }

    return NextResponse.json({ message: "Profile type updated successfully" });
  } catch (error) {
    console.error("Error updating profile type:", error);
    return NextResponse.json(
      { error: "Failed to update profile type" },
      { status: 500 }
    );
  }
}
