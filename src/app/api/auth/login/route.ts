import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.redirect(new URL('/login', process.env.AUTH0_BASE_URL));
}
