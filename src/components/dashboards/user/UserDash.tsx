"use client";

import { User } from "@supabase/supabase-js";
import { Bookmarks } from '@/components/Bookmarks';
import { useActivityLog } from '@/hooks/useActivityLog';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorAlert } from '@/components/ui/ErrorAlert';

interface UserProfile {
  id: string;
  name: string;
  email?: string;
  avatar_url?: string;
  created_at?: string;
  updated_at?: string;
}

interface UserDashProps {
  user: User;
  profile: UserProfile; 
}

export function UserDash({ user, profile }: UserDashProps) {
  const { 
    activities, 
    loading: activitiesLoading, 
    error: activitiesError,
    logActivity 
  } = useActivityLog(user.id);

  if (activitiesLoading) {
    return <LoadingSpinner />;
  }

  if (activitiesError) {
    return <ErrorAlert message={activitiesError.message} />;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">User Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* User Profile Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Welcome, {profile.name}</h2>
          <div className="space-y-2">
            {profile.email && (
              <p className="text-sm text-gray-600">
                Email: {profile.email}
              </p>
            )}
            <p className="text-sm text-gray-600">
              Member since: {new Date(profile.created_at || '').toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Bookmarks Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <Bookmarks userId={user.id} />
        </div>

        {/* Activity Feed Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {activities.length > 0 ? (
              activities.map((activity) => (
                <div
                  key={activity.id}
                  className="p-3 bg-gray-50 rounded-lg mb-2"
                >
                  <p className="text-sm text-gray-700">{activity.message}</p>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-gray-500">
                      {new Date(activity.created_at || '').toLocaleString()}
                    </span>
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
                      {activity.type.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No recent activity</p>
            )}
          </div>
        </div>

        {/* Quick Actions Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button
              className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              onClick={() => {
                // Example of logging an activity
                logActivity(
                  'listing_created',
                  'Started creating a new listing',
                  { action: 'create_listing_start' }
                );
                // Add your navigation or modal open logic here
              }}
            >
              Browse Listings
            </button>
            <button
              className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
              onClick={() => {
                logActivity(
                  'bookmark_added',
                  'Viewed saved bookmarks',
                  { action: 'view_bookmarks' }
                );
                // Add your navigation logic here
              }}
            >
              View Saved Items
            </button>
          </div>
        </div>

        {/* Settings Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Account Settings</h2>
          <div className="space-y-3">
            <button
              className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50 transition-colors"
              onClick={() => {
                logActivity(
                  'listing_updated',
                  'Accessed profile settings',
                  { action: 'view_settings' }
                );
                // Add your navigation logic here
              }}
            >
              Edit Profile
            </button>
            <button
              className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50 transition-colors"
              onClick={() => {
                logActivity(
                  'listing_updated',
                  'Accessed notification settings',
                  { action: 'view_notifications' }
                );
                // Add your navigation logic here
              }}
            >
              Notification Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}