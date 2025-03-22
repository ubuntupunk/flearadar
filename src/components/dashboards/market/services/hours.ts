// services/hours.ts
import { ApiService, ApiError } from '../types/api';
import { OperatingHours } from '../types/hours';

interface HoursResponse {
  data: OperatingHours;
  message?: string;
  status: 'success' | 'error';
}

export class HoursService {
  private static readonly BASE_PATH = '/markets';

  /**
   * Updates the operating hours for a specific market
   * @param marketId - The ID of the market to update
   * @param hours - The new operating hours data
   */
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

  /**
   * Retrieves the operating hours for a specific market
   * @param marketId - The ID of the market to fetch hours for
   * @returns Promise containing the operating hours data
   */
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

      if (!response.data) {
        throw new ApiError('No operating hours data received', 404);
      }

      return response.data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        'Failed to fetch operating hours',
        500
      );
    }
  }

  /**
   * Handles error cases and converts unknown errors to proper Error objects
   * @param error - The error to handle
   * @returns A proper Error object
   */
  private static handleError(error: unknown): Error {
    if (error instanceof Error) {
      return error;
    }
    return new Error('An unexpected error occurred while managing operating hours');
  }
}

// Export individual methods for convenient destructuring
export const { getOperatingHours, updateOperatingHours } = HoursService;
