"use client";

import React from "react";
import { motion } from "framer-motion";
import { Navigation, ArrowRight, Sparkles } from "lucide-react";
import { STORE_CONFIG } from "@/lib/storeConfig";

export function ShowroomFinalCTA() {
  return (
    <section className="relative w-full py-20 lg:py-28 bg-[#0a0b0d] text-[#ffffff] overflow-hidden border-t border-[#c5a880]/20">
      {/* Editorial Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=2000&q=85"
          alt="Sri Bhagavathi Silvers Showroom Crafts"
          className="w-full h-full object-cover object-center opacity-25 filter grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0d] via-[#0a0b0d]/80 to-transparent" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {/* Header Tag */}
          <div className="inline-flex items-center justify-center gap-2 text-[#c5a880] font-sans-editorial text-xs uppercase tracking-[0.25em] font-semibold">
            <Sparkles className="w-4 h-4 text-[#c5a880]" />
            <span>SEE YOU AT THE SHOWROOM</span>
          </div>

          {/* Editorial Headline */}
          <h2 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl tracking-tight text-[#ffffff] max-w-3xl mx-auto leading-tight">
            SEE THE SILVER. <br />
            <span className="italic font-normal text-[#c5a880]">FEEL THE CRAFT.</span>
          </h2>

          <p className="font-sans-editorial text-sm sm:text-base text-[#a4a7a7] max-w-xl mx-auto leading-relaxed">
            Experience Sri Bhagavathi Silvers in person. Discover traditional 925 sterling & 999 fine silver heirlooms crafted by master artisans.
          </p>

          <p className="font-sans-editorial text-xs text-[#c5a880] font-semibold tracking-wider uppercase">
            {STORE_CONFIG.address.building}, {STORE_CONFIG.address.street}, {STORE_CONFIG.address.area}, {STORE_CONFIG.address.city}
          </p>

          {/* GET DIRECTIONS Button */}
          <div className="pt-4 flex justify-center">
            <a
              suppressHydrationWarning
              href={STORE_CONFIG.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get directions to Sri Bhagavathi Silvers showroom"
              className="btn-light-sweep px-9 py-4 bg-[#c5a880] hover:bg-[#ffffff] text-[#010101] font-sans-editorial text-xs uppercase tracking-[0.2em] font-bold transition-all shadow-2xl flex items-center justify-center gap-3 group active:scale-95"
            >
              <Navigation className="w-4 h-4 text-[#010101]" />
              <span>GET DIRECTIONS</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
