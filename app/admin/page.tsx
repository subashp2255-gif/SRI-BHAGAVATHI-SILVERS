import Link from "next/link";
import {
  Package,
  Layers,
  Calendar,
  Sparkles,
  TrendingUp,
  MessageSquareText,
  CheckCircle2,
  Clock,
  Plus,
  ArrowRight,
  Shield,
  FileText,
} from "lucide-react";
import { getDashboardMetrics } from "@/lib/db/repo";
import QuickRateUpdateWidget from "@/components/admin/QuickRateUpdateWidget";

export default function AdminDashboardPage() {
  const metrics = getDashboardMetrics();

  const statCards = [
    {
      title: "TOTAL PRODUCTS",
      value: metrics.totalProducts,
      subtitle: `${metrics.activeProducts} Active · ${metrics.draftProducts} Drafts`,
      icon: Package,
      color: "from-blue-500/20 to-blue-600/10 text-blue-400 border-blue-500/30",
      href: "/admin/products",
    },
    {
      title: "COLLECTIONS",
      value: metrics.totalCollections,
      subtitle: "Curated heritage themes",
      icon: Layers,
      color: "from-amber-500/20 to-amber-600/10 text-amber-400 border-amber-500/30",
      href: "/admin/collections",
    },
    {
      title: "OCCASIONS",
      value: metrics.totalOccasions,
      subtitle: "Wedding, Pooja, Baby & Gifts",
      icon: Calendar,
      color: "from-emerald-500/20 to-emerald-600/10 text-emerald-400 border-emerald-500/30",
      href: "/admin/occasions",
    },
    {
      title: "CUSTOMIZED PIECES",
      value: metrics.customizedPieces,
      subtitle: "Showcase custom designs",
      icon: Sparkles,
      color: "from-purple-500/20 to-purple-600/10 text-purple-400 border-purple-500/30",
      href: "/admin/customized",
    },
    {
      title: "PENDING ENQUIRIES",
      value: metrics.pendingEnquiries,
      subtitle: "Require staff response",
      icon: MessageSquareText,
      color: "from-rose-500/20 to-rose-600/10 text-rose-400 border-rose-500/30",
      href: "/admin/enquiries",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-sm">
        <div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time operations center for Sri Bhagavathi Silvers customer website data.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2.5">
          <Link
            href="/admin/products/new"
            className="flex items-center space-x-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs rounded-xl transition shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </Link>
          <Link
            href="/admin/silver-rate"
            className="flex items-center space-x-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium text-xs rounded-xl transition"
          >
            <TrendingUp className="w-4 h-4 text-amber-400" />
            <span>Silver Rate Setup</span>
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Link
              key={idx}
              href={card.href}
              className={`p-5 rounded-2xl bg-gradient-to-br ${card.color} border transition duration-200 hover:scale-[1.02] flex flex-col justify-between`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-wider uppercase opacity-80">
                  {card.title}
                </span>
                <Icon className="w-5 h-5 opacity-90" />
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-white">{card.value}</div>
                <p className="text-[11px] opacity-70 mt-0.5">{card.subtitle}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Silver Rate Quick Update & Main Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Silver Rate Quick Update Widget */}
        <div className="lg:col-span-1">
          <QuickRateUpdateWidget currentRate={metrics.currentRate} />
        </div>

        {/* Recent Products Stream */}
        <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-sm font-semibold text-white flex items-center space-x-2">
                <Package className="w-4 h-4 text-amber-400" />
                <span>Recently Published Products</span>
              </h2>
              <p className="text-xs text-slate-400">Live active products on public site</p>
            </div>
            <Link
              href="/admin/products"
              className="text-xs font-medium text-amber-400 hover:text-amber-300 flex items-center space-x-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-800/60">
            {metrics.recentProducts.map((p) => (
              <div key={p.id} className="py-3 flex items-center justify-between hover:bg-slate-800/30 px-2 rounded-xl transition">
                <div className="flex items-center space-x-3 overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-10 h-10 rounded-lg object-cover border border-slate-700/80 shrink-0"
                  />
                  <div className="truncate">
                    <p className="text-xs font-semibold text-slate-200 truncate">{p.name}</p>
                    <p className="text-[11px] text-slate-400">
                      {p.categoryLabel} · <span className="text-amber-400">{p.formattedPrice}</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    PUBLISHED
                  </span>
                  <Link
                    href={`/admin/products/${p.id}/edit`}
                    className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Log & Enquiries Streams */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Customer Enquiries */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-sm font-semibold text-white flex items-center space-x-2">
                <MessageSquareText className="w-4 h-4 text-rose-400" />
                <span>Recent Customer Enquiries</span>
              </h2>
              <p className="text-xs text-slate-400">Inbound custom requests & contact forms</p>
            </div>
            <Link
              href="/admin/enquiries"
              className="text-xs font-medium text-amber-400 hover:text-amber-300 flex items-center space-x-1"
            >
              <span>View Inbox</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {metrics.recentEnquiries.length === 0 ? (
              <p className="text-xs text-slate-500 italic">No customer enquiries received yet.</p>
            ) : (
              metrics.recentEnquiries.map((enq) => (
                <div
                  key={enq.id}
                  className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-start justify-between space-x-3"
                >
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-semibold text-white">{enq.name}</span>
                      <span className="text-[10px] text-slate-400">• {enq.phone}</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1 line-clamp-1">{enq.message}</p>
                  </div>
                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold rounded-full border shrink-0 ${
                      enq.status === "NEW"
                        ? "bg-rose-500/20 text-rose-300 border-rose-500/40"
                        : enq.status === "IN_PROGRESS"
                        ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                        : "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                    }`}
                  >
                    {enq.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Audit Log Activity Stream */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-sm font-semibold text-white flex items-center space-x-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>System Audit Log</span>
              </h2>
              <p className="text-xs text-slate-400">Admin activities & security audit trail</p>
            </div>
            <Link
              href="/admin/audit-log"
              className="text-xs font-medium text-amber-400 hover:text-amber-300 flex items-center space-x-1"
            >
              <span>Full Audit Trail</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {metrics.recentLogs.map((log) => (
              <div
                key={log.id}
                className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/40 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-semibold text-slate-200">
                    {log.action} <span className="font-normal text-slate-400">by {log.adminEmail}</span>
                  </div>
                  {log.details && <p className="text-[11px] text-slate-400 mt-0.5 truncate">{log.details}</p>}
                </div>
                <div className="text-[10px] text-slate-500 shrink-0 ml-2">
                  {new Date(log.timestamp).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
