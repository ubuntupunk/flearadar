// src/app/(auth-pages)/register-success/page.tsx
"use client";

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const RegisterSuccessPage = () => {
  const router = useRouter();

  return (
    <Card className="p-6">
      <h1 className="text-2xl font-bold text-center mb-4">
        Registration Successful!
      </h1>
      <p className="text-center mb-6">
        Please check your email to verify your account.
      </p>
      <div className="flex justify-center">
        <Button 
          onClick={() => router.push('/(auth-pages)/login')}
          className="w-full"
        >
          Go to Login
        </Button>
      </div>
    </Card>
  );
};

export default RegisterSuccessPage;
