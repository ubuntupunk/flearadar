'use client';

import { useEffect } from 'react';
import { loginWithRedirect } from "@/lib/auth0";
import { useRouter } from 'next/navigation';

export default function LoginRedirect() {
  const router = useRouter();

  useEffect(() => {
    const handleLogin = async () => {
      await loginWithRedirect();
      router.push('/');
    };

    handleLogin();
  }, [router]);

  return <p>Redirecting to login...</p>;
}
