// src/hooks/useAuth.ts
import { useAuthStore } from "@/lib/store/use-auth-store"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from '@supabase/supabase-js'
import type { 
  LoginFormData, 
  RegisterFormData, 
  ResetPasswordFormData 
} from "@/lib/validations/auth"
import type { ProfileFormData } from "@/lib/validations/profile"
import { timeFormats } from '@/lib/utils/time-formats'
import type { Database } from "@/lib/types/database"

type ProfileWithUsername = Database['public']['Views']['profile_with_username']['Row']

export function useAuth() {
  const { setUser, setLoading, isLoading, user } = useAuthStore()
  const router = useRouter()
  const supabase = createClientComponentClient()
  
  // Login functionality from use-auth-login.ts
  async function login(data: LoginFormData) {
    try {
      setLoading(true)
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })

      if (error) throw error

      setUser(authData.user)
      toast.success("You have successfully logged in.")
      router.push("/dashboard")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to login")
    } finally {
      setLoading(false)
    }
  }

  // Register functionality from use-auth-register.ts
  async function register(data: RegisterFormData) {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
          }
        }
      })

      if (error) throw error

      toast.success("You have successfully registered.")
      router.push("/auth/register-success")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to register")
    } finally {
      setLoading(false)
    }
  }

  // Reset password functionality from use-auth-reset.ts
  async function resetPassword(data: ResetPasswordFormData) {
    try {
      setLoading(true)
      const { error } = await supabase.auth.resetPasswordForEmail(data.email)

      if (error) throw error

      toast.success("Check your email for the password reset link.")
      router.push("/auth/login")
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to send reset email"
      )
    } finally {
      setLoading(false)
    }
  }

  // Profile functionality from useProfile.ts
  const [profile, setProfile] = useState<ProfileWithUsername | null>(null)

  async function fetchProfile() {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single()

      if (error) throw error

      setProfile(data)
      await updateLastSeen()
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to fetch profile"
      )
      setProfile(null)
    }
  }

  async function updateProfile(data: ProfileFormData) {
    try {
      setLoading(true)
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', user?.id)

      if (error) throw error

      setProfile(prev => prev ? { ...prev, ...data } : null)
      toast.success("Profile updated successfully")
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update profile"
      )
    } finally {
      setLoading(false)
    }
  }

  async function updateLastSeen() {
    try {
      await supabase
        .from('profiles')
        .update({ last_seen_at: new Date().toISOString() })
        .eq('id', user?.id)
    } catch (error) {
      console.error('Error updating last seen:', error)
    }
  }

  // Utility functions
  const formatLastSeen = (date: string | null) => 
    timeFormats.formatRelativeTime(date)
    
  const isOnline = profile?.last_seen_at ? 
    timeFormats.getOnlineStatus(profile.last_seen_at) === "Online" : 
    false

  // Load profile on mount if user exists
  useEffect(() => {
    if (user) {
      fetchProfile()
    }
  }, [user])

  return {
    // Auth state
    user,
    profile,
    isLoading,
    isOnline,

    // Auth operations
    login,
    register,
    resetPassword,
    
    // Profile operations
    updateProfile,
    formatLastSeen,

    // Utility functions
    async signOut() {
      await supabase.auth.signOut()
      setUser(null)
      setProfile(null)
      router.push('/auth/login')
    }
  }
}
