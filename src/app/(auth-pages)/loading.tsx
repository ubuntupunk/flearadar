// src/app/(auth-pages)/loading.tsx
import { Loader } from "lucide-react"

export default function AuthLoading() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Loader className="h-8 w-8 animate-spin" />
    </div>
  )
}
