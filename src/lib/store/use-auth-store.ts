// src/lib/stores/use-auth-store.ts
import { Session, User } from '@supabase/supabase-js'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { createClient } from "@supabase/supabase-js"
import { toast } from "sonner"
import type { LoginFormData } from "@/lib/validations/auth"

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  sessionExpiry: number | null 
}

interface AuthActions {
  setUser: (user: User | null) => void
  setLoading: (isLoading: boolean) => void
  setSessionExpiry: (expiry: number | null) => void
  clearSession: () => void
  setUserFromSession: (session: Session | null) => void
  login: (data: LoginFormData) => Promise<void>
  logout: () => Promise<void>
}

type AuthStore = AuthState & AuthActions

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // State
      user: null,
      isLoading: false,
      sessionExpiry: null,
      isAuthenticated: false,

      // Basic state setters
      setUser: (user) => set({ 
        user,
        isAuthenticated: !!user 
      }),
      setLoading: (isLoading) => set({ isLoading }),
      setSessionExpiry: (expiry) => set({ sessionExpiry: expiry }),
      
      // Session management
      clearSession: () => set({ 
        user: null, 
        sessionExpiry: null,
        isAuthenticated: false 
      }),
      
      setUserFromSession: (session: Session | null) => {
        if (session?.user) {
          set({ 
            user: session.user,
            isAuthenticated: true,
            sessionExpiry: new Date(session.expires_at!).getTime()
          });
        } else {
          set({ 
            user: null,
            isAuthenticated: false,
            sessionExpiry: null 
          });
        }
      },

      // Auth actions
      login: async (data) => {
        try {
          set({ isLoading: true });
          const { data: authData, error } = await supabase.auth.signInWithPassword({
            email: data.email,
            password: data.password,
          });

          if (error) throw error;

          set({ 
            user: authData.user,
            isAuthenticated: !!authData.user,
            sessionExpiry: authData.session ? new Date(authData.session.expires_at!).getTime() : null
          });
          
          toast.success("Successfully logged in");
        } catch (error: unknown) {
          const errorMessage = error instanceof Error ? error.message : "Failed to login";
          toast.error(errorMessage);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      logout: async () => {
        try {
          set({ isLoading: true });
          const { error } = await supabase.auth.signOut();
          
          if (error) throw error;

          get().clearSession();
          toast.success("Successfully logged out");
        } catch (error: unknown) {
          const errorMessage = error instanceof Error ? error.message : "Failed to logout";
          toast.error(errorMessage);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        user: state.user,
        sessionExpiry: state.sessionExpiry,
      }),
    }
  )
)
