// src/app/(auth-pages)/profile-selection/page.tsx
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { useSupabase } from '@/lib/supabase/client';

const ProfileSelectionPage = () => {
  const router = useRouter();
  const { supabase } = useSupabase();

  const handleProfileSelection = async (userType: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      router.push('/(auth-pages)/login');
      return;
    }

    const { error } = await supabase
      .from('users')
      .update({ 
        user_type: userType,
        onboarding_completed: true 
      })
      .eq('id', user.id);

    if (!error) {
      router.push(`/${userType}-dash`);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-center">Choose your profile type</h1>
      <div className="flex flex-col space-y-4">
        <button
          onClick={() => handleProfileSelection('user')}
          className="btn-primary"
        >
          Simple User
        </button>
        <button
          onClick={() => handleProfileSelection('vendor')}
          className="btn-primary"
        >
          Vendor
        </button>
        <button
          onClick={() => handleProfileSelection('market')}
          className="btn-primary"
        >
          Market
        </button>
      </div>
    </div>
  );
};

export default ProfileSelectionPage;
