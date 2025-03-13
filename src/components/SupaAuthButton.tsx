"use client";

import { useAuthStore } from "@/lib/store/use-auth-store";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { logout as serverLogout } from "@/app/actions"; // Rename server logout to avoid confusion

const SupaAuthButton = () => {
  const { isLoading, logout: clientLogout, user } = useAuthStore(); // Get client logout from store
  const router = useRouter();

  const handleAuthAction = async () => {
    if (!user) {
      router.push("/auth");
    } else {
      await serverLogout(); // Call server-side logout
      console.log("Client logout initiated"); // Add console log here
      clientLogout(); // Call client-side logout to clear store
      window.location.href = "/"; // Full page reload to homepage
    }
  };

  return (
    <Button variant="red" onClick={handleAuthAction} disabled={isLoading}>
      {isLoading ? "Loading..." : user ? "Logout" : "Login/Register"}
    </Button>
  );
};

export default SupaAuthButton;
