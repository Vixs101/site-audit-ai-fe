"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Users,
  ScanLine,
  Mail,
  TrendingUp,
  ArrowUpRight,
  MoreHorizontal,
  Download,
  ChevronDown,
  Activity,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { StatCard } from "@/components/admin/statCard";
import { MiniBarChart } from "@/components/admin/miniBarChart";
import { weeklyData } from "@/components/admin/miniBarChart";

// Mock data for the admin dashboard
const statsData = [
  {
    title: "Total Leads",
    value: 2847,
    change: +12.5,
    icon: Mail,
    color: "#FF5A3D",
  },
  {
    title: "Active Users",
    value: 8234,
    change: +8.2,
    icon: Users,
    color: "#22c55e",
  },
  {
    title: "Websites Scanned",
    value: 12453,
    change: +23.1,
    icon: ScanLine,
    color: "#3b82f6",
  },
  {
    title: "Conversion Rate",
    value: "3.2%",
    change: -2.4,
    icon: TrendingUp,
    color: "#f59e0b",
  },
];

const recentScans = [
  {
    id: 1,
    url: "fashionsense.web",
    score: 72,
    status: "completed",
    user: "john@example.com",
    time: "2 min ago",
  },
  {
    id: 2,
    url: "techstartup.io",
    score: 45,
    status: "completed",
    user: "sarah@startup.co",
    time: "5 min ago",
  },
  {
    id: 3,
    url: "localshop.com",
    score: 0,
    status: "failed",
    user: "mike@local.com",
    time: "8 min ago",
  },
  {
    id: 4,
    url: "portfolio.dev",
    score: 88,
    status: "completed",
    user: "emma@dev.io",
    time: "12 min ago",
  },
  {
    id: 5,
    url: "restaurant.biz",
    score: 0,
    status: "scanning",
    user: "chef@food.co",
    time: "now",
  },
];

const recentLeads = [
  {
    id: 1,
    email: "mark@business.com",
    source: "Scan Results",
    date: "Dec 5, 2025",
    status: "new",
  },
  {
    id: 2,
    email: "lisa@agency.io",
    source: "Expert Review CTA",
    date: "Dec 5, 2025",
    status: "contacted",
  },
  {
    id: 3,
    email: "david@shop.com",
    source: "Scan Results",
    date: "Dec 4, 2025",
    status: "converted",
  },
  {
    id: 4,
    email: "anna@startup.co",
    source: "Newsletter",
    date: "Dec 4, 2025",
    status: "new",
  },
  {
    id: 5,
    email: "james@tech.io",
    source: "Expert Review CTA",
    date: "Dec 3, 2025",
    status: "contacted",
  },
];

// Lead Status Badge
function LeadStatusBadge({ status }: { status: string }) {
  const styles =
    {
      new: "bg-blue-100 text-blue-700",
      contacted: "bg-amber-100 text-amber-700",
      converted: "bg-green-100 text-green-700",
    }[status] || "bg-gray-100 text-gray-700";

  return (
    <span
      className={cn(
        "px-2 py-1 rounded-full text-xs font-medium capitalize",
        styles
      )}
    >
      {status}
    </span>
  );
}

// Scan Status Icon
function ScanStatusIcon({ status, score }: { status: string; score: number }) {
  if (status === "scanning") {
    return <Activity className="w-4 h-4 text-blue-500 animate-pulse" />;
  }
  if (status === "failed") {
    return <XCircle className="w-4 h-4 text-red-500" />;
  }
  if (score >= 70) {
    return <CheckCircle2 className="w-4 h-4 text-green-500" />;
  }
  if (score >= 50) {
    return <CheckCircle2 className="w-4 h-4 text-amber-500" />;
  }
  return <CheckCircle2 className="w-4 h-4 text-red-500" />;
}

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTimeRange, setSelectedTimeRange] = useState("7d");

  return (
    <div className="min-h-screen bg-background relative overflow-hidden max-w-[1344px] mx-auto pb-8">
      {/* Floating decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 -left-20 w-96 h-96 rounded-full bg-[#FF5A3D]/5 blur-3xl animate-pulse" />
        <div className="absolute top-60 -right-32 w-80 h-80 rounded-full bg-green-500/5 blur-3xl animate-pulse delay-500" />
        <div className="absolute bottom-40 left-1/3 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl animate-pulse delay-1000" />

        {/* Small floating dots */}
        <div
          className="absolute top-32 left-[10%] w-2 h-2 rounded-full bg-[#FF5A3D]/30 animate-bounce"
          style={{ animationDuration: "3s" }}
        />
        <div
          className="absolute top-48 right-[15%] w-3 h-3 rounded-full bg-green-500/30 animate-bounce delay-300"
          style={{ animationDuration: "3.5s" }}
        />
        <div
          className="absolute bottom-32 left-[20%] w-2 h-2 rounded-full bg-blue-500/30 animate-bounce delay-700"
          style={{ animationDuration: "4s" }}
        />
        <div
          className="absolute top-72 left-[60%] w-2 h-2 rounded-full bg-[#FF5A3D]/20 animate-bounce delay-500"
          style={{ animationDuration: "3.2s" }}
        />

        {/* Decorative rings */}
        <div
          className="absolute top-1/4 right-[10%] w-20 h-20 rounded-full border border-[#FF5A3D]/10 animate-spin"
          style={{ animationDuration: "20s" }}
        />
        <div
          className="absolute bottom-1/4 left-[5%] w-32 h-32 rounded-full border border-green-500/10 animate-spin"
          style={{ animationDuration: "25s", animationDirection: "reverse" }}
        />
      </div>

      <main className="container mx-auto px-4 py-8 relative z-10">
        {/* Page Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">Dashboard Overview</h1>
            <p className="text-muted-foreground">
              Welcome back! Here&apos;s what&apos;s happening with Sitelytics.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Time Range Selector */}
            <div className="relative">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card hover:bg-muted transition-colors text-sm font-medium cursor-pointer">
                Last{" "}
                {selectedTimeRange === "7d"
                  ? "7 days"
                  : selectedTimeRange === "30d"
                    ? "30 days"
                    : "90 days"}
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            <Button className="bg-[#FF5A3D] hover:bg-[#FF5A3D]/90 text-white rounded-lg gap-2 cursor-pointer">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statsData.map((stat, i) => (
            <StatCard key={stat.title} {...stat} delay={i * 100} />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Weekly Activity Chart */}
          <div className="lg:col-span-2 bg-card rounded-2xl border border-border p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold mb-1">Weekly Activity</h2>
                <p className="text-sm text-muted-foreground">
                  Scans per day this week
                </p>
              </div>
              <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            <MiniBarChart data={weeklyData} />
            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF5A3D]" />
                  <span className="text-sm text-muted-foreground">Scans</span>
                </div>
              </div>
              <span className="text-sm font-medium text-green-600">
                +18.2% vs last week
              </span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-6">Real-time Activity</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 rounded-xl bg-green-50 border border-green-100 animate-in fade-in slide-in-from-right-4">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-green-900">Active Scans</p>
                  <p className="text-sm text-green-700">
                    23 websites scanning now
                  </p>
                </div>
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              </div>

              <div className="flex items-center gap-4 p-3 rounded-xl bg-blue-50 border border-blue-100 animate-in fade-in slide-in-from-right-4 delay-100">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-blue-900">Online Users</p>
                  <p className="text-sm text-blue-700">156 users active</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3 rounded-xl bg-amber-50 border border-amber-100 animate-in fade-in slide-in-from-right-4 delay-200">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-amber-900">Avg. Scan Time</p>
                  <p className="text-sm text-amber-700">42 seconds</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3 rounded-xl bg-[#FF5A3D]/5 border border-[#FF5A3D]/10 animate-in fade-in slide-in-from-right-4 delay-300">
                <div className="w-10 h-10 rounded-full bg-[#FF5A3D]/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-[#FF5A3D]" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-[#FF5A3D]">
                    Today&apos;s Leads
                  </p>
                  <p className="text-sm text-[#FF5A3D]/80">
                    47 new leads captured
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tables Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Scans */}
          <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold mb-1">Recent Scans</h2>
                <p className="text-sm text-muted-foreground">
                  Latest website audits
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href="/admin/scans"
                  className="text-[#FF5A3D] text-sm hover:underline font-medium flex items-center gap-1"
                >
                  View All <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="divide-y divide-border">
              {recentScans.map((scan, i) => (
                <div
                  key={scan.id}
                  className="p-4 flex items-center gap-4 hover:bg-muted/50 transition-colors animate-in fade-in slide-in-from-left-4"
                  style={{
                    animationDelay: `${i * 50}ms`,
                    animationFillMode: "both",
                  }}
                >
                  <ScanStatusIcon status={scan.status} score={scan.score} />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{scan.url}</p>
                    <p className="text-xs text-muted-foreground">{scan.user}</p>
                  </div>
                  <div className="text-right">
                    {scan.status === "completed" && (
                      <p
                        className={cn(
                          "font-semibold",
                          scan.score >= 70
                            ? "text-green-600"
                            : scan.score >= 50
                              ? "text-amber-600"
                              : "text-red-600"
                        )}
                      >
                        {scan.score}/100
                      </p>
                    )}
                    {scan.status === "scanning" && (
                      <p className="text-blue-600 text-sm font-medium">
                        Scanning...
                      </p>
                    )}
                    {scan.status === "failed" && (
                      <p className="text-red-600 text-sm font-medium">Failed</p>
                    )}
                    <p className="text-xs text-muted-foreground">{scan.time}</p>
                  </div>
                  <button className="p-1.5 rounded-lg hover:bg-muted transition-colors">
                    <Eye className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Leads */}
          <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold mb-1">Recent Leads</h2>
                <p className="text-sm text-muted-foreground">
                  New email captures
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href="/admin/leads"
                  className="text-[#FF5A3D] text-sm hover:underline font-medium flex items-center gap-1"
                >
                  View All <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="divide-y divide-border">
              {recentLeads.map((lead, i) => (
                <div
                  key={lead.id}
                  className="p-4 flex items-center gap-4 hover:bg-muted/50 transition-colors animate-in fade-in slide-in-from-right-4"
                  style={{
                    animationDelay: `${i * 50}ms`,
                    animationFillMode: "both",
                  }}
                >
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#FF5A3D]/20 to-[#FF5A3D]/5 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-[#FF5A3D]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{lead.email}</p>
                    <p className="text-xs text-muted-foreground">
                      {lead.source}
                    </p>
                  </div>
                  <div className="text-right">
                    <LeadStatusBadge status={lead.status} />
                    <p className="text-xs text-muted-foreground mt-1">
                      {lead.date}
                    </p>
                  </div>
                  <button className="p-1.5 rounded-lg hover:bg-muted transition-colors">
                    <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Score Distribution */}
        <div className="mt-6 bg-card rounded-2xl border border-border p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold mb-1">Score Distribution</h2>
              <p className="text-sm text-muted-foreground">
                How websites are performing
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-center">
              <div className="text-3xl font-bold text-red-600 mb-1">32%</div>
              <p className="text-sm text-red-700">Poor (0-49)</p>
              <p className="text-xs text-red-600/70 mt-1">3,985 websites</p>
            </div>
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-100 text-center">
              <div className="text-3xl font-bold text-amber-600 mb-1">41%</div>
              <p className="text-sm text-amber-700">Average (50-69)</p>
              <p className="text-xs text-amber-600/70 mt-1">5,106 websites</p>
            </div>
            <div className="p-4 rounded-xl bg-green-50 border border-green-100 text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">27%</div>
              <p className="text-sm text-green-700">Good (70-100)</p>
              <p className="text-xs text-green-600/70 mt-1">3,362 websites</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
