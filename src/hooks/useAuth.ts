// src/hooks/useAuth.ts
import { useAuthStore } from "@/lib/store/use-auth-store"
import { useRouter } from "next/navigation"
import type { LoginFormData } from "@/lib/validations/auth"

export function useAuth() {
  const router = useRouter()
  const store = useAuthStore()

  const handleLogin = async (data: LoginFormData) => {
    await store.login(data)
    router.push("/dashboard")
  }

  const handleLogout = async () => {
    await store.logout()
    router.push("/auth/login")
  }

  return {
    ...store,
    login: handleLogin,
    logout: handleLogout,
  }
}
