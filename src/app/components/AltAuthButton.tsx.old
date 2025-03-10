"use client";

import { auth0 } from "@/lib/auth0";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

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
      const session = await auth0.getSession();
      setSession(session as SessionData | null);
    };

    getSession();
  }, []);

  if (!session) {
    return (
      <main>
        <button className="auth-button" onClick={() => router.push('/api/auth/login?screen_hint=signup')}>Login</button>
      </main>
    );
  }

  return (
    <main>
      <h1>Welcome, {session.user.name}!</h1>
      <form action="/api/auth/logout" method="post">
        <button className="auth-button" type="submit">Logout</button>
      </form>
    </main>
  );
}
