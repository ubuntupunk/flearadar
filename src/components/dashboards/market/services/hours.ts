// services/hours.ts
import { ApiService } from '../types/api';
import { OperatingHours } from '../types/hours';

interface HoursResponse {
  data: OperatingHours;
  message?: string;
  status: 'success' | 'error';
}

export class HoursService {
  private static readonly BASE_PATH = '/markets';

  static async updateOperatingHours(
    marketId: string, 
    hours: OperatingHours
  ): Promise<void> {
    try {
      await ApiService.fetch<void>(
        `${this.BASE_PATH}/${marketId}/hours`,
        {
          method: 'PUT',
          body: JSON.stringify(hours),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error) {
      throw this.handleError(error);
    }
  }

  static async getOperatingHours(
    marketId: string
  ): Promise<OperatingHours> {
    try {
      const response = await ApiService.fetch<HoursResponse>(
        `${this.BASE_PATH}/${marketId}/hours`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private static handleError(error: unknown): Error {
    if (error instanceof Error) {
      return error;
    }
    return new Error('An unexpected error occurred while managing operating hours');
  }
}

export const { getOperatingHours, updateOperatingHours } = HoursService;

