"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, PenTool, CheckCircle2 } from "lucide-react";

interface IdeaToCreationTransitionProps {
  onStartEnquiry?: () => void;
}

export function IdeaToCreationTransition({ onStartEnquiry }: IdeaToCreationTransitionProps) {
  const [activeTab, setActiveTab] = useState<"sketch" | "finished">("finished");

  const showcaseItem = {
    title: "Heritage Engraved 925 Silver House Nameplate",
    category: "Custom Name Plate",
    sketchImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
    finishedImage: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=85",
    sketchNotes: "Client concept drawing showing custom Tamil surname font request with lotus filigree surround.",
    finishedNotes: "Completed solid 925 sterling silver plaque with deep hand repoussé borders and mirror polish finish.",
  };

  return (
    <section className="py-20 bg-[#ffffff] border-b border-[#e8e8e8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Story & Controls */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#f5f3ee] border border-[#e8e8e8] text-[#725b38]">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="font-sans-editorial text-[11px] uppercase tracking-[0.25em] font-bold">
                Atelier Transformation
              </span>
            </div>

            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#010101] tracking-wide leading-tight">
              FROM IDEA TO CREATION
            </h2>

            <p className="font-sans-editorial text-xs sm:text-sm text-[#444748] leading-relaxed">
              Witness how a client&apos;s rough sketch or architectural concept evolves through master craftsmanship into a hallmarked silver heirloom.
            </p>

            {/* Interactive Toggle Pill */}
            <div className="inline-flex bg-[#f5f3ee] p-1 border border-[#e8e8e8]">
              <button
                type="button"
                suppressHydrationWarning
                onClick={() => setActiveTab("sketch")}
                className={`px-5 py-2 text-xs font-sans-editorial uppercase tracking-wider font-bold transition-all flex items-center gap-2 ${
                  activeTab === "sketch"
                    ? "bg-[#010101] text-white shadow-sm"
                    : "text-[#444748] hover:text-[#010101]"
                }`}
              >
                <PenTool className="w-3.5 h-3.5 text-[#c5a880]" /> 01. Custom Concept
              </button>

              <button
                type="button"
                suppressHydrationWarning
                onClick={() => setActiveTab("finished")}
                className={`px-5 py-2 text-xs font-sans-editorial uppercase tracking-wider font-bold transition-all flex items-center gap-2 ${
                  activeTab === "finished"
                    ? "bg-[#010101] text-white shadow-sm"
                    : "text-[#444748] hover:text-[#010101]"
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#c5a880]" /> 02. Crafted Silver
              </button>
            </div>

            {/* Stage Description Card */}
            <div className="p-6 bg-[#fbf9f4] border border-[#e8e8e8] space-y-2">
              <span className="font-sans-editorial text-[10px] uppercase tracking-[0.2em] text-[#725b38] font-bold block">
                {activeTab === "sketch" ? "Stage 01: Client Brief & CAD Blueprint" : "Stage 02: Hand Carved 925 Silver Piece"}
              </span>
              <h3 className="font-serif-luxury text-lg text-[#010101]">
                {activeTab === "sketch" ? "Conceptual Blueprint & Proportions" : "Finished Hallmarked Masterpiece"}
              </h3>
              <p className="font-sans-editorial text-xs text-[#444748] leading-relaxed">
                {activeTab === "sketch" ? showcaseItem.sketchNotes : showcaseItem.finishedNotes}
              </p>
            </div>

            {onStartEnquiry && (
              <button
                type="button"
                suppressHydrationWarning
                onClick={onStartEnquiry}
                className="bg-[#725b38] hover:bg-[#010101] text-white px-6 py-3 font-sans-editorial text-xs uppercase tracking-[0.18em] font-bold inline-flex items-center gap-2 transition-all shadow-sm"
              >
                Bring Your Concept To Life <ArrowRight className="w-4 h-4 text-[#c5a880]" />
              </button>
            )}
          </div>

          {/* Right Column: Visual Presentation Frame */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] bg-[#f5f3ee] border border-[#e8e8e8] shadow-xl overflow-hidden group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeTab}
                  src={activeTab === "sketch" ? showcaseItem.sketchImage : showcaseItem.finishedImage}
                  alt={showcaseItem.title}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Metallic Sheen Effect on Finished Image */}
              {activeTab === "finished" && (
                <div
                  className="absolute inset-0 pointer-events-none z-10"
                  style={{
                    background:
                      "linear-gradient(115deg, transparent 0%, rgba(255,255,255,0.03) 35%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.03) 65%, transparent 100%)",
                  }}
                />
              )}

              {/* Bottom Tag Overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#fbf9f4]/95 backdrop-blur-md p-4 border border-[#e8e8e8] flex items-center justify-between z-20">
                <div>
                  <span className="font-sans-editorial text-[10px] uppercase tracking-wider text-[#725b38] font-bold block">
                    {showcaseItem.category}
                  </span>
                  <h4 className="font-serif-luxury text-sm text-[#010101] font-semibold">{showcaseItem.title}</h4>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    suppressHydrationWarning
                    onClick={() => setActiveTab(activeTab === "sketch" ? "finished" : "sketch")}
                    className="px-3 py-1.5 bg-[#010101] text-white text-[10px] font-sans-editorial uppercase tracking-wider font-bold hover:bg-[#725b38] transition-colors"
                  >
                    Toggle Stage ⚡
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
