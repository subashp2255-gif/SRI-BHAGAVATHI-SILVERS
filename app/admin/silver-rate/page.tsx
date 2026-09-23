"use client";

import { useState, useEffect } from "react";
import {
  TrendingUp,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  History,
  Sliders,
  Shield,
  Eye,
  EyeOff,
} from "lucide-react";

export default function SilverRateAdminPage() {
  const [rateData, setRateData] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Form Fields
  const [rate999, setRate999] = useState("");
  const [rate925, setRate925] = useState("");
  const [mode, setMode] = useState("MANUAL");
  const [manualOverride, setManualOverride] = useState(true);
  const [source, setSource] = useState("Certified Boutique Atelier");

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
        setRate999(data.currentRate.ratePerGram999.toString());
        setRate925(data.currentRate.ratePerGram925.toString());
        setMode(data.currentRate.mode);
        setManualOverride(data.currentRate.manualOverride);
        setSource(data.currentRate.source);

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

  const handleRateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(rate999);
    if (isNaN(val) || val <= 0) {
      alert("Rate per gram must be a valid positive number");
      return;
    }

    setUpdating(true);
    try {
      const res = await fetch("/api/admin/silver-rate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ratePerGram999: val,
          ratePerGram925: parseFloat(rate925) || Math.round(val * 0.925 * 100) / 100,
          mode,
          manualOverride,
          source,
        }),
      });

      if (res.ok) {
        showToast("Silver rate updated & published to website!");
        fetchRates();
      }
    } catch (err) {
      console.error("Update failed:", err);
    } finally {
      setUpdating(false);
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
      <div>
        <h1 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight flex items-center space-x-2">
          <TrendingUp className="w-6 h-6 text-amber-400" />
          <span>Silver Rate Control Center</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage the daily customer-facing silver rate, manual override modes, rate calculation formulas, and public rate bar visibility.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Rate Input Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* CURRENT RATE CARDS */}
          {rateData && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/30 text-center">
                <span className="text-[10px] font-bold text-amber-300 tracking-wider uppercase">
                  999 FINE SILVER (1G)
                </span>
                <div className="text-2xl font-serif font-bold text-white mt-1">
                  ₹{rateData.ratePerGram999.toFixed(2)}
                </div>
                <p className="text-[10px] text-amber-200/80 mt-1">Primary customer rate</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center">
                <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                  10 GRAMS (999)
                </span>
                <div className="text-2xl font-serif font-bold text-white mt-1">
                  ₹{(rateData.ratePerGram999 * 10).toFixed(0)}
                </div>
                <p className="text-[10px] text-slate-500 mt-1">10g bullion benchmark</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center">
                <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                  1 KILOGRAM (999)
                </span>
                <div className="text-2xl font-serif font-bold text-white mt-1">
                  ₹{(rateData.ratePerGram999 * 1000).toLocaleString("en-IN")}
                </div>
                <p className="text-[10px] text-slate-500 mt-1">1kg bar benchmark</p>
              </div>
            </div>
          )}

          {/* UPDATE RATE FORM */}
          <form onSubmit={handleRateSubmit} className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5">
            <h2 className="text-sm font-semibold text-white border-b border-slate-800 pb-3 flex items-center justify-between">
              <span>Set Customer Silver Rate</span>
              <span className="text-[10px] font-normal text-amber-400">
                Mode: {mode} {manualOverride ? "(Manual Override Active)" : ""}
              </span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  999 Silver Rate per Gram (₹) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={rate999}
                  onChange={(e) => {
                    setRate999(e.target.value);
                    const val = parseFloat(e.target.value);
                    if (!isNaN(val)) {
                      setRate925((val * 0.925).toFixed(2));
                    }
                  }}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3.5 py-2 text-sm text-white font-mono focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  92.5 Sterling Silver Rate per Gram (₹)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={rate925}
                  onChange={(e) => setRate925(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3.5 py-2 text-sm text-white font-mono focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Pricing Source Label
                </label>
                <input
                  type="text"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  placeholder="Certified Boutique Atelier"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Rate Source Mode
                </label>
                <select
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-xl px-3 py-2 text-xs"
                >
                  <option value="MANUAL">MANUAL (Admin Entered)</option>
                  <option value="API">API (External Market Feed)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-1 text-xs text-slate-300">
              <input
                type="checkbox"
                id="override"
                checked={manualOverride}
                onChange={(e) => setManualOverride(e.target.checked)}
                className="rounded text-amber-500 bg-slate-950 border-slate-800"
              />
              <label htmlFor="override">
                Enable Manual Override (Admin value overrides external API rate)
              </label>
            </div>

            <button
              type="submit"
              disabled={updating}
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs rounded-xl transition shadow-md flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {updating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Publishing Rate...</span>
                </>
              ) : (
                <span>SAVE & PUBLISH CUSTOMER SILVER RATE</span>
              )}
            </button>
          </form>

          {/* HISTORICAL RATES TABLE */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-sm font-semibold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <History className="w-4 h-4 text-emerald-400" />
              <span>Silver Rate History Log</span>
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
                    <th className="p-3">UPDATED BY</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {history.map((h) => (
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
                        <span className="px-2 py-0.5 text-[10px] font-semibold rounded bg-slate-800 text-slate-300">
                          {h.mode}
                        </span>
                      </td>
                      <td className="p-3 text-slate-400 text-[11px] truncate max-w-[150px]">{h.source}</td>
                      <td className="p-3 text-slate-400 text-[11px]">{h.adminEmail || "system"}</td>
                    </tr>
                  ))}
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
              <span>Public Rate Bar Display Controls</span>
            </h2>

            <p className="text-xs text-slate-400">
              Configure visibility of the compact silver rate bar at the top of the customer website navbar.
            </p>

            <div className="space-y-3 pt-2 text-xs">
              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200">
                <span>Display Top Silver Rate Bar</span>
                <input
                  type="checkbox"
                  checked={isTopBarVisible}
                  onChange={(e) => setIsTopBarVisible(e.target.checked)}
                  className="rounded text-amber-500 bg-slate-900 border-slate-700"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200">
                <span>Show Timestamp ("Updated Today")</span>
                <input
                  type="checkbox"
                  checked={showTimestamp}
                  onChange={(e) => setShowTimestamp(e.target.checked)}
                  className="rounded text-amber-500 bg-slate-900 border-slate-700"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200">
                <span>Show Source Label ("Certified Boutique Atelier")</span>
                <input
                  type="checkbox"
                  checked={showSource}
                  onChange={(e) => setShowSource(e.target.checked)}
                  className="rounded text-amber-500 bg-slate-900 border-slate-700"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200">
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
        </div>
      </div>
    </div>
  );
}
