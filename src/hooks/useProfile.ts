// src/hooks/use-profile.ts
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { ProfileFormData } from "@/lib/validations/profile";
import { User } from "@supabase/supabase-js";

export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  website: string | null;
}

interface UseProfile {
  profile: Profile | null;
  updateProfile: (data: ProfileFormData) => Promise<void>;
  isLoading: boolean;
}

export function useProfile(): UseProfile {
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch("/api/profile");
        if (!response.ok) throw new Error("Failed to fetch profile");

        const { data } = await response.json();
        const profileData = data as Profile;
        setProfile({
          id: profileData.id,
          full_name: profileData.full_name || null,
          avatar_url: profileData.avatar_url || null,
          website: profileData.website || null,
        });
      } catch (error) {
        toast(
          error instanceof Error ? error.message : "Failed to fetch profile"
        );
        setProfile(null);
      }
    }

    fetchProfile();
  }, [toast]);

  const updateProfile = async (data: ProfileFormData) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to update profile");

      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update profile"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { profile, updateProfile, isLoading };
}
