"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Grid,
  Layers,
  Calendar,
  Sparkles,
  TrendingUp,
  SlidersHorizontal,
  MapPin,
  Instagram,
  Image as ImageIcon,
  MessageSquareText,
  Users,
  Settings,
  History,
  LogOut,
  X,
  ExternalLink,
} from "lucide-react";
import { AdminPayload } from "@/lib/auth";

interface AdminSidebarProps {
  user: AdminPayload;
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ user, isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const navGroups = [
    {
      title: "DASHBOARD",
      items: [{ label: "Overview", href: "/admin", icon: LayoutDashboard }],
    },
    {
      title: "CONTENT MANAGEMENT",
      items: [
        { label: "Products", href: "/admin/products", icon: Package },
        { label: "Categories", href: "/admin/categories", icon: Grid },
        { label: "Collections", href: "/admin/collections", icon: Layers },
        { label: "Occasions", href: "/admin/occasions", icon: Calendar },
        { label: "Customized Pieces", href: "/admin/customized", icon: Sparkles },
        { label: "Homepage Sections", href: "/admin/homepage", icon: SlidersHorizontal },
      ],
    },
    {
      title: "BUSINESS OPERATIONS",
      items: [
        { label: "Silver Rate Control", href: "/admin/silver-rate", icon: TrendingUp },
        { label: "Customer Enquiries", href: "/admin/enquiries", icon: MessageSquareText },
        { label: "Store & Showroom", href: "/admin/store", icon: MapPin },
        { label: "Instagram Showcase", href: "/admin/instagram", icon: Instagram },
        { label: "Media Library", href: "/admin/media", icon: ImageIcon },
      ],
    },
    {
      title: "SYSTEM & ACCESS",
      items: [
        ...(user.role === "SUPER_ADMIN"
          ? [
              { label: "Admin Users", href: "/admin/users", icon: Users },
              { label: "Settings", href: "/admin/settings", icon: Settings },
            ]
          : []),
        { label: "Audit Log", href: "/admin/audit-log", icon: History },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-64 bg-slate-900 border-r border-slate-800 text-slate-300 z-50 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-5 border-b border-slate-800 flex items-center justify-between">
          <Link href="/admin" className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 font-bold text-sm shadow">
              SBS
            </div>
            <div>
              <span className="font-serif text-sm font-semibold tracking-wide text-white block">
                SRI BHAGAVATHI
              </span>
              <span className="text-[10px] tracking-widest text-amber-400 font-semibold uppercase block">
                Admin Panel
              </span>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden text-slate-400 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Info Capsule */}
        <div className="mx-4 my-4 p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-between">
          <div className="overflow-hidden pr-2">
            <p className="text-xs font-semibold text-white truncate">{user.name}</p>
            <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
          </div>
          <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 shrink-0">
            {user.role === "SUPER_ADMIN" ? "SUPER" : "EDITOR"}
          </span>
        </div>

        {/* Navigation Link Groups */}
        <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-6 text-xs">
          {navGroups.map((group, idx) => (
            <div key={idx}>
              <h2 className="px-3 mb-2 text-[10px] font-bold text-slate-500 tracking-wider uppercase">
                {group.title}
              </h2>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive =
                    item.href === "/admin"
                      ? pathname === "/admin"
                      : pathname.startsWith(item.href);
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl font-medium transition ${
                        isActive
                          ? "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                          : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? "text-amber-400" : "text-slate-400"}`} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer Actions */}
        <div className="p-3 border-t border-slate-800 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
          >
            <span className="flex items-center space-x-2">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Customer Website</span>
            </span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-2 px-3 py-2 text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out Session</span>
          </button>
        </div>
      </aside>
    </>
  );
}
