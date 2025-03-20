// src/app/auth/register/page.tsx
import React from 'react';
import { RegisterForm } from '@/components/auth/register-form';
import { AuthCard } from '@/components/ui/auth-card';

const RegisterPage = () => {
  return (
    <AuthCard
      title="Register"
      description="Create an account to get started"
    >
      <RegisterForm />
    </AuthCard>
  );
};

export default RegisterPage;
