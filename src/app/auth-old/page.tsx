"use client";

"use client";

import React, { useState } from 'react';
import { LoginForm } from "@/components/auth/login-form";
import { RegisterForm } from "@/components/auth/register-form";
import { AuthCard } from "@/components/ui/auth-card";
import { Button } from "@/components/ui/button";

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="container flex justify-center items-center min-h-screen">
      <div className="space-y-6">
        <AuthCard title={activeTab === "login" ? "Sign In" : "Register"} description={activeTab === "login" ? "Sign in to your account" : "Create a new account"}>
          <div className="flex space-x-2 mb-4">
            <Button variant={activeTab === "login" ? "default" : "secondary"} onClick={() => setActiveTab("login")}>
              Sign In
            </Button>
            <Button variant={activeTab === "register" ? "default" : "secondary"} onClick={() => setActiveTab("register")}>
              Register
            </Button>
          </div>
          {activeTab === "login" ? <LoginForm /> : <RegisterForm />}
        </AuthCard>
      </div>
    </div>
  );
};

export default AuthPage;
