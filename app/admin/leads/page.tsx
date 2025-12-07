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
  Mail,
  MoreHorizontal,
  Calendar,
  ArrowUpDown,
  RefreshCw,
  Trash2,
  Send,
  UserPlus,
  CheckCircle2,
  Clock,
  Star,
  Phone,
  MessageSquare,
  Copy,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Extended mock data for leads
const allLeads = [
  {
    id: 1,
    email: "mark@business.com",
    name: "Mark Johnson",
    source: "Scan Results",
    date: "Dec 5, 2025",
    time: "2:30 PM",
    status: "new",
    website: "business.com",
    score: 45,
    phone: "+1 555-0123",
  },
  {
    id: 2,
    email: "lisa@agency.io",
    name: "Lisa Chen",
    source: "Expert Review CTA",
    date: "Dec 5, 2025",
    time: "1:15 PM",
    status: "contacted",
    website: "agency.io",
    score: 62,
    phone: "+1 555-0456",
  },
  {
    id: 3,
    email: "david@shop.com",
    name: "David Smith",
    source: "Scan Results",
    date: "Dec 4, 2025",
    time: "4:45 PM",
    status: "converted",
    website: "shop.com",
    score: 38,
    phone: "+1 555-0789",
  },
  {
    id: 4,
    email: "anna@startup.co",
    name: "Anna Williams",
    source: "Newsletter",
    date: "Dec 4, 2025",
    time: "11:20 AM",
    status: "new",
    website: "startup.co",
    score: 71,
    phone: null,
  },
  {
    id: 5,
    email: "james@tech.io",
    name: "James Brown",
    source: "Expert Review CTA",
    date: "Dec 3, 2025",
    time: "9:00 AM",
    status: "contacted",
    website: "tech.io",
    score: 55,
    phone: "+1 555-1234",
  },
  {
    id: 6,
    email: "sarah@design.co",
    name: "Sarah Davis",
    source: "Scan Results",
    date: "Dec 3, 2025",
    time: "3:30 PM",
    status: "new",
    website: "design.co",
    score: 48,
    phone: "+1 555-5678",
  },
  {
    id: 7,
    email: "mike@fitness.app",
    name: "Mike Wilson",
    source: "Expert Review CTA",
    date: "Dec 2, 2025",
    time: "10:45 AM",
    status: "qualified",
    website: "fitness.app",
    score: 33,
    phone: "+1 555-9012",
  },
  {
    id: 8,
    email: "emma@blog.net",
    name: "Emma Taylor",
    source: "Newsletter",
    date: "Dec 2, 2025",
    time: "2:00 PM",
    status: "converted",
    website: "blog.net",
    score: 29,
    phone: null,
  },
  {
    id: 9,
    email: "chris@music.fm",
    name: "Chris Anderson",
    source: "Scan Results",
    date: "Dec 1, 2025",
    time: "5:15 PM",
    status: "new",
    website: "music.fm",
    score: 67,
    phone: "+1 555-3456",
  },
  {
    id: 10,
    email: "kate@food.co",
    name: "Kate Martinez",
    source: "Expert Review CTA",
    date: "Dec 1, 2025",
    time: "11:00 AM",
    status: "contacted",
    website: "food.co",
    score: 42,
    phone: "+1 555-7890",
  },
  {
    id: 11,
    email: "tom@travel.io",
    name: "Tom Garcia",
    source: "Scan Results",
    date: "Nov 30, 2025",
    time: "4:30 PM",
    status: "qualified",
    website: "travel.io",
    score: 51,
    phone: "+1 555-2345",
  },
  {
    id: 12,
    email: "julia@art.studio",
    name: "Julia Robinson",
    source: "Newsletter",
    date: "Nov 30, 2025",
    time: "1:45 PM",
    status: "new",
    website: "art.studio",
    score: 58,
    phone: null,
  },
];

// Status filter options
const statusFilters = ["All", "New", "Contacted", "Qualified", "Converted"];

// Source filter options
const sourceFilters = [
  "All Sources",
  "Scan Results",
  "Expert Review CTA",
  "Newsletter",
];

// Lead Status Badge
function LeadStatusBadge({ status }: { status: string }) {
  const config = {
    new: { bg: "bg-blue-100", text: "text-blue-700", icon: UserPlus },
    contacted: { bg: "bg-amber-100", text: "text-amber-700", icon: Clock },
    qualified: { bg: "bg-purple-100", text: "text-purple-700", icon: Star },
    converted: {
      bg: "bg-green-100",
      text: "text-green-700",
      icon: CheckCircle2,
    },
  }[status] || { bg: "bg-gray-100", text: "text-gray-700", icon: Clock };

  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium capitalize",
        config.bg,
        config.text
      )}
    >
      <Icon className="w-3 h-3" />
      {status}
    </span>
  );
}

// Source Badge
function SourceBadge({ source }: { source: string }) {
  const config = {
    "Scan Results": { bg: "bg-[#FF5A3D]/10", text: "text-[#FF5A3D]" },
    "Expert Review CTA": { bg: "bg-green-100", text: "text-green-700" },
    Newsletter: { bg: "bg-blue-100", text: "text-blue-700" },
  }[source] || { bg: "bg-gray-100", text: "text-gray-700" };

  return (
    <span
      className={cn(
        "px-2.5 py-1 rounded-full text-xs font-medium",
        config.bg,
        config.text
      )}
    >
      {source}
    </span>
  );
}

export default function AdminLeadsPage() {
  const { user } = useAdminAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sourceFilter, setSourceFilter] = useState("All Sources");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedLeads, setSelectedLeads] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedLead, setExpandedLead] = useState<number | null>(null);
  const itemsPerPage = 10;

  // Filter leads
  const filteredLeads = allLeads.filter((lead) => {
    const matchesSearch =
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.website.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "All" ||
      lead.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesSource =
      sourceFilter === "All Sources" || lead.source === sourceFilter;
    return matchesSearch && matchesStatus && matchesSource;
  });

  // Pagination
  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);
  const paginatedLeads = filteredLeads.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Select all toggle
  const toggleSelectAll = () => {
    if (selectedLeads.length === paginatedLeads.length) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads(paginatedLeads.map((l) => l.id));
    }
  };

  // Toggle single selection
  const toggleSelect = (id: number) => {
    setSelectedLeads((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Copy email to clipboard
  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
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
          <span className="text-foreground font-medium">All Leads</span>
        </div>

        {/* Page Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="animate-in fade-in slide-in-from-left-4">
            <h1 className="text-3xl font-bold mb-1">Lead Management</h1>
            <p className="text-muted-foreground">
              Track and manage all captured leads
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
              Export CSV
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "Total Leads",
              value: "2,847",
              change: "+12.5%",
              color: "#FF5A3D",
              icon: Mail,
            },
            {
              label: "New Leads",
              value: "342",
              change: "+8.2%",
              color: "#3b82f6",
              icon: UserPlus,
            },
            {
              label: "Qualified",
              value: "186",
              change: "+15.4%",
              color: "#8b5cf6",
              icon: Star,
            },
            {
              label: "Converted",
              value: "94",
              change: "+23.1%",
              color: "#22c55e",
              icon: CheckCircle2,
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
              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${stat.color}15` }}
                >
                  <stat.icon
                    className="w-5 h-5"
                    style={{ color: stat.color }}
                  />
                </div>
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
              <p className="text-2xl font-bold mb-0.5">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
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
                  placeholder="Search by name, email, or website..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5A3D]/20 focus:border-[#FF5A3D] transition-all"
                />
              </div>

              {/* Status Filter Dropdown */}
              <div className="relative">
                <button
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-background text-sm hover:bg-muted transition-colors min-w-[140px] justify-between"
                  onClick={() => {}}
                >
                  <span>{statusFilter}</span>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>

              {/* Status Pills */}
              <div className="flex items-center gap-2 flex-wrap">
                {statusFilters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setStatusFilter(filter)}
                    className={cn(
                      "px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap",
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
                Filters
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
                      Last 30 days
                    </span>
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Source
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {sourceFilters.map((source) => (
                      <button
                        key={source}
                        onClick={() => setSourceFilter(source)}
                        className={cn(
                          "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                          sourceFilter === source
                            ? "bg-[#FF5A3D] text-white"
                            : "bg-muted hover:bg-muted/80 text-muted-foreground"
                        )}
                      >
                        {source}
                      </button>
                    ))}
                  </div>
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
              </div>
            )}
          </div>

          {/* Bulk Actions */}
          {selectedLeads.length > 0 && (
            <div className="px-4 py-3 bg-[#FF5A3D]/5 border-b border-[#FF5A3D]/10 flex items-center gap-4 animate-in fade-in slide-in-from-top-2">
              <span className="text-sm font-medium text-[#FF5A3D]">
                {selectedLeads.length} selected
              </span>
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 text-xs h-8 bg-transparent"
              >
                <Send className="w-3.5 h-3.5" />
                Send Email
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 text-xs h-8 bg-transparent"
              >
                <Download className="w-3.5 h-3.5" />
                Export
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
                        selectedLeads.length === paginatedLeads.length &&
                        paginatedLeads.length > 0
                      }
                      onChange={toggleSelectAll}
                      className="w-4 h-4 rounded border-border text-[#FF5A3D] focus:ring-[#FF5A3D]"
                    />
                  </th>
                  <th className="p-4 text-left">
                    <button className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                      Lead
                      <ArrowUpDown className="w-3.5 h-3.5" />
                    </button>
                  </th>
                  <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                    Source
                  </th>
                  <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                    Website
                  </th>
                  <th className="p-4 text-left">
                    <button className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                      Score
                      <ArrowUpDown className="w-3.5 h-3.5" />
                    </button>
                  </th>
                  <th className="p-4 text-left">
                    <button className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                      Date
                      <ArrowUpDown className="w-3.5 h-3.5" />
                    </button>
                  </th>
                  <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedLeads.map((lead, i) => (
                  <tr
                    key={lead.id}
                    className={cn(
                      "border-b border-border hover:bg-muted/50 transition-colors animate-in fade-in slide-in-from-left-4 cursor-pointer",
                      selectedLeads.includes(lead.id) && "bg-[#FF5A3D]/5",
                      expandedLead === lead.id && "bg-muted/30"
                    )}
                    style={{
                      animationDelay: `${i * 30}ms`,
                      animationFillMode: "both",
                    }}
                    onClick={() =>
                      setExpandedLead(expandedLead === lead.id ? null : lead.id)
                    }
                  >
                    <td className="p-4" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={selectedLeads.includes(lead.id)}
                        onChange={() => toggleSelect(lead.id)}
                        className="w-4 h-4 rounded border-border text-[#FF5A3D] focus:ring-[#FF5A3D]"
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#FF5A3D]/20 to-[#FF5A3D]/5 flex items-center justify-center text-[#FF5A3D] font-semibold text-sm">
                          {lead.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <p className="font-medium">{lead.name}</p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            {lead.email}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                copyEmail(lead.email);
                              }}
                              className="p-0.5 rounded hover:bg-muted"
                              title="Copy email"
                            >
                              <Copy className="w-3 h-3" />
                            </button>
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <LeadStatusBadge status={lead.status} />
                    </td>
                    <td className="p-4">
                      <SourceBadge source={lead.source} />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5">
                        <Globe className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{lead.website}</span>
                        <a
                          href={`https://${lead.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-0.5 rounded hover:bg-muted"
                        >
                          <ExternalLink className="w-3 h-3 text-muted-foreground hover:text-[#FF5A3D]" />
                        </a>
                      </div>
                    </td>
                    <td className="p-4">
                      <span
                        className={cn(
                          "font-semibold",
                          lead.score >= 70
                            ? "text-green-600"
                            : lead.score >= 50
                              ? "text-amber-600"
                              : "text-red-600"
                        )}
                      >
                        {lead.score}/100
                      </span>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="text-sm">{lead.date}</p>
                        <p className="text-xs text-muted-foreground">
                          {lead.time}
                        </p>
                      </div>
                    </td>
                    <td className="p-4" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center gap-1">
                        <button
                          className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                          title="Send Email"
                        >
                          <Mail className="w-4 h-4 text-muted-foreground hover:text-[#FF5A3D]" />
                        </button>
                        {lead.phone && (
                          <button
                            className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                            title="Call"
                          >
                            <Phone className="w-4 h-4 text-muted-foreground hover:text-green-600" />
                          </button>
                        )}
                        <button
                          className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                          title="Add Note"
                        >
                          <MessageSquare className="w-4 h-4 text-muted-foreground hover:text-blue-600" />
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
          <div className="p-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, filteredLeads.length)} of{" "}
              {filteredLeads.length} leads
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
