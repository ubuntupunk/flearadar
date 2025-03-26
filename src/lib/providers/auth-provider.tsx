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
   const {
     data: { subscription },
   } = supabaseClient.auth.onAuthStateChange((event, session) => {
     if (session) {
       setUser(session.user);
     } else {
       setUser(null);
     }
     setLoading(false);
   });
 
   // Initial session check
   supabaseClient.auth.getSession().then(({ data: { session } }) => {
     if (session) {
       setUser(session.user);
     }
     setLoading(false);
   });
 
   return () => {
     subscription.unsubscribe();
   };
 }, [supabaseClient, setLoading, setUser]);
  
  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      {children}
    </SessionContextProvider>
  );
}
