// services/payments.ts
import { PaymentStatus } from '../types';
import { ApiService, ApiError } from '../types/api';

export interface PaymentMethod {
  id: string;
  type: 'credit_card' | 'bank_transfer' | 'cash';
  name: string;
  isDefault: boolean;
  status: 'active' | 'inactive';
}

export interface PaymentSettings {
  acceptedMethods: PaymentMethod[];
  autoPaymentEnabled: boolean;
  paymentTerms?: string;
}

export class PaymentService {
  private static readonly BASE_PATH = '/markets';

  static async getPaymentSettings(marketId: string): Promise<PaymentSettings> {
    try {
      const response = await ApiService.fetch<{ data: PaymentSettings }>(
        `${this.BASE_PATH}/${marketId}/payments`
      );
      return response.data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to fetch payment settings', 500);
    }
  }

  static async updatePaymentStatus(
    marketId: string,
    paymentId: string,
    status: PaymentStatus  
  ): Promise<void> {
    try {
      await ApiService.fetch<void>(
        `${this.BASE_PATH}/${marketId}/payments/${paymentId}`,
        {
          method: 'PATCH',
          body: JSON.stringify({ status }),
        }
      );
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to update payment status', 500);
    }
  }

  static async updatePaymentSettings(
    marketId: string,
    settings: Partial<PaymentSettings>
  ): Promise<void> {
    try {
      await ApiService.fetch<void>(
        `${this.BASE_PATH}/${marketId}/payments`,
        {
          method: 'PUT',
          body: JSON.stringify(settings),
        }
      );
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to update payment settings', 500);
    }
  }

  static async addPaymentMethod(
    marketId: string,
    method: Omit<PaymentMethod, 'id'>
  ): Promise<PaymentMethod> {
    try {
      const response = await ApiService.fetch<{ data: PaymentMethod }>(
        `${this.BASE_PATH}/${marketId}/payments/methods`,
        {
          method: 'POST',
          body: JSON.stringify(method),
        }
      );
      return response.data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to add payment method', 500);
    }
  }

  static async removePaymentMethod(
    marketId: string,
    methodId: string
  ): Promise<void> {
    try {
      await ApiService.fetch<void>(
        `${this.BASE_PATH}/${marketId}/payments/methods/${methodId}`,
        {
          method: 'DELETE',
        }
      );
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to remove payment method', 500);
    }
  }
}

export const {
  getPaymentSettings,
  updatePaymentSettings,
  addPaymentMethod,
  removePaymentMethod,
} = PaymentService;
