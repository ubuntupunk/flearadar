// src/hooks/use-auth-reset.ts
import { toast } from "sonner";
import { ResetPasswordFormData } from "@/lib/validations/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface UseAuthReset {
  isLoading: boolean;
  resetPassword: (data: ResetPasswordFormData) => Promise<void>;
}

export function useAuthReset(): UseAuthReset {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function resetPassword(data: ResetPasswordFormData) {
    try {
      setIsLoading(true);
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
      }

      toast.success("Check your email for the password reset link.");
      router.push("/auth/login");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to send reset email"
      );
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, resetPassword };
}
