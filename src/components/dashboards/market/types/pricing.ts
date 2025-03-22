// src/components/dashboards/market/types/pricing.ts
export interface MarketPricing {
  daily_rate: number;
  weekly_rate: number;
  monthly_rate: number;
  security_deposit: number;
}

export interface PricingSettingsProps {
  marketId: string;
  onError: (error: Error) => void;
  onRetry?: () => Promise<void>;
}

export interface UpdatePricingRequest extends MarketPricing {}
export interface PricingResponse extends ApiResponse<MarketPricing> {}