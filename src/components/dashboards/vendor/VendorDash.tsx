"use client";

import { User } from "@supabase/supabase-js";
import { Bookmarks } from '@/components/Bookmarks';
import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorAlert } from '@/components/ui/ErrorAlert';
import type { Database } from '@/lib/types/database';

interface VendorProfile {
  id: string;
  name: string;
  business_name?: string;
  contact_email?: string;
  contact_phone?: string;
  avatar_url?: string;
  created_at?: string;
  updated_at?: string;
}

interface VendorStats {
  total_listings: number;
  active_listings: number;
  total_views: number;
  total_bookmarks: number;
  recent_activity: ActivityItem[];
}

interface ActivityItem {
  id: string;
  type: 'listing_created' | 'listing_updated' | 'bookmark_added' | 'verification_received';
  message: string;
  created_at: string;
  metadata?: Record<string, any>;
}

interface VendorDashProps {
  user: User;
  profile: VendorProfile;
}

export function VendorDash({ user, profile }: VendorDashProps) {
  const [stats, setStats] = useState<VendorStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [listings, setListings] = useState<any[]>([]);
  const supabase = createClientComponentClient<Database>();

  // Fetch initial data
  useEffect(() => {
    fetchVendorData();
    // Set up real-time subscriptions
    setupRealtimeSubscriptions();
  }, [user.id]);

  const fetchVendorData = async () => {
    try {
      setLoading(true);
      const [statsResult, listingsResult] = await Promise.all([
        fetchVendorStats(),
        fetchVendorListings(),
      ]);

      setStats(statsResult);
      setListings(listingsResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const fetchVendorStats = async () => {
    const { data, error } = await supabase
      .from('vendor_stats')
      .select('*')
      .eq('vendor_id', user.id)
      .single();

    if (error) throw error;
    return data;
  };

  const fetchVendorListings = async () => {
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .eq('owner_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  };

  const setupRealtimeSubscriptions = () => {
    // Subscribe to stats changes
    const statsSubscription = supabase
      .channel('vendor_stats_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'vendor_stats',
          filter: `vendor_id=eq.${user.id}`,
        },
        (payload) => {
          setStats((current) => ({ ...current, ...payload.new }));
        }
      )
      .subscribe();

    // Subscribe to listings changes
    const listingsSubscription = supabase
      .channel('vendor_listings_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'listings',
          filter: `owner_id=eq.${user.id}`,
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setListings((current) => [payload.new, ...current]);
          } else if (payload.eventType === 'DELETE') {
            setListings((current) => 
              current.filter((listing) => listing.id !== payload.old.id)
            );
          } else if (payload.eventType === 'UPDATE') {
            setListings((current) =>
              current.map((listing) =>
                listing.id === payload.new.id ? payload.new : listing
              )
            );
          }
        }
      )
      .subscribe();

    // Cleanup subscriptions
    return () => {
      statsSubscription.unsubscribe();
      listingsSubscription.unsubscribe();
    };
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorAlert message={error} />;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Vendor Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Vendor Profile Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">
            Welcome, {profile.business_name || profile.name}
          </h2>
          <div className="space-y-2">
            {profile.contact_email && (
              <p className="text-sm text-gray-600">
                Email: {profile.contact_email}
              </p>
            )}
            {profile.contact_phone && (
              <p className="text-sm text-gray-600">
                Phone: {profile.contact_phone}
              </p>
            )}
          </div>
        </div>

        {/* Vendor Stats Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Your Statistics</h2>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              Total Listings: {stats?.total_listings || 0}
            </p>
            <p className="text-sm text-gray-600">
              Active Listings: {stats?.active_listings || 0}
            </p>
            <p className="text-sm text-gray-600">
              Total Views: {stats?.total_views || 0}
            </p>
            <p className="text-sm text-gray-600">
              Total Bookmarks: {stats?.total_bookmarks || 0}
            </p>
            <p className="text-sm text-gray-600">
              Member since: {new Date(profile.created_at || '').toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Bookmarks Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <Bookmarks userId={user.id} />
        </div>

        {/* Listings Management Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Manage Listings</h2>
          <div className="space-y-4">
            <button
              className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              onClick={() => {/* Add create listing handler */}}
            >
              Create New Listing
            </button>
            <div className="max-h-64 overflow-y-auto">
              {listings.map((listing) => (
                <div key={listing.id} className="p-2 border-b last:border-b-0">
                  <h3 className="font-medium">{listing.title}</h3>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-sm text-gray-500">
                      {new Date(listing.created_at).toLocaleDateString()}
                    </span>
                    <div className="space-x-2">
                      <button
                        className="text-blue-500 hover:text-blue-700 text-sm"
                        onClick={() => {/* Add edit handler */}}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700 text-sm"
                        onClick={() => {/* Add delete handler */}}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activity Feed Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {stats?.recent_activity && stats.recent_activity.length > 0 ? (
              stats.recent_activity.map((activity) => (
                <div
                  key={activity.id}
                  className="p-2 border-b last:border-b-0"
                >
                  <p className="text-sm text-gray-600">{activity.message}</p>
                  <span className="text-xs text-gray-500">
                    {new Date(activity.created_at).toLocaleDateString()}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-600">No recent activity</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
