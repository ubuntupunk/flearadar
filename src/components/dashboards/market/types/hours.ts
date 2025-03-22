// src/components/dashboards/market/types/hours.ts
export interface DayHours {
  open: string;
  close: string;
}

export interface OperatingHours {
  monday: DayHours;
  tuesday: DayHours;
  wednesday: DayHours;
  thursday: DayHours;
  friday: DayHours;
  saturday: DayHours;
  sunday: DayHours;
}

export interface OperatingHoursProps {
  marketId: string;
  monday: DayHours;
  tuesday: DayHours;
  wednesday: DayHours;
  thursday: DayHours;
  friday: DayHours;
  saturday: DayHours;
  sunday: DayHours;
  onError: (error: Error) => void;
  onRetry?: () => Promise<void>;
}


export interface UpdateHoursRequest extends OperatingHours {}
export interface HoursResponse extends ApiResponse<OperatingHours> {}

