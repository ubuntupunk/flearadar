// services/pricing.ts
import { ApiService, ApiError } from '../types/api';

export interface PricingTier {
  id: string;
  name: string;
  description?: string;
  price: number;
  currency: string;
  billingPeriod: 'monthly' | 'yearly' | 'one_time';
  features: string[];
  isActive: boolean;
}

export interface DiscountRule {
  id: string;
  name: string;
  type: 'percentage' | 'fixed_amount';
  value: number;
  startDate?: string;
  endDate?: string;
  minimumPurchase?: number;
  maximumDiscount?: number;
  isActive: boolean;
}

export interface PricingSettings {
  tiers: PricingTier[];
  discountRules: DiscountRule[];
  defaultCurrency: string;
  taxRate?: number;
  customPricingEnabled: boolean;
}

export class PricingService {
  private static readonly BASE_PATH = '/markets';

  static async getPricingSettings(marketId: string): Promise<PricingSettings> {
    try {
      const response = await ApiService.fetch<{ data: PricingSettings }>(
        `${this.BASE_PATH}/${marketId}/pricing`
      );
      return response.data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to fetch pricing settings', 500);
    }
  }

  static async updatePricingSettings(
    marketId: string,
    settings: Partial<PricingSettings>
  ): Promise<void> {
    try {
      await ApiService.fetch<void>(
        `${this.BASE_PATH}/${marketId}/pricing`,
        {
          method: 'PUT',
          body: JSON.stringify(settings),
        }
      );
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to update pricing settings', 500);
    }
  }

  static async createPricingTier(
    marketId: string,
    tier: Omit<PricingTier, 'id'>
  ): Promise<PricingTier> {
    try {
      const response = await ApiService.fetch<{ data: PricingTier }>(
        `${this.BASE_PATH}/${marketId}/pricing/tiers`,
        {
          method: 'POST',
          body: JSON.stringify(tier),
        }
      );
      return response.data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to create pricing tier', 500);
    }
  }

  static async updatePricingTier(
    marketId: string,
    tierId: string,
    updates: Partial<PricingTier>
  ): Promise<PricingTier> {
    try {
      const response = await ApiService.fetch<{ data: PricingTier }>(
        `${this.BASE_PATH}/${marketId}/pricing/tiers/${tierId}`,
        {
          method: 'PUT',
          body: JSON.stringify(updates),
        }
      );
      return response.data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to update pricing tier', 500);
    }
  }

  static async deletePricingTier(
    marketId: string,
    tierId: string
  ): Promise<void> {
    try {
      await ApiService.fetch<void>(
        `${this.BASE_PATH}/${marketId}/pricing/tiers/${tierId}`,
        {
          method: 'DELETE',
        }
      );
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to delete pricing tier', 500);
    }
  }

  static async createDiscountRule(
    marketId: string,
    rule: Omit<DiscountRule, 'id'>
  ): Promise<DiscountRule> {
    try {
      const response = await ApiService.fetch<{ data: DiscountRule }>(
        `${this.BASE_PATH}/${marketId}/pricing/discounts`,
        {
          method: 'POST',
          body: JSON.stringify(rule),
        }
      );
      return response.data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to create discount rule', 500);
    }
  }

  static async updateDiscountRule(
    marketId: string,
    ruleId: string,
    updates: Partial<DiscountRule>
  ): Promise<DiscountRule> {
    try {
      const response = await ApiService.fetch<{ data: DiscountRule }>(
        `${this.BASE_PATH}/${marketId}/pricing/discounts/${ruleId}`,
        {
          method: 'PUT',
          body: JSON.stringify(updates),
        }
      );
      return response.data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to update discount rule', 500);
    }
  }

  static async deleteDiscountRule(
    marketId: string,
    ruleId: string
  ): Promise<void> {
    try {
      await ApiService.fetch<void>(
        `${this.BASE_PATH}/${marketId}/pricing/discounts/${ruleId}`,
        {
          method: 'DELETE',
        }
      );
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to delete discount rule', 500);
    }
  }
}

export const {
  getPricingSettings,
  updatePricingSettings,
  createPricingTier,
  updatePricingTier,
  deletePricingTier,
  createDiscountRule,
  updateDiscountRule,
  deleteDiscountRule,
} = PricingService;
