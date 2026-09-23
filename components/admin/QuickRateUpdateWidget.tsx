"use client";

import { useState } from "react";
import { TrendingUp, RefreshCw, CheckCircle2, AlertCircle } from "lucide-react";

interface QuickRateUpdateWidgetProps {
  currentRate: {
    ratePerGram999: number;
    ratePerGram925: number;
    mode: string;
    manualOverride: boolean;
    source: string;
    timestamp: string;
  };
}

export default function QuickRateUpdateWidget({ currentRate }: QuickRateUpdateWidgetProps) {
  const [rate, setRate] = useState<string>(currentRate.ratePerGram999.toString());
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const handleQuickUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    const num = parseFloat(rate);
    if (isNaN(num) || num <= 0) {
      setFeedback({ type: "error", msg: "Please enter a valid rate greater than zero." });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/admin/silver-rate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ratePerGram999: num,
          mode: "MANUAL",
          manualOverride: true,
          purity: "999",
          source: "Certified Boutique Atelier",
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed");

      setFeedback({ type: "success", msg: `Updated today's silver rate to ₹${num}/g` });
    } catch (err: any) {
      setFeedback({ type: "error", msg: err.message || "Failed to update rate" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-lg relative overflow-hidden">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-white flex items-center space-x-2">
          <TrendingUp className="w-4 h-4 text-amber-400" />
          <span>Quick Silver Rate Update</span>
        </h2>
        <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
          999 FINE
        </span>
      </div>

      <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-1 text-center">
        <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase block">
          Current Display Rate
        </span>
        <div className="text-2xl font-serif font-bold text-amber-400">
          ₹{currentRate.ratePerGram999.toFixed(2)} <span className="text-xs text-slate-400 font-sans">/ gram</span>
        </div>
        <p className="text-[10px] text-slate-500 truncate">
          10g: ₹{(currentRate.ratePerGram999 * 10).toFixed(0)} · 1kg: ₹{(currentRate.ratePerGram999 * 1000).toLocaleString("en-IN")}
        </p>
      </div>

      {feedback && (
        <div
          className={`p-3 rounded-xl text-xs font-medium flex items-center space-x-2 ${
            feedback.type === "success"
              ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-300"
              : "bg-rose-500/10 border border-rose-500/30 text-rose-300"
          }`}
        >
          {feedback.type === "success" ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
          <span>{feedback.msg}</span>
        </div>
      )}

      <form onSubmit={handleQuickUpdate} className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Enter New Rate per Gram (₹)
          </label>
          <input
            type="number"
            step="0.01"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 focus:border-amber-500 rounded-xl px-3.5 py-2 text-sm text-white font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/20"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs rounded-xl shadow transition flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Updating Rate...</span>
            </>
          ) : (
            <span>SAVE & ACTIVATE RATE</span>
          )}
        </button>
      </form>
    </div>
  );
}
