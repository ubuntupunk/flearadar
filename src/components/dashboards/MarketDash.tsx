"use client";

import { User } from "@supabase/supabase-js";

interface MarketDashProps {
  user: User;
  profile: any; // Replace 'any' with your profile type
}

export function MarketDash({ user, profile }: MarketDashProps) {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Market Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Market-specific dashboard content */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Market Overview</h2>
          {/* Add market dashboard widgets/cards here */}
        </div>
      </div>
    </div>
  );
}
