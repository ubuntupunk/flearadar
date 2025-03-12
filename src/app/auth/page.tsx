"use client";

import React from 'react';
import { LoginForm } from "@/components/auth/login-form";
import { RegisterForm } from "@/components/auth/register-form";
import { AuthCard } from "@/components/ui/auth-card";

const AuthPage = () => {
  return (
    <div className="container flex justify-center items-center min-h-screen">
      <div className="space-y-6">
        <AuthCard title="Sign In" description="Sign in to your account">
          <LoginForm />
        </AuthCard>
        <AuthCard title="Register" description="Create a new account">
          <RegisterForm />
        </AuthCard>
      </div>
    </div>
  );
};

export default AuthPage;
