// src/hooks/useErrorHandler.ts
import { useState } from 'react';

interface ErrorState {
  message: string;
  code?: string;
  section?: string;
}

export function useErrorHandler() {
  const [error, setError] = useState<ErrorState | null>(null);

  const handleError = (error: any, section?: string) => {
    const errorMessage = error?.message || 'An unexpected error occurred';
    const errorCode = error?.code || 'UNKNOWN_ERROR';
    setError({ message: errorMessage, code: errorCode, section });
  };

  const clearError = () => setError(null);

  return { error, handleError, clearError };
}
