// src/lib/providers/auth-provider.tsx
"use client";

import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const supabaseClient = createClientComponentClient();

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      {children}
    </SessionContextProvider>
  );
}
