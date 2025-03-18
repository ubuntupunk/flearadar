// src/app/api/profile/last-seen/route.ts
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { Database } from "@/lib/types/database";

export async function POST() {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { error } = await supabase
      .from('profiles')
      .update({ 
        last_seen_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', session.user.id);
      
    if (error) {
       console.error("Error updating last seen:", error);
       return new NextResponse("Failed to update last seen", { status: 500 }); 
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating last seen:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// Add OPTIONS method to handle preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
}