// app/(auth-pages)/onboarding/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { ProfileSelectionForm } from '@/components/auth/ProfileSelect';
import { Loader } from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        
        if (authError) throw authError;
        
        if (!user) {
          router.push('/(auth-pages)/login');
          return;
        }

        const { data: profile, error: profileError } = await supabase
          .from('users')
          .select('user_type, onboarding_completed')
          .eq('id', user.id)
          .single();

        if (profileError) throw profileError;

        // If user type is already set, redirect to appropriate dashboard
        if (profile?.user_type) {
          router.push(`/${profile.user_type}-dash`);
          return;
        }

        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setIsLoading(false);
      }
    };

    checkUserStatus();
  }, [router, supabase]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
          {error}
        </div>
      </div>
    );
  }

  return <ProfileSelectionForm />;
}
