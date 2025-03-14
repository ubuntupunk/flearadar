// src/lib/stores/use-auth-store.ts
import { Session, User } from '@supabase/supabase-js'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface AuthState {
  user: User | null
  isLoading: boolean
  sessionExpiry: number | null
  setUser: (user: User | null) => void
  setLoading: (isLoading: boolean) => void
  setSessionExpiry: (expiry: number | null) => void
  clearSession: () => void
  logout: () => void // Add logout function
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: true,
      sessionExpiry: null,
      setUser: (user) => set({ user }),
      setLoading: (isLoading) => set({ isLoading }),
      setSessionExpiry: (expiry) => set({ sessionExpiry: expiry }),
      clearSession: () => set({ user: null, sessionExpiry: null }),
      logout: () => set({ user: null, sessionExpiry: null }),
      setUserFromSession: (session: Session | null) => {
        if (session?.user) {
          set({ user: session.user });
        } else {
          set({ user: null });
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
