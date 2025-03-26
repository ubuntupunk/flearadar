// lib/utils/retry.ts
import { RetryFunction } from './types/utils';

export const onRetry: RetryFunction = async (
  fn,
  maxAttempts = 3,
  delay = 1000
) => {
  let lastError: Error;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (attempt === maxAttempts) break;
      
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError!;
};
