"use client";
import { LoginForm } from '@/components/auth/LoginForm';

export default function Login() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <LoginForm />
    </div>
  );
}
