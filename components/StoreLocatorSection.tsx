"use client";

import React, { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { MapPin, Navigation, Phone, Clock, ArrowRight, ExternalLink, ShieldCheck, Compass } from "lucide-react";
import { STORE_CONFIG } from "@/lib/storeConfig";

export function StoreLocatorSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  const mapReveal = {
    hidden: { opacity: 0, scale: 1.03 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" as const } },
  };

  const markerAnim = {
    hidden: { opacity: 0, scale: 0.7 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, delay: 0.4, ease: "backOut" as const } },
  };

  return (
    <section
      id="visit-our-store"
      ref={sectionRef}
      className="py-20 lg:py-28 bg-[#fbf9f4] border-b border-[#e8e8e8] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid: Desktop Side-by-Side / Mobile Stacked */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: Store Editorial Information */}
          <motion.div
            initial={prefersReducedMotion ? false : "hidden"}
            animate={isInView ? "visible" : "hidden"}
            variants={fadeUp}
            className="lg:col-span-5 flex flex-col justify-between space-y-8"
          >
            <div>
              {/* Category Tag */}
              <div className="inline-flex items-center gap-2 text-[#725b38] font-sans-editorial text-xs uppercase tracking-[0.25em] font-semibold mb-3">
                <Compass className="w-4 h-4 text-[#c5a880]" />
                <span>PHYSICAL SHOWROOM</span>
              </div>

              {/* Headline */}
              <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl text-[#010101] tracking-tight mb-4">
                VISIT SRI BHAGAVATHI SILVERS
              </h2>

              {/* Subtitle */}
              <p className="font-serif-luxury text-xl text-[#725b38] italic mb-6">
                Experience our collection in person.
              </p>

              <p className="font-sans-editorial text-sm text-[#444748] leading-relaxed mb-8">
                Step into our Coimbatore flagship boutique to admire the weight, purity, and sacred elegance of certified 925 sterling & 999 fine silver heirlooms in an intimate setting.
              </p>

              {/* Address Block with Hover Micro-Interaction */}
              <div className="bg-[#ffffff] p-6 border border-[#e8e8e8] rounded-sm shadow-sm group hover:border-[#725b38] transition-colors duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#f5f3ee] text-[#725b38] rounded-full group-hover:translate-y-[-2px] group-hover:bg-[#725b38] group-hover:text-[#ffffff] transition-all duration-300 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>

                  <div className="space-y-1 font-sans-editorial">
                    <span className="text-[11px] uppercase tracking-widest text-[#725b38] font-bold block">
                      FLAGSHIP SHOWROOM ADDRESS
                    </span>
                    <h3 className="font-serif-luxury text-lg font-bold text-[#010101]">
                      {STORE_CONFIG.address.building}
                    </h3>
                    <p className="text-sm text-[#444748]">
                      {STORE_CONFIG.address.doorNo}, {STORE_CONFIG.address.street}, {STORE_CONFIG.address.area}
                    </p>
                    <p className="text-sm font-semibold text-[#010101]">
                      {STORE_CONFIG.address.city}, {STORE_CONFIG.address.state} – {STORE_CONFIG.address.pincode}
                    </p>
                  </div>
                </div>
              </div>

              {/* Verified Store Hours */}
              <div className="flex items-center gap-3 mt-4 text-xs font-sans-editorial text-[#444748] bg-[#f5f3ee] p-4 border border-[#e8e8e8]">
                <Clock className="w-4 h-4 text-[#725b38] shrink-0" />
                <span>
                  <strong className="text-[#010101]">Boutique Hours:</strong> {STORE_CONFIG.hours}
                </span>
              </div>
            </div>

            {/* CTAs Row: GET DIRECTIONS (Primary) & CALL STORE */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4 border-t border-[#e8e8e8]">
              {/* Primary GET DIRECTIONS Button */}
              <a
                suppressHydrationWarning
                href={STORE_CONFIG.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get directions to Sri Bhagavathi Silvers on Google Maps"
                className="btn-light-sweep px-8 py-4 bg-[#010101] hover:bg-[#725b38] text-[#ffffff] font-sans-editorial text-xs uppercase tracking-[0.2em] font-bold transition-all shadow-lg flex items-center justify-center gap-3 group active:scale-95"
              >
                <Navigation className="w-4 h-4 text-[#c5a880] group-hover:text-[#ffffff]" />
                <span>GET DIRECTIONS</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
              </a>

              {/* Secondary CALL STORE Button */}
              {STORE_CONFIG.phone && (
                <a
                  suppressHydrationWarning
                  href={`tel:${STORE_CONFIG.phoneRaw}`}
                  aria-label="Call Sri Bhagavathi Silvers store"
                  className="px-6 py-4 bg-[#ffffff] hover:bg-[#f5f3ee] text-[#010101] border border-[#e8e8e8] hover:border-[#725b38] font-sans-editorial text-xs uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-2 group active:scale-95"
                >
                  <Phone className="w-4 h-4 text-[#725b38]" />
                  <span>CALL STORE</span>
                </a>
              )}
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Functional Map Presentation with Glass Overlay & Refined Marker */}
          <motion.div
            initial={prefersReducedMotion ? false : "hidden"}
            animate={isInView ? "visible" : "hidden"}
            variants={mapReveal}
            className="lg:col-span-7"
          >
            <div className="relative bg-[#ffffff] border border-[#e8e8e8] p-2 shadow-2xl group hover:border-[#725b38]/60 transition-all duration-500 rounded-sm overflow-hidden">
              
              {/* Map Container */}
              <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full bg-[#f5f3ee] overflow-hidden rounded-sm">
                
                {/* Embed Map iFrame */}
                <iframe
                  title="Sri Bhagavathi Silvers Store Location Map"
                  src={STORE_CONFIG.embedMapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full grayscale-[25%] contrast-[105%] group-hover:grayscale-0 transition-all duration-700"
                />

                {/* VISUAL REFINED STORE MARKER BADGE OVERLAY */}
                <motion.div
                  initial={prefersReducedMotion ? false : "hidden"}
                  animate={isInView ? "visible" : "hidden"}
                  variants={markerAnim}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 hidden sm:flex flex-col items-center"
                >
                  <div className="bg-[#010101] text-[#ffffff] px-3.5 py-1.5 rounded-full shadow-2xl border border-[#c5a880] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#c5a880] animate-pulse" />
                    <span className="font-serif-luxury text-xs font-bold tracking-wide text-[#ffffff]">
                      SRI BHAGAVATHI SILVERS
                    </span>
                  </div>
                  <div className="w-3 h-3 bg-[#010101] border-r border-b border-[#c5a880] transform rotate-45 -mt-1.5" />
                </motion.div>

                {/* FLOATING GLASS INFORMATION STORE CARD OVERLAY */}
                <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs bg-[#0a0b0d]/90 backdrop-blur-md p-4 border border-[#c5a880]/30 rounded-sm shadow-2xl z-20 text-[#ffffff] group-hover:border-[#c5a880]/60 transition-colors duration-300">
                  <span className="font-sans-editorial text-[10px] uppercase tracking-widest text-[#c5a880] font-bold block mb-1">
                    FLAGSHIP BOUTIQUE
                  </span>
                  <h4 className="font-serif-luxury text-base font-semibold text-[#ffffff] mb-1">
                    SRI BHAGAVATHI SILVERS
                  </h4>
                  <p className="font-sans-editorial text-xs text-[#a4a7a7] mb-3 leading-tight">
                    714, Vasavi Towers, Raja St, Town Hall, Coimbatore
                  </p>

                  <a
                    suppressHydrationWarning
                    href={STORE_CONFIG.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open directions to Sri Bhagavathi Silvers on Google Maps"
                    className="inline-flex items-center gap-1.5 font-sans-editorial text-[11px] font-bold text-[#c5a880] hover:text-[#ffffff] transition-colors"
                  >
                    <span>OPEN IN GOOGLE MAPS</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 10. COMPACT "HOW TO REACH US" ROW BENEATH MAP */}
        <div className="mt-12 bg-[#ffffff] border border-[#e8e8e8] p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#f5f3ee] text-[#725b38] rounded-full shrink-0">
              <Navigation className="w-5 h-5" />
            </div>
            <div>
              <span className="font-sans-editorial text-[10px] uppercase tracking-widest text-[#725b38] font-bold block">
                HOW TO REACH US
              </span>
              <p className="font-sans-editorial text-xs text-[#444748]">
                📍 <strong>Town Hall Heritage Zone:</strong> Located on Raja Street inside Vasavi Towers, Coimbatore.
              </p>
            </div>
          </div>

          <a
            suppressHydrationWarning
            href={STORE_CONFIG.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Google Maps destination for Sri Bhagavathi Silvers"
            className="font-sans-editorial text-xs font-bold text-[#010101] hover:text-[#725b38] flex items-center gap-1.5 uppercase tracking-wider shrink-0"
          >
            <span>Open Google Maps</span>
            <ExternalLink className="w-4 h-4 text-[#725b38]" />
          </a>
        </div>
      </div>
    </section>
  );
}
