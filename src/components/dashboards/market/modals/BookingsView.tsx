// src/components/dashboards/market/modals/BookingsView.tsx
import { useState } from 'react';
import { BookingsViewProps, StallBooking } from '../types';
import { Toast } from '@/components/shared/Toast';
import { updateBookingStatus } from '../services/bookings';

export function BookingsView({ bookings, onError, onRetry }: BookingsViewProps) {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleStatusUpdate = async (bookingId: string, status: 'active' | 'pending' | 'expired') => {
    setLoading(true);
    try {
      await updateBookingStatus(bookingId, status);
      setSuccessMessage('Booking status updated successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      onError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {bookings.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-gray-500">No bookings found</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-2 text-blue-500 hover:text-blue-600"
            >
              Retry Loading Bookings
            </button>
          )}
        </div>
      ) : (
        bookings.map((booking) => (
          <div
            key={booking.stall_id}
            className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{booking.vendor_name}</h3>
                <p className="text-sm text-gray-600">Stall #{booking.stall_id}</p>
                <p className="text-sm text-gray-500">
                  {new Date(booking.booking_start).toLocaleDateString()} - 
                  {new Date(booking.booking_end).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  booking.status === 'active' ? 'bg-green-100 text-green-800' :
                  booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {booking.status.toUpperCase()}
                </span>
                <select
                  className="text-sm border rounded p-1"
                  value={booking.status}
                  onChange={(e) => handleStatusUpdate(booking.stall_id, e.target.value as any)}
                >
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="expired">Expired</option>
                </select>
              </div>
            </div>
          </div>
        ))
      )}

{/* Success Toast */}
      {successMessage && (
        <Toast
          type="success"
          message={successMessage}
          onClose={() => setSuccessMessage('')}
        />
      )}
      </div>
  );
}  