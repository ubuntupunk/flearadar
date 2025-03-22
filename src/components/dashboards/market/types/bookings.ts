// src/components/dashboards/market/types/bookings.ts
import { ApiResponse } from "../types";  

export interface StallBooking {
  stall_id: string;
  vendor_name: string;
  booking_start: string;
  booking_end: string;
  status: 'active' | 'pending' | 'expired';
}

export interface BookingsViewProps {
  bookings: StallBooking[];
  onError: (error: Error) => void;
  onRetry?: () => Promise<void>;
}


export interface UpdateBookingStatusRequest {
  status: StallBooking['status'];
}

export interface BookingResponse extends ApiResponse<StallBooking> {}
export interface BookingsResponse extends ApiResponse<StallBooking[]> {}