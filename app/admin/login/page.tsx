"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { useAdminAuth } from "@/contexts/admin-auth-context";
import { Button } from "@/components/ui/button";
import {
  Globe,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
} from "lucide-react";

export default function AdminLoginPage() {
  const { login } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const result = await login(email, password);

    if (!result.success) {
      setError(result.error || "Login failed");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center p-4">
      {/* Floating decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 -left-20 w-96 h-96 rounded-full bg-[#FF5A3D]/5 blur-3xl animate-pulse" />
        <div className="absolute bottom-20 -right-32 w-80 h-80 rounded-full bg-green-500/5 blur-3xl animate-pulse delay-500" />
        <div className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl animate-pulse delay-1000" />

        {/* Small floating dots */}
        <div
          className="absolute top-32 left-[15%] w-2 h-2 rounded-full bg-[#FF5A3D]/30 animate-bounce"
          style={{ animationDuration: "3s" }}
        />
        <div
          className="absolute top-48 right-[20%] w-3 h-3 rounded-full bg-green-500/30 animate-bounce delay-300"
          style={{ animationDuration: "3.5s" }}
        />
        <div
          className="absolute bottom-32 left-[25%] w-2 h-2 rounded-full bg-blue-500/30 animate-bounce delay-700"
          style={{ animationDuration: "4s" }}
        />
        <div
          className="absolute top-72 right-[35%] w-2 h-2 rounded-full bg-[#FF5A3D]/20 animate-bounce delay-500"
          style={{ animationDuration: "3.2s" }}
        />

        {/* Decorative rings */}
        <div
          className="absolute top-1/4 right-[15%] w-20 h-20 rounded-full border border-[#FF5A3D]/10 animate-spin"
          style={{ animationDuration: "20s" }}
        />
        <div
          className="absolute bottom-1/4 left-[10%] w-32 h-32 rounded-full border border-green-500/10 animate-spin"
          style={{ animationDuration: "25s", animationDirection: "reverse" }}
        />

        {/* Plus signs */}
        <div className="absolute top-[20%] left-[8%] text-[#FF5A3D]/20 text-2xl font-light animate-pulse">
          +
        </div>
        <div className="absolute bottom-[30%] right-[12%] text-green-500/20 text-xl font-light animate-pulse delay-300">
          +
        </div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h1 className="text-2xl font-bold mb-2">Admin Login</h1>
          <p className="text-muted-foreground">
            Sign in to access the admin dashboard
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-card rounded-2xl border border-border p-8 shadow-lg animate-in fade-in slide-in-from-bottom-6 duration-500 delay-100">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error message */}
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            {/* Email field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@sitelytics.app"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#FF5A3D]/20 focus:border-[#FF5A3D] transition-all"
                />
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full pl-10 pr-12 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#FF5A3D]/20 focus:border-[#FF5A3D] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-muted transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <Eye className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember me & Forgot password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-border text-[#FF5A3D] focus:ring-[#FF5A3D]/20"
                />
                <span className="text-muted-foreground">Remember me</span>
              </label>
              <button
                type="button"
                className="text-[#FF5A3D] hover:underline font-medium"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="cursor-pointer w-full bg-[#FF5A3D] hover:bg-[#FF5A3D]/90 text-white py-6 rounded-xl text-base font-medium gap-2 transition-all hover:gap-3"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Back to home */}
        <p className="text-center mt-6 text-sm text-muted-foreground animate-in fade-in slide-in-from-bottom-8 duration-500 delay-200">
          <Link href="/" className="text-[#FF5A3D] hover:underline font-medium">
            Back to Sitelytics
          </Link>
        </p>
      </div>
    </div>
  );
}
