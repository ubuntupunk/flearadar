'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { createClient, User as SupabaseUser, AuthChangeEvent, Session } from '@supabase/supabase-js'
import type { Database } from '@/lib/types/database'

// Use the view type that includes all profile data
type ProfileFullDetails = Database['public']['Views']['profile_full_details']['Row']

type AuthContextType = {
  user: SupabaseUser | null
  userProfile: ProfileFullDetails | null
  loading: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null,
  loading: true,
  isAuthenticated: false,
})

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [userProfile, setUserProfile] = useState<ProfileFullDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Helper function to fetch complete user profile
    const fetchUserProfile = async (userId: string): Promise<ProfileFullDetails | null> => {
      try {
        const { data, error } = await supabase
          .from('profile_full_details')
          .select('*')
          .eq('id', userId)
          .single()

        if (error) {
          console.error('Error fetching profile:', error.message)
          return null
        }

        return data
      } catch (error) {
        console.error('Error in fetchUserProfile:', error)
        return null
      }
    }

    // Initial user fetch
    const fetchUser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser()
        
        if (error) {
          throw error
        }

        setUser(user)
        setIsAuthenticated(!!user)

        if (user) {
          const profile = await fetchUserProfile(user.id)
          setUserProfile(profile)
        }
      } catch (error) {
        console.error('Error in fetchUser:', error)
        setUser(null)
        setUserProfile(null)
        setIsAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }

    // Execute initial fetch
    fetchUser()

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        const currentUser = session?.user ?? null
        
        try {
          switch (event) {
            case 'SIGNED_IN':
              setUser(currentUser)
              setIsAuthenticated(true)
              if (currentUser) {
                const profile = await fetchUserProfile(currentUser.id)
                setUserProfile(profile)
              }
              break

            case 'SIGNED_OUT':
              setUser(null)
              setUserProfile(null)
              setIsAuthenticated(false)
              break

            case 'TOKEN_REFRESHED':
              setUser(currentUser)
              break

            case 'USER_UPDATED':
              setUser(currentUser)
              if (currentUser) {
                const profile = await fetchUserProfile(currentUser.id)
                setUserProfile(profile)
              }
              break

            case 'PASSWORD_RECOVERY':
            case 'MFA_CHALLENGE_VERIFIED':
              // Handle these cases if needed
              break

            default:
              // Handle any other auth events
              if (currentUser) {
                setUser(currentUser)
                setIsAuthenticated(true)
                const profile = await fetchUserProfile(currentUser.id)
                setUserProfile(profile)
              } else {
                setUser(null)
                setUserProfile(null)
                setIsAuthenticated(false)
              }
          }
        } catch (error) {
          console.error(`Error handling auth event ${event}:`, error)
        } finally {
          setLoading(false)
        }
      }
    )

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider 
      value={{
        user,
        userProfile,
        loading,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Optional: Export a hook for just the profile data
export const useProfile = () => {
  const { userProfile, loading } = useAuth()
  return { profile: userProfile, loading }
}

// Optional: Export a hook for authentication status
export const useAuthentication = () => {
  const { isAuthenticated, loading } = useAuth()
  return { isAuthenticated, loading }
}
