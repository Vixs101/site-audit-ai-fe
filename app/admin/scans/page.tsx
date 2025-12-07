"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAdminAuth } from "@/contexts/admin-auth-context";
import {
  Globe,
  Search,
  Bell,
  Filter,
  Download,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Activity,
  CheckCircle2,
  XCircle,
  Eye,
  MoreHorizontal,
  Calendar,
  ArrowUpDown,
  RefreshCw,
  ExternalLink,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Extended mock data for scans
const allScans = [
  {
    id: 1,
    url: "fashionsense.web",
    score: 72,
    status: "completed",
    user: "john@example.com",
    time: "2 min ago",
    date: "Dec 5, 2025",
    issues: 3,
    device: "Desktop",
  },
  {
    id: 2,
    url: "techstartup.io",
    score: 45,
    status: "completed",
    user: "sarah@startup.co",
    time: "5 min ago",
    date: "Dec 5, 2025",
    issues: 7,
    device: "Mobile",
  },
  {
    id: 3,
    url: "localshop.com",
    score: 0,
    status: "failed",
    user: "mike@local.com",
    time: "8 min ago",
    date: "Dec 5, 2025",
    issues: 0,
    device: "Desktop",
  },
  {
    id: 4,
    url: "portfolio.dev",
    score: 88,
    status: "completed",
    user: "emma@dev.io",
    time: "12 min ago",
    date: "Dec 5, 2025",
    issues: 1,
    device: "Desktop",
  },
  {
    id: 5,
    url: "restaurant.biz",
    score: 0,
    status: "scanning",
    user: "chef@food.co",
    time: "now",
    date: "Dec 5, 2025",
    issues: 0,
    device: "Mobile",
  },
  {
    id: 6,
    url: "fitness-app.com",
    score: 65,
    status: "completed",
    user: "trainer@gym.io",
    time: "25 min ago",
    date: "Dec 5, 2025",
    issues: 4,
    device: "Desktop",
  },
  {
    id: 7,
    url: "bookstore.online",
    score: 91,
    status: "completed",
    user: "reader@books.co",
    time: "32 min ago",
    date: "Dec 5, 2025",
    issues: 1,
    device: "Mobile",
  },
  {
    id: 8,
    url: "travel-blog.net",
    score: 38,
    status: "completed",
    user: "explorer@travel.io",
    time: "45 min ago",
    date: "Dec 5, 2025",
    issues: 9,
    device: "Desktop",
  },
  {
    id: 9,
    url: "music-stream.app",
    score: 0,
    status: "failed",
    user: "dj@music.co",
    time: "1 hr ago",
    date: "Dec 5, 2025",
    issues: 0,
    device: "Mobile",
  },
  {
    id: 10,
    url: "ecommerce-plus.com",
    score: 78,
    status: "completed",
    user: "seller@shop.io",
    time: "1.5 hr ago",
    date: "Dec 5, 2025",
    issues: 2,
    device: "Desktop",
  },
  {
    id: 11,
    url: "gaming-hub.gg",
    score: 55,
    status: "completed",
    user: "gamer@play.co",
    time: "2 hr ago",
    date: "Dec 4, 2025",
    issues: 5,
    device: "Desktop",
  },
  {
    id: 12,
    url: "news-daily.com",
    score: 82,
    status: "completed",
    user: "editor@news.io",
    time: "3 hr ago",
    date: "Dec 4, 2025",
    issues: 2,
    device: "Mobile",
  },
];

// Status filter options
const statusFilters = ["All", "Completed", "Scanning", "Failed"];

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

// Score Badge Component
function ScoreBadge({ score, status }: { score: number; status: string }) {
  if (status === "scanning") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
        Scanning
      </span>
    );
  }
  if (status === "failed") {
    return (
      <span className="px-2.5 py-1 rounded-full bg-red-100 text-red-700 text-sm font-medium">
        Failed
      </span>
    );
  }

  const color = score >= 70 ? "green" : score >= 50 ? "amber" : "red";
  const bgColor = {
    green: "bg-green-100",
    amber: "bg-amber-100",
    red: "bg-red-100",
  }[color];
  const textColor = {
    green: "text-green-700",
    amber: "text-amber-700",
    red: "text-red-700",
  }[color];

  return (
    <span
      className={cn(
        "px-2.5 py-1 rounded-full text-sm font-semibold",
        bgColor,
        textColor
      )}
    >
      {score}/100
    </span>
  );
}

export default function AdminScansPage() {
  const { user } = useAdminAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedScans, setSelectedScans] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter scans
  const filteredScans = allScans.filter((scan) => {
    const matchesSearch =
      scan.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scan.user.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "All" ||
      scan.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredScans.length / itemsPerPage);
  const paginatedScans = filteredScans.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Select all toggle
  const toggleSelectAll = () => {
    if (
      selectedScans.length === paginatedScans.length &&
      paginatedScans.length > 0
    ) {
      setSelectedScans([]);
    } else {
      setSelectedScans(paginatedScans.map((s) => s.id));
    }
  };

  // Toggle single selection
  const toggleSelect = (id: number) => {
    setSelectedScans((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Floating decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 -left-20 w-96 h-96 rounded-full bg-[#FF5A3D]/5 blur-3xl animate-pulse" />
        <div className="absolute top-60 -right-32 w-80 h-80 rounded-full bg-green-500/5 blur-3xl animate-pulse delay-500" />
        <div className="absolute bottom-40 left-1/3 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl animate-pulse delay-1000" />

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
      </div>

      <main className="container mx-auto px-4 py-8 relative z-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6 animate-in fade-in slide-in-from-left-4">
          <Link
            href="/admin"
            className="hover:text-foreground transition-colors"
          >
            Dashboard
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium">All Scans</span>
        </div>

        {/* Page Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="animate-in fade-in slide-in-from-left-4">
            <h1 className="text-3xl font-bold mb-1">Website Scans</h1>
            <p className="text-muted-foreground">
              View and manage all website audits
            </p>
          </div>

          <div className="flex items-center gap-3 animate-in fade-in slide-in-from-right-4">
            <Button
              variant="outline"
              className="gap-2 rounded-lg bg-transparent"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </Button>
            <Button className="bg-[#FF5A3D] hover:bg-[#FF5A3D]/90 text-white rounded-lg gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "Total Scans",
              value: "12,453",
              change: "+23.1%",
              color: "#FF5A3D",
            },
            {
              label: "Completed",
              value: "11,892",
              change: "+18.4%",
              color: "#22c55e",
            },
            {
              label: "In Progress",
              value: "23",
              change: "Live",
              color: "#3b82f6",
            },
            {
              label: "Failed",
              value: "538",
              change: "-12.3%",
              color: "#ef4444",
            },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="bg-card rounded-xl border border-border p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 animate-in fade-in slide-in-from-bottom-4"
              style={{
                animationDelay: `${i * 100}ms`,
                animationFillMode: "both",
              }}
            >
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <div className="flex items-end justify-between">
                <p className="text-2xl font-bold">{stat.value}</p>
                <span
                  className="text-xs font-medium px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: `${stat.color}15`,
                    color: stat.color,
                  }}
                >
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Filters & Search */}
        <div
          className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4"
          style={{ animationDelay: "200ms" }}
        >
          <div className="p-4 border-b border-border">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by URL or user email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5A3D]/20 focus:border-[#FF5A3D] transition-all"
                />
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2">
                {statusFilters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setStatusFilter(filter)}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                      statusFilter === filter
                        ? "bg-[#FF5A3D] text-white"
                        : "bg-muted hover:bg-muted/80 text-muted-foreground"
                    )}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              {/* More Filters */}
              <Button
                variant="outline"
                className="gap-2 rounded-lg bg-transparent"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4" />
                More Filters
                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-transform",
                    showFilters && "rotate-180"
                  )}
                />
              </Button>
            </div>

            {/* Extended Filters */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t border-border grid grid-cols-1 md:grid-cols-3 gap-4 animate-in fade-in slide-in-from-top-2">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Date Range
                  </label>
                  <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg border border-border bg-background text-sm hover:bg-muted transition-colors">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      Last 7 days
                    </span>
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Score Range
                  </label>
                  <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg border border-border bg-background text-sm hover:bg-muted transition-colors">
                    <span>All Scores</span>
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Device
                  </label>
                  <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg border border-border bg-background text-sm hover:bg-muted transition-colors">
                    <span>All Devices</span>
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Bulk Actions */}
          {selectedScans.length > 0 && (
            <div className="px-4 py-3 bg-[#FF5A3D]/5 border-b border-[#FF5A3D]/10 flex items-center gap-4 animate-in fade-in slide-in-from-top-2">
              <span className="text-sm font-medium text-[#FF5A3D]">
                {selectedScans.length} selected
              </span>
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 text-xs h-8 bg-transparent"
              >
                <Download className="w-3.5 h-3.5" />
                Export Selected
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 text-xs h-8 text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete
              </Button>
            </div>
          )}

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="p-4 text-left">
                    <input
                      type="checkbox"
                      checked={
                        selectedScans.length === paginatedScans.length &&
                        paginatedScans.length > 0
                      }
                      onChange={toggleSelectAll}
                      className="w-4 h-4 rounded border-border text-[#FF5A3D] focus:ring-[#FF5A3D]"
                    />
                  </th>
                  <th className="p-4 text-left">
                    <button className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                      Status
                      <ArrowUpDown className="w-3.5 h-3.5" />
                    </button>
                  </th>
                  <th className="p-4 text-left">
                    <button className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                      Website URL
                      <ArrowUpDown className="w-3.5 h-3.5" />
                    </button>
                  </th>
                  <th className="p-4 text-left">
                    <button className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                      Score
                      <ArrowUpDown className="w-3.5 h-3.5" />
                    </button>
                  </th>
                  <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                    Issues
                  </th>
                  <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                    User
                  </th>
                  <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                    Device
                  </th>
                  <th className="p-4 text-left">
                    <button className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                      Time
                      <ArrowUpDown className="w-3.5 h-3.5" />
                    </button>
                  </th>
                  <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedScans.map((scan, i) => (
                  <tr
                    key={scan.id}
                    className={cn(
                      "border-b border-border hover:bg-muted/50 transition-colors animate-in fade-in slide-in-from-left-4",
                      selectedScans.includes(scan.id) && "bg-[#FF5A3D]/5"
                    )}
                    style={{
                      animationDelay: `${i * 30}ms`,
                      animationFillMode: "both",
                    }}
                  >
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedScans.includes(scan.id)}
                        onChange={() => toggleSelect(scan.id)}
                        className="w-4 h-4 rounded border-border text-[#FF5A3D] focus:ring-[#FF5A3D]"
                      />
                    </td>
                    <td className="p-4">
                      <ScanStatusIcon status={scan.status} score={scan.score} />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{scan.url}</span>
                        <a
                          href={`https://${scan.url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <ExternalLink className="w-3.5 h-3.5 text-muted-foreground hover:text-[#FF5A3D]" />
                        </a>
                      </div>
                    </td>
                    <td className="p-4">
                      <ScoreBadge score={scan.score} status={scan.status} />
                    </td>
                    <td className="p-4">
                      {scan.status === "completed" && (
                        <span
                          className={cn(
                            "font-medium",
                            scan.issues > 5
                              ? "text-red-600"
                              : scan.issues > 2
                                ? "text-amber-600"
                                : "text-green-600"
                          )}
                        >
                          {scan.issues} issues
                        </span>
                      )}
                      {scan.status !== "completed" && (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-muted-foreground">
                        {scan.user}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm px-2 py-1 rounded-full bg-muted">
                        {scan.device}
                      </span>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="text-sm">{scan.time}</p>
                        <p className="text-xs text-muted-foreground">
                          {scan.date}
                        </p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        <button
                          className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4 text-muted-foreground hover:text-[#FF5A3D]" />
                        </button>
                        <button
                          className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                          title="More Options"
                        >
                          <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-4 border-t border-border flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, filteredScans.length)} of{" "}
              {filteredScans.length} scans
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={cn(
                        "w-8 h-8 rounded-lg text-sm font-medium transition-colors",
                        currentPage === page
                          ? "bg-[#FF5A3D] text-white"
                          : "hover:bg-muted text-muted-foreground"
                      )}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="gap-1"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
