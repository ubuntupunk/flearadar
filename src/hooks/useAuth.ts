// src/hooks/useAuth.ts
import { useAuthStore as useAuthStoreLib } from "@/lib/store/use-auth-store";
import { useAuth as useAuthContext } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import type { LoginFormData } from "@/lib/validations/auth";
import type { User } from '@supabase/supabase-js';


export function useAuthStore(): {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (data: LoginFormData) => Promise<void>;
    register: () => Promise<void>;
    resetPassword: () => Promise<void>;
    signOut: () => Promise<void>;
  } {
  const { setUser, setLoading, isLoading, user } = useAuthStoreLib();
  const authContext = useAuthContext();
  const router = useRouter();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Supabase URL or anon key not found in environment variables.");
    return {
      user: authContext.user,
      isLoading: authContext.loading,
      isAuthenticated: authContext.isAuthenticated,
      login: async () => {},
      register: async () => {},
      resetPassword: async () => {},
      signOut: async () => {},
    };
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  async function login(data: LoginFormData) {
    try {
      setLoading(true);
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) throw error;

      setUser(authData.user);
      toast.success("You have successfully logged in.");
      router.push("/dashboard");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to login";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  async function register(): Promise<void> { // Placeholder, will be implemented in use-auth-register.ts
    throw new Error("Not implemented. Use useAuthRegister hook instead.");
  }

  async function resetPassword(): Promise<void> { // Placeholder, will be implemented in use-auth-reset.ts
    throw new Error("Not implemented. Use useAuthReset hook instead.");
  }

  async function signOut() {
    try {
      await supabase.auth.signOut();
      setUser(null);
      router.push("/auth/login");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to sign out";
      toast.error(errorMessage);
    }
  }

  return {
    user: authContext.user,
    isLoading: authContext.loading,
    isAuthenticated: authContext.isAuthenticated,
    login,
    register,
    resetPassword,
    signOut,
  };
}
