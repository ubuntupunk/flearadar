// src/hooks/useProfile.ts
import { useState, useEffect } from "react";
import { toast } from "sonner";
import type { Database } from "@/lib/types/database";
import { ProfileFormData } from "@/lib/validations/profile";
import { timeFormats } from "@/lib/utils/time-formats";

// Use the existing Database type to define Profile
export type ProfileWithUsername = Database["public"]["Views"]["profile_with_username"]["Row"];

interface UseProfile {
  profile: ProfileWithUsername | null;
  updateProfile: (data: ProfileFormData) => Promise<void>;
  isLoading: boolean;
  formatLastSeen: (date: string | null) => string;
  isOnline: boolean;
}

export function useProfile(): UseProfile {
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<ProfileWithUsername | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch("/api/profile");
        if (!response.ok) throw new Error("Failed to fetch profile");

        const { data } = await response.json();
        const profileData = data as ProfileWithUsername;

        setProfile({
          id: profileData.id,
          full_name: profileData.full_name || null,
          avatar_url: profileData.avatar_url || null,
          website: profileData.website || null,
          last_seen_at: profileData.last_seen_at || null,
          chosen_color_id: profileData.chosen_color_id || null,
          profile_type: profileData.profile_type || null,
          updated_at: profileData.updated_at || null,
          username: profileData.username || null,
          email: profileData.email || null,
          notification_preferences: profileData.notification_preferences || null,
          status_message: profileData.status_message || null,
          status_emoji: profileData.status_emoji || null,
          timezone: profileData.timezone || null,
        });
        // Add last seen update
        void updateLastSeen();
      } catch (error) {
        toast(error instanceof Error ? error.message : "Failed to fetch profile");
        // Set profile to null in case of error
        setProfile(null);
      }
    }

    fetchProfile();
  }, [toast]);

  const updateLastSeen = async () => {
    try {
      const response = await fetch("/api/profile/last-seen", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Failed to update last seen timestamp");
      }
    } catch (error) {
      console.error("Error updating last seen:", error);
    }
  };

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

      setProfile((prev: ProfileWithUsername | null) =>
        prev
          ? {
              ...prev,
              ...data,
              last_seen_at: new Date().toISOString(),
            }
          : null
      );

      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update profile"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Add time formatting utilities
  const formatLastSeen = (date: string | null) =>
    timeFormats.formatRelativeTime(date);
  const isOnline = profile?.last_seen_at
    ? timeFormats.getOnlineStatus(profile.last_seen_at) === "Online"
    : false;

  return {
    profile,
    updateProfile,
    isLoading,
    formatLastSeen,
    isOnline,
  };
}
