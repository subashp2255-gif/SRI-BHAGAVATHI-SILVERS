"use client";

import { useState } from "react";
import { TrendingUp, RefreshCw, CheckCircle2, AlertCircle, Radio, ShieldCheck } from "lucide-react";

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
  const [rateData, setRateData] = useState(currentRate);
  const [syncing, setSyncing] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const handleLiveSync = async () => {
    setFeedback(null);
    setSyncing(true);
    try {
      const res = await fetch("/api/admin/silver-rate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Sync failed");

      if (data.rate) {
        setRateData(data.rate);
      }
      setFeedback({
        type: "success",
        msg: `Synced live MJDTA rate: ₹${Number(data.rate?.ratePerGram999 || data.liveData?.silver || 0).toFixed(2)}/g`,
      });
    } catch (err: any) {
      setFeedback({ type: "error", msg: err.message || "Failed to sync with MJDTA" });
    } finally {
      setSyncing(false);
    }
  };

  const current999 = rateData.ratePerGram999 || 240.0;
  const current925 = rateData.ratePerGram925 || Math.round(current999 * 0.925 * 100) / 100;

  return (
    <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-lg relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-white flex items-center space-x-2">
          <TrendingUp className="w-4 h-4 text-amber-400" />
          <span>Live MJDTA Silver Rate</span>
        </h2>
        <span className="flex items-center space-x-1.5 px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>LIVE FEED</span>
        </span>
      </div>

      {/* Live Display Rate Card */}
      <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800/90 space-y-2 text-center relative">
        <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase block">
          Current Market Benchmark (999 Fine)
        </span>
        <div className="text-3xl font-serif font-bold text-amber-400 tracking-tight">
          ₹{current999.toFixed(2)}{" "}
          <span className="text-xs text-slate-400 font-sans font-normal">/ gram</span>
        </div>
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/70 text-[11px]">
          <div className="text-left bg-slate-900/60 p-2 rounded-lg border border-slate-800/50">
            <span className="text-slate-400 block text-[10px]">10g Bullion</span>
            <span className="text-slate-200 font-medium font-mono">
              ₹{(current999 * 10).toFixed(0)}
            </span>
          </div>
          <div className="text-right bg-slate-900/60 p-2 rounded-lg border border-slate-800/50">
            <span className="text-slate-400 block text-[10px]">1kg Bar</span>
            <span className="text-slate-200 font-medium font-mono">
              ₹{(current999 * 1000).toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </div>

      {/* Automated Feed Specs */}
      <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800/60 space-y-2 text-xs">
        <div className="flex items-center justify-between text-slate-400">
          <span className="flex items-center space-x-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>92.5 Sterling Silver</span>
          </span>
          <span className="text-slate-200 font-mono font-medium">₹{current925.toFixed(2)}/g</span>
        </div>
        <div className="flex items-center justify-between text-slate-400">
          <span className="flex items-center space-x-1.5">
            <Radio className="w-3.5 h-3.5 text-emerald-400" />
            <span>Market Source</span>
          </span>
          <span className="text-slate-300 font-medium">{rateData.source || "MJDTA Market"}</span>
        </div>
        <div className="flex items-center justify-between text-slate-400">
          <span>Mode</span>
          <span className="text-emerald-400 font-medium">Automated Live Feed</span>
        </div>
      </div>

      {feedback && (
        <div
          className={`p-3 rounded-xl text-xs font-medium flex items-center space-x-2 ${
            feedback.type === "success"
              ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-300"
              : "bg-rose-500/10 border border-rose-500/30 text-rose-300"
          }`}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0" />
          )}
          <span>{feedback.msg}</span>
        </div>
      )}

      {/* Sync Action */}
      <button
        type="button"
        onClick={handleLiveSync}
        disabled={syncing}
        className="w-full py-2.5 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold text-xs rounded-xl shadow-md transition flex items-center justify-center space-x-2 disabled:opacity-50"
      >
        <RefreshCw className={`w-4 h-4 ${syncing ? "animate-spin" : ""}`} />
        <span>{syncing ? "Syncing with MJDTA..." : "SYNC LIVE RATE NOW"}</span>
      </button>
      <p className="text-[10px] text-center text-slate-500">
        Automatic background sync runs continuously via FastAPI scheduler.
      </p>
    </div>
  );
}
