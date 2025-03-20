"use client";

import { User } from "@supabase/supabase-js";

interface UserDashProps {
  user: User;
  profile: any; // Replace 'any' with your profile type
}

export function UserDash({ user, profile }: UserDashProps) {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">User Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* User-specific dashboard content */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Welcome, {profile.name}</h2>
          {/* Add user dashboard widgets/cards here */}
        </div>
      </div>
    </div>
  );
}
