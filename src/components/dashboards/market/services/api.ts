// src/components/dashboards/market/types/api.ts
import { ApiError } from '../types';

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: 'success' | 'error';
}

export interface ApiError {
  message: string;
  code: string;
  status: number;
}

export class ApiService {
  private static baseUrl = process.env.NEXT_PUBLIC_API_URL || '/api';

  static async fetch<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.message || 'An error occurred');
    }

    return response.json();
  }
}
