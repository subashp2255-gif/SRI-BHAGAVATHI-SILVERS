"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, ArrowUpRight, X, ExternalLink, RefreshCw, ShieldCheck, Sparkles } from "lucide-react";
import { instagramProfile } from "@/data/instagram";

interface InstagramModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InstagramModal({ isOpen, onClose }: InstagramModalProps) {
  const [iframeLoading, setIframeLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"profile" | "embed">("profile");

  // Lock Body Scroll & Keyboard Escape Listener
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-label="Sri Bhagavathi Silvers Official Instagram Account"
      >
        {/* Dark Frosted Glass Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0f0f0f]/80 backdrop-blur-md"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: -10 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-[#171716] text-[#F7F4EE] w-[96vw] sm:w-[90vw] max-w-[1050px] max-h-[92vh] border border-white/10 shadow-2xl rounded-lg z-10 overflow-hidden my-auto flex flex-col"
        >
          {/* Signature Metallic Silver Light Sweep Line */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C4AD80] to-transparent pointer-events-none z-30"
          />

          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/10 bg-white/[0.04] backdrop-blur-md relative z-20">
            {/* Left: Profile Handle & Logo */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="shrink-0 flex items-center justify-center py-0.5">
                <img
                  src="/logo-dark.png"
                  alt={instagramProfile.name}
                  className="h-12 sm:h-14 w-auto object-contain filter drop-shadow-[0_2px_10px_rgba(196,173,128,0.35)]"
                />
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-serif-luxury text-base sm:text-lg font-bold text-[#F7F4EE] tracking-wide">
                    @{instagramProfile.username}
                  </span>
                  <span className="px-2 py-0.5 bg-[#C4AD80] text-[#171716] font-sans-editorial text-[9px] font-bold uppercase tracking-wider rounded-full">
                    OFFICIAL ACCOUNT
                  </span>
                </div>
                <span className="font-sans-editorial text-xs text-[#BFC3C6] font-medium tracking-wider">
                  {instagramProfile.name} • Authentic Hallmark Silver
                </span>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href={instagramProfile.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Sri Bhagavathi Silvers Instagram profile in new tab"
                className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#C4AD80] hover:bg-[#F7F4EE] text-[#171716] font-sans-editorial font-bold text-xs uppercase tracking-wider rounded transition-all flex items-center gap-1.5 shadow-sm group"
              >
                <span>OPEN INSTAGRAM</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#171716] group-hover:translate-x-0.5 transition-transform" />
              </a>

              <button
                type="button"
                suppressHydrationWarning
                onClick={onClose}
                aria-label="Close Instagram Modal"
                className="p-2 text-[#BFC3C6] hover:text-[#F7F4EE] hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Body — Real Live Instagram Embed Window */}
          <div className="flex-grow flex flex-col p-3 sm:p-5 overflow-y-auto bg-[#121211]">
            <div className="relative w-full flex-grow min-h-[500px] sm:min-h-[580px] bg-[#171716] border border-white/10 rounded-lg overflow-hidden flex flex-col items-center justify-center">
              {/* Loader Skeleton */}
              {iframeLoading && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#171716] p-6 text-center">
                  <div className="w-12 h-12 rounded-full border-2 border-[#C4AD80] border-t-transparent animate-spin mb-3" />
                  <span className="font-sans-editorial text-xs text-[#BFC3C6] font-medium tracking-wider">
                    Loading @sbs_sribagavathisilvers Live Instagram Feed...
                  </span>
                </div>
              )}

              {/* Official Live Instagram Profile Embed Iframe */}
              <iframe
                src="https://www.instagram.com/sbs_sribagavathisilvers/embed"
                title="Sri Bhagavathi Silvers Instagram Live Account"
                className="w-full h-full min-h-[500px] sm:min-h-[580px] border-0 rounded-lg relative z-0 bg-[#171716]"
                onLoad={() => setIframeLoading(false)}
              />
            </div>
          </div>

          {/* Footer Bar */}
          <div className="p-3 sm:p-4 bg-[#171716] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-sans-editorial">
            <div className="flex items-center gap-2 text-[#BFC3C6] text-[11px]">
              <ShieldCheck className="w-4 h-4 text-[#C4AD80]" />
              <span>Official Instagram Account for Sri Bhagavathi Silvers • Coimbatore</span>
            </div>

            <a
              href={instagramProfile.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white/10 hover:bg-[#C4AD80] text-[#F7F4EE] hover:text-[#171716] border border-white/15 rounded text-[11px] font-bold uppercase tracking-wider transition-all flex items-center gap-2"
            >
              <Instagram className="w-4 h-4" />
              <span>FOLLOW @sbs_sribagavathisilvers ON INSTAGRAM</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
