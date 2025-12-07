"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

interface AdminUser {
  email: string;
  name: string;
  role: "super_admin" | "admin";
}

interface AdminAuthContextType {
  user: AdminUser | null;
  isLoading: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(
  undefined
);

// Demo credentials - in production, this would be validated against a database
const DEMO_CREDENTIALS = {
  email: "admin@sitelytics.app",
  password: "admin123",
  user: {
    email: "admin@sitelytics.app",
    name: "Super Admin",
    role: "super_admin" as const,
  },
};

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = () => {
      const storedUser = localStorage.getItem("sitelytics_admin_user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch {
          localStorage.removeItem("sitelytics_admin_user");
        }
      }
      setIsLoading(false);
    };
    checkSession();
  }, []);

  // Redirect logic
  useEffect(() => {
    if (isLoading) return;

    const isLoginPage = pathname === "/admin/login";
    const isAdminRoute = pathname?.startsWith("/admin");

    if (!user && isAdminRoute && !isLoginPage) {
      router.push("/admin/login");
    } else if (user && isLoginPage) {
      router.push("/admin");
    }
  }, [user, isLoading, pathname, router]);

  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (
      email === DEMO_CREDENTIALS.email &&
      password === DEMO_CREDENTIALS.password
    ) {
      setUser(DEMO_CREDENTIALS.user);
      localStorage.setItem(
        "sitelytics_admin_user",
        JSON.stringify(DEMO_CREDENTIALS.user)
      );
      return { success: true };
    }

    return { success: false, error: "Invalid email or password" };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("sitelytics_admin_user");
    router.push("/admin/login");
  };

  return (
    <AdminAuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
}
