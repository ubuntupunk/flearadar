// types/hours.ts
const DAYS = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday'
] as const;

export type DayOfWeek = typeof DAYS[number];
export type NightOfWeek = `${DayOfWeek}_night`;

export interface DayHours {
  open: string;
  close: string;
}

export interface NightHours extends DayHours {}

export interface OperatingHours {
  monday: DayHours;
  tuesday: DayHours;
  wednesday: DayHours;
  thursday: DayHours;
  friday: DayHours;
  saturday: DayHours;
  sunday: DayHours;
  monday_night: NightHours;
  tuesday_night: NightHours;
  wednesday_night: NightHours;
  thursday_night: NightHours;
  friday_night: NightHours;
  saturday_night: NightHours;
  sunday_night: NightHours;
}

export interface OperatingHoursProps {
  marketId: string;
  onError: (error: Error) => void;
  onRetry?: (
    retryFn: () => Promise<void>,
    maxAttempts?: number,
    delay?: number
  ) => void;
}


// Utility type for validation
export type ValidHourString = string & {
  _brand: 'ValidHourString';
};

// Helper types for updating hours
export type HourType = 'open' | 'close';
export type TimeOfDay = 'day' | 'night';
