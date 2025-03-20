// src/components/auth/ProfileSelect.tsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Icons } from '@/components/Icons';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Database } from '@/lib/types/database';

type UserType = Database['public']['Tables']['users']['Row']['user_type'];
type UserRow = Database['public']['Tables']['users']['Row'];

// Define the update type to match exactly what Supabase expects
type UserUpdate = {
  geofence_radius: number | null
  gps_tracking_consent: boolean | null
  latitude: number | null
  longitude: number | null
  reputation_score: number | null
  updated_at: string | null
  user_type: string
  username: string | null
  business_name: string | null
  onboarding_completed: boolean | null
}

const userTypes: Array<{
  type: NonNullable<UserType>;
  title: string;
  description: string;
  icon: keyof typeof Icons;
  disabled?: boolean;
}> = [
  {
    type: 'user',
    title: 'Regular User',
    description: 'Browse and purchase from vendors',
    icon: 'user',
  },
  {
    type: 'vendor',
    title: 'Vendor',
    description: 'Sell your products in markets',
    icon: 'store',
  },
  {
    type: 'market',
    title: 'Market Manager',
    description: 'Manage your market and vendors',
    icon: 'building',
  },
  {
    type: 'admin',
    title: 'Administrator',
    description: 'System administration and management',
    icon: 'shield',
    disabled: true,
  },
];

export function ProfileSelectionForm() {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState<NonNullable<UserType> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSelection = async (userType: NonNullable<UserType>) => {
    try {
      if (userTypes.find(t => t.type === userType)?.disabled) {
        return;
      }

      setLoading(userType);
      setError(null);

      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error('No user found');

      // Create update object with explicit null values
      const updateData: UserUpdate = {
        user_type: userType,
        onboarding_completed: true,
        updated_at: new Date().toISOString(),
        business_name: null,
        geofence_radius: null,
        gps_tracking_consent: null,
        latitude: null,
        longitude: null,
        reputation_score: null,
        username: null
      };

      const { error: updateError } = await supabase
        .from('users')
        .update(updateData)
        .eq('id', user.id);

      if (updateError) throw updateError;

      setSuccess('Profile type selected successfully!');
      setTimeout(() => {
        router.push(`/${userType}-dash`);
      }, 1000);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Choose your profile type</h2>
        <p className="text-muted-foreground">
          Select how you'll be using the platform
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="animate-in fade-in-50">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="bg-green-50 text-green-700 border-green-200 animate-in fade-in-50">
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4">
        {userTypes.map(({ type, title, description, icon, disabled }) => {
          const Icon = Icons[icon];
          const isLoading = loading === type;

          return (
            <Card
              key={type}
              className={cn(
                "relative p-4 cursor-pointer hover:border-primary transition-colors",
                disabled && "opacity-50 cursor-not-allowed",
                loading && loading !== type && "opacity-50 pointer-events-none",
                isLoading && "border-primary"
              )}
              onClick={() => !disabled && handleSelection(type)}
            >
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/50 rounded-lg">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              )}

              <div className="flex items-start space-x-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {description}
                  </p>
                </div>
              </div>

              {disabled && (
                <div className="absolute inset-x-0 bottom-2 text-center">
                  <span className="text-xs text-muted-foreground">
                    Not available for selection
                  </span>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
