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
import {
  BookingsView, 
  PaymentsView, 
  PricingSettings, 
  OperatingHours 
} from './modals';

import { useErrorHandler } from '@/hooks/useErrorHandler';
import { Toast } from '@/components/shared/Toast'; // We'll need to create this

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
  
  const { error, handleError, clearError } = useErrorHandler();
  const [loadingStates, setLoadingStates] = useState<{
    [key: string]: boolean;
  }>({
    stalls: false,
    bookings: false,
    payments: false,
    layout: false,
    pricing: false,
    hours: false,
  });

  const setLoading = (section: string, isLoading: boolean) => {
    setLoadingStates(prev => ({ ...prev, [section]: isLoading }));
  };

  const handleManageStalls = async () => {
    setLoading('stalls', true);
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
    setLoading('bookings', true)
    try {
      await logActivity('listing_created', 'Viewed stall bookings');
      const bookingsData = await viewBookings();
      setStallBookings(bookingsData);
      setShowModal('bookings');
    } catch (error) {
      handleError(error, 'bookings');
    } finally {
      setLoading('bookings', false);
    }
  };

  const handleManagePayments = async () => {
    setLoading('payments', true);
    try {
      await logActivity('listing_updated', 'Accessed payment management');
      const paymentsData = await managePayments();
      setPendingPayments(paymentsData);
      setShowModal('payments');
    } catch (error) {
     handleError(error, 'payments');
    } finally {
      setLoading('payments', false);
    }
  };

  const handleUpdateMarketLayout = async () => {
    setLoading('layout', true);
    try {
      await logActivity('listing_updated', 'Updated market layout');
      router.push(`/market/${profile.id}/layout`);
     } catch (error) {
      handleError(error, 'layout');
    } finally {
      setLoading('layout', false);
    }
  };

  const handleUpdatePricing = async () => {
    setLoading('pricing', true);
    try {
      await logActivity('listing_updated', 'Updated pricing');
      setShowModal('pricing');
     } catch (error) {
      handleError(error, 'pricing');
    } finally {
      setLoading('pricing', false);
    }
  };

  const handleUpdateHours = async () => {
    setLoading('hours', true);
    try {
      await logActivity('listing_updated', 'Updated operating hours');
      setShowModal('hours');
   } catch (error) {
      handleError(error, 'hours');
    } finally {
      setLoading('hours', false);
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
                className={`w-full bg-blue-500 text-white px-4 py-2 rounded 
                  ${loadingStates.stalls ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'} 
                  transition-colors`}
                onClick={handleManageStalls}
                disabled={loadingStates.stalls}
              >
                {loadingStates.stalls ? (
                  <span className="flex items-center justify-center">
                    <LoadingSpinner size="small" />
                    <span className="ml-2">Loading...</span>
                  </span>
                ) : (
                  'Manage Stalls'
                )}
              </button>
              <button
                className={`w-full bg-green-500 text-white px-4 py-2 rounded 
                  ${loadingStates.bookings ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'} 
                  transition-colors`}
                onClick={handleViewBookings}
                disabled={loadingStates.bookings}
              >
                {loadingStates.bookings ? (
                  <span className="flex items-center justify-center">
                    <LoadingSpinner size="small" />
                    <span className="ml-2">Loading...</span>
                  </span>
                ) : (
                  'View Bookings'
                )}
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
                className={`w-full bg-blue-500 text-white px-4 py-2 rounded 
                  ${loadingStates.payments ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'} 
                  transition-colors`}
                onClick={handleManagePayments}
                disabled={loadingStates.payments}
              >
                {loadingStates.payments ? (
                  <span className="flex items-center justify-center">
                    <LoadingSpinner size="small" />
                    <span className="ml-2">Loading...</span>
                  </span>
                ) : (
                  'Manage Payments'
                )}
              </button>
            </div>
          </div>
  
          {/* Market Settings Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Market Settings</h2>
            <div className="space-y-3">
              <button
                className={`w-full border border-gray-300 text-gray-700 px-4 py-2 rounded 
                  ${loadingStates.layout ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'} 
                  transition-colors`}
                onClick={handleUpdateMarketLayout}
                disabled={loadingStates.layout}
              >
                {loadingStates.layout ? (
                  <span className="flex items-center justify-center">
                    <LoadingSpinner size="small" />
                    <span className="ml-2">Loading...</span>
                  </span>
                ) : (
                  'Market Layout'
                )}
              </button>
              <button
                className={`w-full border border-gray-300 text-gray-700 px-4 py-2 rounded 
                  ${loadingStates.pricing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'} 
                  transition-colors`}
                onClick={handleUpdatePricing}
                disabled={loadingStates.pricing}
              >
                {loadingStates.pricing ? (
                  <span className="flex items-center justify-center">
                    <LoadingSpinner size="small" />
                    <span className="ml-2">Loading...</span>
                  </span>
                ) : (
                  'Pricing Settings'
                )}
              </button>
              <button
                className={`w-full border border-gray-300 text-gray-700 px-4 py-2 rounded 
                  ${loadingStates.hours ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'} 
                  transition-colors`}
                onClick={handleUpdateHours}
                disabled={loadingStates.hours}
              >
                {loadingStates.hours ? (
                  <span className="flex items-center justify-center">
                    <LoadingSpinner size="small" />
                    <span className="ml-2">Loading...</span>
                  </span>
                ) : (
                  'Operating Hours'
                )}
              </button>
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
  
        {/* Error Toast */}
        {error && (
          <Toast
            type="error"
            message={error.message}
            onClose={clearError}
          />
        )}
  
        {/* Modals */}
        {showModal === 'bookings' && (
          <Modal
            title="Stall Bookings"
            onClose={() => {
              setShowModal(null);
              clearError();
            }}
          >
            {loadingStates.bookings ? (
              <div className="flex justify-center p-4">
                <LoadingSpinner size="large" />
              <p className="mt-4 text-gray-600">Loading bookings...</p>
              </div>
            ) : (
              <BookingsView 
                bookings={stallBookings}
                onError={(error) => handleError(error, 'bookings')}
                onRetry={() => handleViewBookings()}
              />
            )}
          </Modal>
        )}
  
        {showModal === 'payments' && (
          <Modal
            title="Vendor Payments"
            onClose={() => {
              setShowModal(null);
              clearError();
            }}
          >
            {loadingStates.payments ? (
              <div className="flex justify-center p-4">
                <LoadingSpinner size="large" />
                <p className="mt-4 text-gray-600">Loading Payments...</p>
              </div>
            ) : (
              <PaymentsView 
                payments={pendingPayments}
                onError={(error) => handleError(error, 'payments')}
                onRetry={handleManagePayments}
              />
            )}
          </Modal>
        )}
  
        {showModal === 'pricing' && (
          <Modal
            title="Pricing Settings"
            onClose={() => {
              setShowModal(null);
              clearError();
            }}
          >
            {loadingStates.pricing ? (
              <div className="flex justify-center p-4">
               <LoadingSpinner size="large" />
              <p className="mt-4 text-gray-600">Loading Pricing...</p>
              </div> 
            ) : (
              <PricingSettings 
                marketId={profile.id}
                onError={(error) => handleError(error, 'pricing')}
                onRetry={handleUpdatePricing}
              />
            )}
          </Modal>
        )}
  
        {showModal === 'hours' && (
          <Modal
            title="Operating Hours"
            onClose={() => {
              setShowModal(null);
              clearError();
            }}
          >
            {loadingStates.hours ? (
              <div className="flex justify-center p-4">
                <LoadingSpinner size="large" />
                <p className="mt-4 text-gray-600">Loading Operating Hours...</p>
              </div>
            ) : (
              <OperatingHours 
                marketId={profile.id}
                onError={(error) => handleError(error, 'hours')}
                onRetry={handleUpdateHours}
              />
            )}
          </Modal>
        )}
      </div>
    );
  }
  