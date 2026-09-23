"use client";

import { useState } from "react";
import { Settings, Save, CheckCircle2 } from "lucide-react";

export default function AdminSettingsPage() {
  const [toast, setToast] = useState<string | null>(null);
  const [currency, setCurrency] = useState("INR (₹)");
  const [gstRate, setGstRate] = useState("3%");
  const [revalidateOnPublish, setRevalidateOnPublish] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setToast("System settings updated!");
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-500 text-slate-950 font-bold px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-2 text-xs">
          <CheckCircle2 className="w-5 h-5" />
          <span>{toast}</span>
        </div>
      )}

      <div>
        <h1 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight flex items-center space-x-2">
          <Settings className="w-6 h-6 text-amber-400" />
          <span>System & Business Settings</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Configure default currencies, GST rates, cache revalidation, and SEO defaults.
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
        <h2 className="text-sm font-semibold text-white border-b border-slate-800 pb-3">
          Global Business Defaults
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Store Currency</label>
            <input
              type="text"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              disabled
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-400 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Default GST Rate</label>
            <input
              type="text"
              value={gstRate}
              onChange={(e) => setGstRate(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white font-mono"
            />
          </div>
        </div>

        <div className="space-y-2 pt-2 text-xs">
          <label className="flex items-center space-x-2 text-slate-300">
            <input
              type="checkbox"
              checked={revalidateOnPublish}
              onChange={(e) => setRevalidateOnPublish(e.target.checked)}
              className="rounded text-amber-500 bg-slate-950 border-slate-800"
            />
            <span>Automatically revalidate Next.js cache routes on product publish</span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs rounded-xl transition shadow flex items-center justify-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>Save System Settings</span>
        </button>
      </form>
    </div>
  );
}
