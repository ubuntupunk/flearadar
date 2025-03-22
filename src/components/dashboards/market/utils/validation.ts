// src/components/dashboards/market/utils/validation.ts
import { z } from 'zod';
import { 
  MarketPricing, 
  OperatingHours, 
  StallBooking,
  VendorPayment 
} from '../types';

// Booking Validation
export const bookingStatusSchema = z.enum(['active', 'pending', 'expired']);

export const updateBookingStatusSchema = z.object({
  status: bookingStatusSchema
});

// Pricing Validation
export const pricingSchema = z.object({
  daily_rate: z.number().min(0),
  weekly_rate: z.number().min(0),
  monthly_rate: z.number().min(0),
  security_deposit: z.number().min(0)
}).refine((data) => {
  // Weekly rate should be less than 7 daily rates
  if (data.weekly_rate >= data.daily_rate * 7) return false;
  // Monthly rate should be less than 4 weekly rates
  if (data.monthly_rate >= data.weekly_rate * 4) return false;
  return true;
}, {
  message: "Rates must provide discounts for longer periods"
});

// Operating Hours Validation
const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
const dayHoursSchema = z.object({
  open: z.string().regex(timeRegex),
  close: z.string().regex(timeRegex)
}).refine((data) => {
  const [openHour] = data.open.split(':').map(Number);
  const [closeHour] = data.close.split(':').map(Number);
  return closeHour > openHour;
}, {
  message: "Closing time must be after opening time"
});

export const operatingHoursSchema = z.object({
  monday: dayHoursSchema,
  tuesday: dayHoursSchema,
  wednesday: dayHoursSchema,
  thursday: dayHoursSchema,
  friday: dayHoursSchema,
  saturday: dayHoursSchema,
  sunday: dayHoursSchema
});
