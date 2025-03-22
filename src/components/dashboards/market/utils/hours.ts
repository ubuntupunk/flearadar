// utils/hours.ts
import { OperatingHours, ValidHourString } from '../types/hours';

export const defaultOperatingHours: OperatingHours = {
  monday: { open: '09:00', close: '17:00' },
  tuesday: { open: '09:00', close: '17:00' },
  wednesday: { open: '09:00', close: '17:00' },
  thursday: { open: '09:00', close: '17:00' },
  friday: { open: '09:00', close: '17:00' },
  saturday: { open: '09:00', close: '17:00' },
  sunday: { open: '09:00', close: '17:00' },
  monday_night: { open: '17:00', close: '23:00' },
  tuesday_night: { open: '17:00', close: '23:00' },
  wednesday_night: { open: '17:00', close: '23:00' },
  thursday_night: { open: '17:00', close: '23:00' },
  friday_night: { open: '17:00', close: '23:00' },
  saturday_night: { open: '17:00', close: '23:00' },
  sunday_night: { open: '17:00', close: '23:00' },
};

// Type guard for hour string validation
export function isValidHourString(value: string): value is ValidHourString {
  const hourRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return hourRegex.test(value);
}
