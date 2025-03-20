// src/types/auth.ts
export type UserType = 'user' | 'vendor' | 'market' | 'admin';

export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  name?: string;
}

export interface OnboardingFormData {
  userType: UserType;
  name: string;
  phone?: string;
  address?: string;
  businessName?: string;
}
