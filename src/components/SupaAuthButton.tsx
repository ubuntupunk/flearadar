"use client";

import { useAuthStore } from "@/lib/store/use-auth-store";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const SupaAuthButton = () => {
  const { isLoading } = useAuthStore();
  const router = useRouter();
  const { user } = useAuthStore();

  const handleSignIn = () => {
    if (!user) {
      router.push("/auth/register");
    } else {
      // User is already logged in, maybe redirect to dashboard or profile page
      router.push("/dashboard"); 
    }
  };

  return (
    <Button variant="red" onClick={handleSignIn} disabled={isLoading}>
      {isLoading ? "Signing in..." : "Sign In with Supabase"}
    </Button>
  );
};

export default SupaAuthButton;
