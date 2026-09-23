"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Package,
  Plus,
  Search,
  Filter,
  Copy,
  Edit,
  Archive,
  Eye,
  EyeOff,
  Trash2,
  CheckSquare,
  Square,
  AlertTriangle,
  Loader2,
  CheckCircle2,
} from "lucide-react";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [confirmArchiveId, setConfirmArchiveId] = useState<string | null>(null);
  const [bulkProcessing, setBulkProcessing] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      if (search) query.set("search", search);
      if (categoryFilter !== "ALL") query.set("category", categoryFilter);
      if (statusFilter !== "ALL") query.set("status", statusFilter);

      const res = await fetch(`/api/admin/products?${query.toString()}`);
      const data = await res.json();
      setProducts(data.products || []);
    } catch (err) {
      console.error("Error loading products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [categoryFilter, statusFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProducts();
  };

  const handleSelectAll = () => {
    if (selectedIds.length === products.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(products.map((p) => p.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleBulkAction = async (action: "PUBLISHED" | "DRAFT" | "ARCHIVED") => {
    if (selectedIds.length === 0) return;
    setBulkProcessing(true);
    try {
      const res = await fetch("/api/admin/products/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selectedIds, action }),
      });
      if (res.ok) {
        showToast(`Bulk updated ${selectedIds.length} products to ${action}`);
        setSelectedIds([]);
        fetchProducts();
      }
    } catch (err) {
      console.error("Bulk action failed:", err);
    } finally {
      setBulkProcessing(false);
    }
  };

  const handleDuplicate = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/products/${id}/duplicate`, { method: "POST" });
      if (res.ok) {
        showToast("Product duplicated as draft!");
        fetchProducts();
      }
    } catch (err) {
      console.error("Duplicate failed:", err);
    }
  };

  const handleArchive = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        showToast("Product archived.");
        setConfirmArchiveId(null);
        fetchProducts();
      }
    } catch (err) {
      console.error("Archive failed:", err);
    }
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Toast Feedback */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-500 text-slate-950 font-semibold px-4 py-2.5 rounded-xl shadow-xl flex items-center space-x-2 text-xs">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight flex items-center space-x-2">
            <Package className="w-6 h-6 text-amber-400" />
            <span>Product Catalog Management</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage jewellery products, rates, stock status, draft previews, and public visibility.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="flex items-center space-x-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs rounded-xl transition shadow-md shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by product title, description..."
            className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500/60 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
          />
        </form>

        <div className="flex flex-wrap items-center gap-3 text-xs">
          {/* Status Filter */}
          <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            {["ALL", "PUBLISHED", "DRAFT", "ARCHIVED"].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1 rounded-lg font-medium text-[11px] transition ${
                  statusFilter === s
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-300 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-amber-500"
          >
            <option value="ALL">All Categories</option>
            <option value="rings">Silver Rings</option>
            <option value="chains">Silver Chains</option>
            <option value="bracelets">Silver Bracelets</option>
            <option value="anklets">Silver Anklets</option>
            <option value="earrings">Silver Earrings</option>
            <option value="necklaces">Silver Necklaces</option>
            <option value="pooja">Pooja Collection</option>
            <option value="articles">Silver Articles</option>
          </select>
        </div>
      </div>

      {/* Bulk Selection Toolbar */}
      {selectedIds.length > 0 && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-3 px-4 flex items-center justify-between text-xs text-amber-300">
          <span>{selectedIds.length} products selected</span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleBulkAction("PUBLISHED")}
              disabled={bulkProcessing}
              className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded-lg hover:bg-emerald-500/30"
            >
              Bulk Publish
            </button>
            <button
              onClick={() => handleBulkAction("DRAFT")}
              disabled={bulkProcessing}
              className="px-3 py-1 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg hover:bg-slate-700"
            >
              Bulk Save Draft
            </button>
            <button
              onClick={() => handleBulkAction("ARCHIVED")}
              disabled={bulkProcessing}
              className="px-3 py-1 bg-rose-500/20 border border-rose-500/40 text-rose-300 rounded-lg hover:bg-rose-500/30"
            >
              Bulk Archive
            </button>
          </div>
        </div>
      )}

      {/* Products Data Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="p-12 text-center text-slate-400 flex flex-col items-center space-y-3">
            <Loader2 className="w-6 h-6 animate-spin text-amber-400" />
            <p className="text-xs">Loading product inventory...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="p-12 text-center text-slate-400 space-y-2">
            <Package className="w-8 h-8 text-slate-600 mx-auto" />
            <p className="text-sm font-medium text-slate-300">No products match the selected criteria</p>
            <p className="text-xs text-slate-500">Try adjusting search or category filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300 border-collapse">
              <thead className="bg-slate-950/80 text-[10px] font-bold text-slate-400 tracking-wider uppercase border-b border-slate-800">
                <tr>
                  <th className="p-4 w-10">
                    <button onClick={handleSelectAll} className="text-slate-400 hover:text-white">
                      {selectedIds.length === products.length ? (
                        <CheckSquare className="w-4 h-4 text-amber-400" />
                      ) : (
                        <Square className="w-4 h-4" />
                      )}
                    </button>
                  </th>
                  <th className="p-4">PRODUCT</th>
                  <th className="p-4">CATEGORY & COLLECTION</th>
                  <th className="p-4">PRICING MODE & VALUE</th>
                  <th className="p-4">STATUS</th>
                  <th className="p-4">UPDATED</th>
                  <th className="p-4 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {products.map((p) => {
                  const isSelected = selectedIds.includes(p.id);
                  return (
                    <tr
                      key={p.id}
                      className={`hover:bg-slate-800/40 transition ${
                        isSelected ? "bg-amber-500/5" : ""
                      }`}
                    >
                      <td className="p-4">
                        <button onClick={() => toggleSelectOne(p.id)}>
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-amber-400" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-500" />
                          )}
                        </button>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-11 h-11 rounded-xl object-cover border border-slate-700/80 shrink-0"
                          />
                          <div>
                            <p className="font-semibold text-white truncate max-w-xs">{p.name}</p>
                            <p className="text-[11px] text-slate-400 font-mono">
                              Weight: {p.netWeight || "N/A"} · {p.purityBadge || "925"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="font-medium text-slate-200">{p.categoryLabel}</p>
                        <p className="text-[11px] text-slate-400">{p.collection || "Default"}</p>
                      </td>
                      <td className="p-4">
                        <p className="font-bold text-amber-400 font-mono">{p.formattedPrice}</p>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                          {p.pricingMode}
                        </span>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full border ${
                            p.status === "PUBLISHED"
                              ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                              : p.status === "DRAFT"
                              ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                              : "bg-rose-500/20 text-rose-300 border-rose-500/40"
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>
                      <td className="p-4 text-[11px] text-slate-400">
                        {new Date(p.updatedAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                        })}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end space-x-1.5">
                          <Link
                            href={`/admin/products/${p.id}/edit`}
                            className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg"
                            title="Edit Product"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>

                          <button
                            onClick={() => handleDuplicate(p.id)}
                            className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg"
                            title="Duplicate Product"
                          >
                            <Copy className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => setConfirmArchiveId(p.id)}
                            className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg"
                            title="Archive Product"
                          >
                            <Archive className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Confirmation Modal for Archive */}
      {confirmArchiveId && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-sm w-full p-6 space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">Archive Product?</h3>
              <p className="text-xs text-slate-400 mt-1">
                Archived products are hidden from the public website but remain stored safely in the database.
              </p>
            </div>
            <div className="flex items-center space-x-3 pt-2">
              <button
                onClick={() => setConfirmArchiveId(null)}
                className="flex-1 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={() => handleArchive(confirmArchiveId)}
                className="flex-1 py-2 bg-rose-600 text-white rounded-xl text-xs font-semibold hover:bg-rose-500"
              >
                Archive Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
