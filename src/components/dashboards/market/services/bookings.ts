// src/components/dashboards/market/services/bookings.ts
import { StallBooking } from '../types';

export async function updateBookingStatus(bookingId: string, status: StallBooking['status']): Promise<void> {
  const response = await fetch(`/api/bookings/${bookingId}/status`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update booking status');
  }

  return response.json();
}
