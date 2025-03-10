"use client";

import { loginWithRedirect, logout, getSession } from '@/lib/auth0';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { cookies } from 'next/headers';

interface SessionData {
  user: {
    name: string;
  };
}

export default function AltAuthButton() {
  const [session, setSession] = useState<SessionData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setSession(session as SessionData | null);
    };

    fetchSession();
  }, []);

  const handleLogin = async () => {
    try {
      document.cookie = 'loginInitiated=true; path=/';
      await loginWithRedirect();
      router.push('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/'); // Redirect to home page after logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (!session) {
    return (
      <main>
        <button className="auth-button" onClick={handleLogin}>
          Login
        </button>
      </main>
    );
  }

  return (
    <main>
      <p>Welcome, {session.user.name}!</p>
      <button className="auth-button" onClick={handleLogout}>
        Logout
      </button>
    </main>
  );
}
