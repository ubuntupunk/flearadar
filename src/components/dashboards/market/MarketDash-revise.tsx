//src/components/dashboards/market/MarketDash.tsx
"use client";

import { User } from "@supabase/supabase-js";
import { useActivityLog } from '@/hooks/useActivityLog';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorAlert } from '@/components/ui/ErrorAlert';
import { useState } from 'react';
import { VendorAssignment } from './vendors/VendorAssignment';
import { useRouter } from 'next/navigation';
import { useMarketOperations } from '@/hooks/useMarketOperations';
import { Modal } from '@/components/shared/Modal';


interface MarketProfile {
  id: string;
  name: string;
  business_name?: string;
  location?: string;
  market_type?: string;
  operating_hours?: string;
  contact_email?: string;
  contact_phone?: string;
  avatar_url?: string;
  created_at?: string;
  updated_at?: string;
  total_stalls?: number;
  available_stalls?: number;
}

interface MarketMetrics {
  total_vendors: number;
  active_vendors: number;
  total_visitors: number;
  avg_daily_visitors: number;
  security_score: number;
  vendor_satisfaction: number;
  revenue_this_month: number;
  pending_payments: number;
  occupancy_rate: number;
}

interface VendorPayment {
  vendor_id: string;
  vendor_name: string;
  stall_number: string;
  amount_due: number;
  due_date: string;
  status: 'paid' | 'pending' | 'overdue';
}

interface StallBooking {
  stall_id: string;
  vendor_id: string;
  vendor_name: string;
  booking_start: string;
  booking_end: string;
  status: 'active' | 'pending' | 'expired';
}

interface MarketDashProps {
  user: User;
  profile: MarketProfile;
}

export function MarketDash({ user, profile }: MarketDashProps) {
  const router = useRouter();
  const [showModal, setShowModal] = useState<string | null>(null);
  const { 
    manageStalls, 
    viewBookings, 
    managePayments, 
    updateMarketSettings,
    loading: operationsLoading 
  } = useMarketOperations(profile.id);
  
  const [metrics, setMetrics] = useState<MarketMetrics | null>(null);
  const [pendingPayments, setPendingPayments] = useState<VendorPayment[]>([]);
  const [stallBookings, setStallBookings] = useState<StallBooking[]>([]);
  
  const handleManageStalls = async () => {
    try {
      await logActivity('listing_created', 'Accessed stall management');
      const stallsData = await manageStalls();
      // Update local state or navigate to stalls management page
      router.push(`/market/${profile.id}/stalls`);
    } catch (error) {
      console.error('Error managing stalls:', error);
    }
  };

  const handleViewBookings = async () => {
    try {
      await logActivity('listing_created', 'Viewed stall bookings');
      const bookingsData = await viewBookings();
      setStallBookings(bookingsData);
      setShowModal('bookings');
    } catch (error) {
      console.error('Error viewing bookings:', error);
    }
  };

  const handleManagePayments = async () => {
    try {
      await logActivity('listing_updated', 'Accessed payment management');
      const paymentsData = await managePayments();
      setPendingPayments(paymentsData);
      setShowModal('payments');
    } catch (error) {
      console.error('Error managing payments:', error);
    }
  };

  const handleUpdateMarketLayout = async () => {
    try {
      await logActivity('listing_updated', 'Updated market layout');
      router.push(`/market/${profile.id}/layout`);
    } catch (error) {
      console.error('Error updating layout:', error);
    }
  };

  const handleUpdatePricing = async () => {
    try {
      await logActivity('listing_updated', 'Updated pricing');
      setShowModal('pricing');
    } catch (error) {
      console.error('Error updating pricing:', error);
    }
  };

  const handleUpdateHours = async () => {
    try {
      await logActivity('listing_updated', 'Updated operating hours');
      setShowModal('hours');
    } catch (error) {
      console.error('Error updating hours:', error);
    }
  };

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
      <h1 className="text-2xl font-bold mb-6">Market Dashboard</h1>
      
      {/* Quick Stats Row */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Today's Revenue</p>
          <p className="text-2xl font-bold">R{metrics?.revenue_this_month || 0}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Occupancy Rate</p>
          <p className="text-2xl font-bold">{metrics?.occupancy_rate || 0}%</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Pending Payments</p>
          <p className="text-2xl font-bold">{metrics?.pending_payments || 0}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Today's Visitors</p>
          <p className="text-2xl font-bold">{metrics?.total_visitors || 0}</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Stall Management Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Stall Management</h2>
          <div className="space-y-3">
            <div className="bg-gray-50 p-3 rounded">
              <p className="text-sm font-medium">Available Stalls</p>
              <p className="text-xl font-semibold">
                {profile.available_stalls} / {profile.total_stalls}
              </p>
            </div>
            <button
              className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              onClick={handleManageStalls}
              disabled={operationsLoading}
              >
               {operationsLoading ? 'Loading...' : 'Manage Stalls'} 
            </button>
            <button
              className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
              onClick={handleViewBookings}
              disabled={operationsLoading}
            >
              {operationsLoading ? 'Loading...' : 'View Bookings'}
            </button>
          </div>
        </div>

        {/* Vendor Payments Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Vendor Payments</h2>
          <div className="space-y-3">
            <div className="max-h-48 overflow-y-auto">
              {pendingPayments.map((payment) => (
                <div key={payment.vendor_id} className="p-2 border-b last:border-b-0">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{payment.vendor_name}</p>
                      <p className="text-sm text-gray-600">Stall #{payment.stall_number}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">R{payment.amount_due}</p>
                      <p className={`text-sm ${
                        payment.status === 'overdue' ? 'text-red-600' : 
                        payment.status === 'paid' ? 'text-green-600' : 
                        'text-yellow-600'
                      }`}>
                        {payment.status.toUpperCase()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              onClick={handleManagePayments}
              disabled={operationsLoading}
            >
              {operationsLoading ? 'Loading...' : 'Manage Payments'}
            </button>
          </div>
        </div>

        {/* Visitor Analytics Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Visitor Analytics</h2>
          <div className="space-y-3">
            <div className="bg-gray-50 p-3 rounded">
              <p className="text-sm font-medium">Peak Hours Today</p>
              <p className="text-xs text-gray-600">10:00 AM - 2:00 PM</p>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <p className="text-sm font-medium">Average Visit Duration</p>
              <p className="text-xs text-gray-600">1.5 hours</p>
            </div>
            <button
              className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50 transition-colors"
              onClick={() => logActivity('listing_updated', 'Viewed detailed analytics')}
            >
              View Detailed Analytics
            </button>
          </div>
        </div>

        {/* Current Bookings Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Current Bookings</h2>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {stallBookings.map((booking) => (
              <div key={booking.stall_id} className="p-3 bg-gray-50 rounded-lg mb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{booking.vendor_name}</p>
                    <p className="text-sm text-gray-600">Stall #{booking.stall_id}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${
                    booking.status === 'active' ? 'bg-green-100 text-green-800' :
                    booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {booking.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(booking.booking_start).toLocaleDateString()} - 
                  {new Date(booking.booking_end).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Market Settings Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Market Settings</h2>
          <div className="space-y-3">
            <button
              className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50 transition-colors"
              onClick={handleUpdateMarketLayout}
              disabled={operationsLoading}
            >
              Market Layout
            </button>
            <button
              className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50 transition-colors"
              onClick={handleUpdatePricing}
              disabled={operationsLoading}
            >
              Pricing Settings
            </button>
            <button
              className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50 transition-colors"
              onClick={handleUpdateHours}
              disabled={operationsLoading}
            >
              Operating Hours
            </button>
          </div>
        </div>

        {/* Activity Feed Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {activities.map((activity) => (
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
            ))}
          </div>
        </div>
      </div>

      {/* Vendor Management Section */}
      <div className="col-span-full mt-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Vendor Management</h2>
          <VendorAssignment marketId={profile.id} />
        </div>
      </div>

      {/* Modals */}
      {showModal === 'bookings' && (
        <Modal
          title="Stall Bookings"
          onClose={() => setShowModal(null)}
        >
          {/* Add BookingsView component */}
        </Modal>
      )}

      {showModal === 'payments' && (
        <Modal
          title="Vendor Payments"
          onClose={() => setShowModal(null)}
        >
          {/* Add PaymentsView component */}
        </Modal>
      )}

      {showModal === 'pricing' && (
        <Modal
          title="Pricing Settings"
          onClose={() => setShowModal(null)}
        >
          {/* Add PricingSettings component */}
        </Modal>
      )}

      {showModal === 'hours' && (
        <Modal
          title="Operating Hours"
          onClose={() => setShowModal(null)}
        >
          {/* Add OperatingHours component */}
        </Modal>
      )}
    </div>
  );
}