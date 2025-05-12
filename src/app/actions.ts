'use server';

import fs from 'fs';
import path from 'path';
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function getArticleContent(slug: string): Promise<string> {
  try {
    const filePath = path.join(process.cwd(), `src/articles/${slug}.md`);
    const content = fs.readFileSync(filePath, 'utf8');
    return content;
  } catch (error) {
    console.error(`Error fetching content for ${slug}:`, error);
    return 'Error loading content.';
  }
}

export async function logout() {
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  redirect("/");
}
