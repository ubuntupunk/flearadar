// src/lib/providers/auth-provider.tsx
"use client";

import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect } from 'react';
import { useAuthStore } from '@/lib/store/use-auth-store';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const supabaseClient = createClientComponentClient();
  const { setLoading, setUser } = useAuthStore();

  useEffect(() => {
    async function loadSession() {
      const { data: { user } } = await supabaseClient.auth.getUser();
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    }
    loadSession();
  }, [supabaseClient, setLoading, setUser]);

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      {children}
    </SessionContextProvider>
  );
}
