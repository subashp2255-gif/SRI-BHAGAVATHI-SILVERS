"use client";

import { useState } from "react";
import { SlidersHorizontal, Eye, EyeOff, Save, CheckCircle2 } from "lucide-react";

export default function AdminHomepagePage() {
  const [toast, setToast] = useState<string | null>(null);

  // Hero Fields
  const [heroHeading, setHeroHeading] = useState("Timeless South Indian Silver Heritage & Artisanal Elegance");
  const [heroSubheading, setHeroSubheading] = useState("Handcrafted 925 sterling silver & 999 fine temple Pooja articles for life's sacred occasions.");
  const [ctaPrimaryText, setCtaPrimaryText] = useState("Explore Collections");
  const [ctaPrimaryLink, setCtaPrimaryLink] = useState("/shop");

  // Section Toggles
  const [sections, setSections] = useState([
    { id: "hero", name: "Hero Showcase Section", enabled: true },
    { id: "featured_collection", name: "Featured Collections Grid", enabled: true },
    { id: "featured_products", name: "Featured Jewellery Showcase", enabled: true },
    { id: "silver_rate", name: "Live Silver Rate Card", enabled: true },
    { id: "shop_by_category", name: "Shop by Category Cards", enabled: true },
    { id: "shop_by_occasion", name: "Shop by Occasion Banner", enabled: true },
    { id: "brand_story", name: "Heritage & Craftsmanship Story", enabled: true },
    { id: "visit_us", name: "Showroom Location & Contact", enabled: true },
  ]);

  const toggleSection = (id: string) => {
    setSections(sections.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s)));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setToast("Homepage layout & hero content saved!");
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-500 text-slate-950 font-bold px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-2 text-xs">
          <CheckCircle2 className="w-5 h-5" />
          <span>{toast}</span>
        </div>
      )}

      <div>
        <h1 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight flex items-center space-x-2">
          <SlidersHorizontal className="w-6 h-6 text-amber-400" />
          <span>Homepage Content & Layout Manager</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Customize homepage section visibility, hero banner titles, CTA buttons, and display order.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* HERO BANNER SECTION */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-sm font-semibold text-white border-b border-slate-800 pb-3">
            Homepage Hero Banner Content
          </h2>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Hero Main Heading</label>
            <input
              type="text"
              value={heroHeading}
              onChange={(e) => setHeroHeading(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Hero Subheading</label>
            <textarea
              rows={2}
              value={heroSubheading}
              onChange={(e) => setHeroSubheading(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Primary CTA Button Label</label>
              <input
                type="text"
                value={ctaPrimaryText}
                onChange={(e) => setCtaPrimaryText(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Primary CTA Link</label>
              <input
                type="text"
                value={ctaPrimaryLink}
                onChange={(e) => setCtaPrimaryLink(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
              />
            </div>
          </div>
        </div>

        {/* SECTION VISIBILITY TOGGLES */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-sm font-semibold text-white border-b border-slate-800 pb-3">
            Homepage Section Enable / Disable Toggles
          </h2>

          <div className="space-y-2">
            {sections.map((sec) => (
              <div
                key={sec.id}
                className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs text-slate-200"
              >
                <span>{sec.name}</span>
                <button
                  type="button"
                  onClick={() => toggleSection(sec.id)}
                  className={`px-3 py-1 rounded-lg text-[11px] font-semibold flex items-center space-x-1.5 transition ${
                    sec.enabled
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : "bg-slate-800 text-slate-500 border border-slate-700"
                  }`}
                >
                  {sec.enabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span>{sec.enabled ? "ENABLED" : "DISABLED"}</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs rounded-xl transition shadow flex items-center justify-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>Publish Homepage Changes</span>
        </button>
      </form>
    </div>
  );
}
