"use client";

import { useState, useEffect } from "react";
import { Sparkles, MessageSquare, PenTool, Hammer, ShieldCheck, Plus, Edit } from "lucide-react";

export default function AdminCustomizedPage() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    // Seeded customized showcase pieces
    setItems([
      {
        id: "c1",
        name: "Custom 925 Silver Door Name Plate",
        category: "Name Plates",
        image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1000&q=85",
        occasions: ["Housewarming", "Gifting"],
        description: "Hand-engraved sterling silver house plaque with Peacock & Lotus Agamic borders.",
      },
      {
        id: "c2",
        name: "Sacred 999 Fine Silver Temple Idol Crown",
        category: "Idols & Shrines",
        image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=85",
        occasions: ["Pooja", "Housewarming"],
        description: "Custom consecrated Kireetam crown with embedded ruby cabochons.",
      },
    ]);
  }, []);

  const steps = [
    { step: "01", title: "Consultation & Design Idea", icon: MessageSquare, desc: "Share your vision, dimensions, or family crest idea via WhatsApp or in-store appointment." },
    { step: "02", title: "Custom 3D CAD & Artisanal Sketch", icon: PenTool, desc: "Our master designers create precision 3D CAD renders and hand-sketches for your approval." },
    { step: "03", title: "Artisanal Handcrafted Forging", icon: Hammer, desc: "Crafted in 999 fine or 925 silver with traditional hand-chasing techniques." },
    { step: "04", title: "BIS Certification & Velvet Delivery", icon: ShieldCheck, desc: "Inspected, hallmarked, and packaged in a luxury velvet presentation chest." },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight flex items-center space-x-2">
          <Sparkles className="w-6 h-6 text-amber-400" />
          <span>Customized Silver Module Management</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage showcase custom pieces, customization process steps, and custom order options.
        </p>
      </div>

      {/* HOW IT WORKS PROCESS STEPS */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h2 className="text-sm font-semibold text-white border-b border-slate-800 pb-3 flex items-center justify-between">
          <span>"How It Works" Customization Process (4 Steps)</span>
          <span className="text-[10px] text-amber-400 font-mono">PUBLIC /customized PAGE</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 relative">
                <span className="text-[10px] font-bold text-amber-400 font-mono">STEP {s.step}</span>
                <div className="flex items-center space-x-2">
                  <Icon className="w-4 h-4 text-amber-400 shrink-0" />
                  <h3 className="font-semibold text-slate-200 text-xs truncate">{s.title}</h3>
                </div>
                <p className="text-[11px] text-slate-400">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* CUSTOM SHOWCASE ITEMS */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-sm font-semibold text-white">Customized Showcase Gallery Items</h2>
          <button className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs rounded-xl flex items-center space-x-1">
            <Plus className="w-3.5 h-3.5" />
            <span>Add Custom Piece</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map((item) => (
            <div key={item.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start space-x-4">
              <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover border border-slate-700 shrink-0" />
              <div className="space-y-1">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {item.category}
                </span>
                <h3 className="font-semibold text-white text-xs mt-1">{item.name}</h3>
                <p className="text-[11px] text-slate-400">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
