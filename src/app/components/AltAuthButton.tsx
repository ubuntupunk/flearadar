"use client";

import { loginWithRedirect, logout } from '@/lib/auth0';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Auth0Client } from '@auth0/nextjs-auth0/server';

interface SessionData {
  user: {
    name: string;
  };
}

export default function AltAuthButton() {
  const [session, setSession] = useState<SessionData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      const session = await Auth0Client.getSession();
      setSession(session as SessionData | null);
    };

    getSession();
  }, []);

  const handleLogin = async () => {
    try {
      await loginWithRedirect();
      router.push('/'); // Redirect to home page after successful login
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