"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, Search, Plus, TrendingUp, ExternalLink, Shield } from "lucide-react";
import { AdminPayload } from "@/lib/auth";

interface AdminHeaderProps {
  user: AdminPayload;
  onToggleSidebar: () => void;
}

export default function AdminHeader({ user, onToggleSidebar }: AdminHeaderProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/admin/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="h-16 bg-slate-900/80 border-b border-slate-800 backdrop-blur-md sticky top-0 z-30 px-4 sm:px-6 flex items-center justify-between">
      {/* Left: Mobile Drawer Button & Title */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          aria-label="Toggle Navigation Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Bar */}
        <form onSubmit={handleSearch} className="hidden md:block relative w-64 lg:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products, collections..."
            className="w-full bg-slate-800/80 border border-slate-700/80 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/10 transition"
          />
        </form>
      </div>

      {/* Right Actions & Quick Buttons */}
      <div className="flex items-center space-x-3">
        {/* Quick Rate Update Button */}
        <Link
          href="/admin/silver-rate"
          className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 text-xs font-medium transition"
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Update Silver Rate</span>
        </Link>

        {/* Add Product Quick Action */}
        <Link
          href="/admin/products/new"
          className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500 text-slate-950 hover:bg-amber-400 font-semibold text-xs transition shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Product</span>
        </Link>

        {/* Public Store Link */}
        <Link
          href="/"
          target="_blank"
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition hidden sm:flex"
          title="Open Public Customer Website"
        >
          <ExternalLink className="w-4 h-4" />
        </Link>

        {/* User Role Badge */}
        <div className="flex items-center space-x-2 pl-2 border-l border-slate-800">
          <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400 text-xs font-bold">
            <Shield className="w-3.5 h-3.5" />
          </div>
          <div className="hidden xl:block text-left">
            <p className="text-xs font-medium text-slate-200 leading-tight">{user.name}</p>
            <p className="text-[10px] text-slate-400 leading-tight">{user.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
