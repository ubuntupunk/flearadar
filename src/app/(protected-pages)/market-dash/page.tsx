import { createServerSupabaseClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { MarketDash } from "@/components/dashboards/MarketDash";

export default async function MarketDashboard() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/auth');
  }

  const { data: profile } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();

  if (!profile || profile.user_type !== 'market') {
    redirect('/');
  }

  return <MarketDash user={user} profile={profile} />;
}
