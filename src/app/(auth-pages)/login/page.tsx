"use client";
import { Metadata } from 'next';
import { LoginForm } from '@/components/auth/LoginForm';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account',
};

export default function Login() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <LoginForm />
    </div>
  );
}
