"use client";

import type React from "react";
import { usePathname } from "next/navigation";
import { useAdminAuth } from "@/contexts/admin-auth-context";
import {
  Globe,
  LogOut,
  LayoutDashboard,
  ScanLine,
  Mail,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const sidebarLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/scans", label: "Scans", icon: ScanLine },
  { href: "/admin/leads", label: "Leads", icon: Mail },
];

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { user, isLoading, logout } = useAdminAuth();
  const pathname = usePathname();

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[#FF5A3D] flex items-center justify-center animate-pulse">
            <Globe className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    );
  }

  // Login page doesn't need the sidebar layout
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Not authenticated - will redirect via context
  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#FF5A3D]/30 border-t-[#FF5A3D] rounded-full animate-spin" />
      </div>
    );
  }

  // Authenticated - show sidebar layout
  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border shrink-0 hidden lg:flex flex-col pt-2">
        {/* Navigation */}
        <nav className="flex-1 ml-4 sm:ml-8 md:ml-10 px-2 space-y-2">
          {sidebarLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/admin" && pathname?.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group",
                  isActive
                    ? "bg-[#FF5A3D] text-white shadow-lg shadow-[#FF5A3D]/20"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <link.icon className="w-5 h-5" />
                {link.label}
                {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 min-w-0 lg:pr-10">{children}</div>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayoutContent>{children}</AdminLayoutContent>;
}
