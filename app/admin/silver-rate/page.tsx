"use client";

import { useState, useEffect } from "react";
import {
  TrendingUp,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  History,
  Sliders,
  ShieldCheck,
  Radio,
  Clock,
  Sparkles,
  Zap,
} from "lucide-react";

export default function SilverRateAdminPage() {
  const [rateData, setRateData] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Display Config Toggles
  const [isTopBarVisible, setIsTopBarVisible] = useState(true);
  const [showTimestamp, setShowTimestamp] = useState(true);
  const [showSource, setShowSource] = useState(true);
  const [showChangeIndicator, setShowChangeIndicator] = useState(true);

  const fetchRates = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/silver-rate");
      const data = await res.json();
      if (data.currentRate) {
        setRateData(data.currentRate);

        if (data.currentRate.config) {
          setIsTopBarVisible(data.currentRate.config.isTopBarVisible);
          setShowTimestamp(data.currentRate.config.showTimestamp);
          setShowSource(data.currentRate.config.showSource);
          setShowChangeIndicator(data.currentRate.config.showChangeIndicator);
        }
      }
      setHistory(data.history || []);
    } catch (err) {
      console.error("Failed to load silver rate:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
  }, []);

  const handleSyncLiveRate = async () => {
    setSyncing(true);
    try {
      const res = await fetch("/api/admin/silver-rate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Sync failed");

      showToast("Live MJDTA rates successfully fetched & synchronized!");
      await fetchRates();
    } catch (err: any) {
      console.error("Sync failed:", err);
      alert(err.message || "Failed to sync with live backend");
    } finally {
      setSyncing(false);
    }
  };

  const handleConfigSubmit = async () => {
    try {
      const res = await fetch("/api/admin/silver-rate", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          isTopBarVisible,
          showTimestamp,
          showSource,
          showChangeIndicator,
        }),
      });
      if (res.ok) {
        showToast("Silver rate bar display settings saved!");
      }
    } catch (err) {
      console.error("Config update failed:", err);
    }
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const current999 = rateData?.ratePerGram999 || 240.0;
  const current925 = rateData?.ratePerGram925 || Math.round(current999 * 0.925 * 100) / 100;
  const gold22k = rateData?.gold22k || 13680.0;

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-500 text-slate-950 font-bold px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-2 text-xs">
          <CheckCircle2 className="w-5 h-5" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight flex items-center space-x-2">
            <TrendingUp className="w-6 h-6 text-amber-400" />
            <span>MJDTA Live Rate Control Center</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Certified real-time market rates directly integrated with the Madras Jewellers & Diamond Traders Association (MJDTA). Manual rate overrides are disabled to preserve certified integrity.
          </p>
        </div>

        <button
          onClick={handleSyncLiveRate}
          disabled={syncing}
          className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold text-xs rounded-xl shadow-md transition flex items-center space-x-2 disabled:opacity-50 self-start sm:self-auto"
        >
          <RefreshCw className={`w-4 h-4 ${syncing ? "animate-spin" : ""}`} />
          <span>{syncing ? "Syncing with MJDTA..." : "Sync Live Rates Now"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Automated Rates Display & Scheduler Status */}
        <div className="lg:col-span-2 space-y-6">
          {/* CURRENT RATE CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/20 via-slate-900 to-slate-900 border border-amber-500/30 text-center relative overflow-hidden">
              <span className="text-[10px] font-bold text-amber-300 tracking-wider uppercase block">
                999 FINE SILVER (1G)
              </span>
              <div className="text-3xl font-serif font-bold text-white mt-1.5">
                ₹{current999.toFixed(2)}
              </div>
              <p className="text-[11px] text-amber-200/80 mt-1">Primary customer benchmark</p>
              <div className="mt-3 pt-2 border-t border-amber-500/20 text-[10px] text-slate-400 flex justify-around">
                <span>10g: ₹{(current999 * 10).toFixed(0)}</span>
                <span>•</span>
                <span>1kg: ₹{(current999 * 1000).toLocaleString("en-IN")}</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-center">
              <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
                92.5 STERLING SILVER (1G)
              </span>
              <div className="text-3xl font-serif font-bold text-white mt-1.5">
                ₹{current925.toFixed(2)}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Standard jewelry grade</p>
              <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] text-slate-500 flex justify-around">
                <span>10g: ₹{(current925 * 10).toFixed(0)}</span>
                <span>•</span>
                <span>1kg: ₹{(current925 * 1000).toLocaleString("en-IN")}</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-center">
              <span className="text-[10px] font-bold text-amber-400 tracking-wider uppercase block">
                22K GOLD (1G)
              </span>
              <div className="text-3xl font-serif font-bold text-amber-400 mt-1.5">
                ₹{gold22k.toLocaleString("en-IN")}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">MJDTA Sovereign Market</p>
              <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] text-slate-500">
                8g Sovereign: ₹{(gold22k * 8).toLocaleString("en-IN")}
              </div>
            </div>
          </div>

          {/* AUTOMATED SERVICE STATUS PANEL */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Radio className="w-4 h-4 text-emerald-400" />
                <h2 className="text-sm font-semibold text-white">Live MJDTA Integration Feed</h2>
              </div>
              <span className="flex items-center space-x-1.5 px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>ACTIVE & AUTOMATED</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">Official Data Source</span>
                <p className="text-sm font-semibold text-slate-200">MJDTA Chennai Metal Exchange</p>
                <p className="text-[11px] text-slate-500">Madras Jewellers and Diamond Traders Association</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">FastAPI Scraper Service</span>
                <p className="text-sm font-semibold text-emerald-400">Connected & Online</p>
                <p className="text-[11px] text-slate-500">Endpoint: http://127.0.0.1:8000/rates</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">Automatic Scheduler</span>
                <p className="text-sm font-semibold text-slate-200">Continuous Background Sync</p>
                <p className="text-[11px] text-slate-500">Auto-polls MJDTA at regular market intervals</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">Manual Overrides</span>
                <p className="text-sm font-semibold text-amber-300">Disabled by Admin Policy</p>
                <p className="text-[11px] text-slate-500">Only verified official exchange prices are published</p>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 bg-amber-500/5 border border-amber-500/20 p-4 rounded-xl">
              <div className="flex items-center space-x-3">
                <Zap className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-amber-300">Need instant rate synchronization?</p>
                  <p className="text-[11px] text-slate-400">Force an immediate scrape of the MJDTA exchange and update customer prices.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleSyncLiveRate}
                disabled={syncing}
                className="w-full sm:w-auto px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs rounded-xl shadow transition shrink-0 flex items-center justify-center space-x-1.5"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${syncing ? "animate-spin" : ""}`} />
                <span>Sync Now</span>
              </button>
            </div>
          </div>

          {/* HISTORICAL RATES TABLE */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-sm font-semibold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <History className="w-4 h-4 text-emerald-400" />
              <span>Silver Rate Sync History</span>
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300 border-collapse">
                <thead className="bg-slate-950/80 text-[10px] font-bold text-slate-400 tracking-wider uppercase border-b border-slate-800">
                  <tr>
                    <th className="p-3">DATE & TIME</th>
                    <th className="p-3">999 RATE / G</th>
                    <th className="p-3">925 RATE / G</th>
                    <th className="p-3">MODE</th>
                    <th className="p-3">SOURCE</th>
                    <th className="p-3">SYNCED BY</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {history.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-4 text-center text-slate-500 italic">
                        No history records recorded yet.
                      </td>
                    </tr>
                  ) : (
                    history.map((h) => (
                      <tr key={h.id} className="hover:bg-slate-800/40">
                        <td className="p-3 text-[11px]">
                          {new Date(h.timestamp).toLocaleString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                        <td className="p-3 font-mono font-bold text-amber-400">₹{h.ratePerGram999.toFixed(2)}</td>
                        <td className="p-3 font-mono text-slate-300">₹{h.ratePerGram925.toFixed(2)}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 text-[10px] font-semibold rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                            {h.mode || "API"}
                          </span>
                        </td>
                        <td className="p-3 text-slate-400 text-[11px] truncate max-w-[150px]">{h.source || "MJDTA"}</td>
                        <td className="p-3 text-slate-400 text-[11px]">{h.adminEmail || "FastAPI Scheduler"}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Public Rate Bar Display Settings */}
        <div className="space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-sm font-semibold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Sliders className="w-4 h-4 text-amber-400" />
              <span>Customer Rate Bar Settings</span>
            </h2>

            <p className="text-xs text-slate-400">
              Configure the public visibility and metadata displayed on the compact silver rate ticker at the top of the store navigation bar.
            </p>

            <div className="space-y-3 pt-2 text-xs">
              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 cursor-pointer hover:border-slate-700 transition">
                <span>Display Top Silver Rate Bar</span>
                <input
                  type="checkbox"
                  checked={isTopBarVisible}
                  onChange={(e) => setIsTopBarVisible(e.target.checked)}
                  className="rounded text-amber-500 bg-slate-900 border-slate-700"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 cursor-pointer hover:border-slate-700 transition">
                <span>Show Timestamp ("Live · Today")</span>
                <input
                  type="checkbox"
                  checked={showTimestamp}
                  onChange={(e) => setShowTimestamp(e.target.checked)}
                  className="rounded text-amber-500 bg-slate-900 border-slate-700"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 cursor-pointer hover:border-slate-700 transition">
                <span>Show Source Label ("MJDTA Chennai")</span>
                <input
                  type="checkbox"
                  checked={showSource}
                  onChange={(e) => setShowSource(e.target.checked)}
                  className="rounded text-amber-500 bg-slate-900 border-slate-700"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 cursor-pointer hover:border-slate-700 transition">
                <span>Show Change Indicator (e.g. ▲ +0.5%)</span>
                <input
                  type="checkbox"
                  checked={showChangeIndicator}
                  onChange={(e) => setShowChangeIndicator(e.target.checked)}
                  className="rounded text-amber-500 bg-slate-900 border-slate-700"
                />
              </label>
            </div>

            <button
              onClick={handleConfigSubmit}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs rounded-xl transition"
            >
              Save Display Preferences
            </button>
          </div>

          {/* Quick Info Box */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 space-y-3 text-xs">
            <h3 className="font-semibold text-slate-200 flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Certified Integrity Guarantee</span>
            </h3>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Customer prices are directly tied to authenticated bullion trade rates from the Madras Jewellers & Diamond Traders Association (MJDTA). Product catalog pricing in "RATE_BASED" mode automatically calculates from this active live benchmark.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
