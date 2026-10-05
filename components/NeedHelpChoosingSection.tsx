"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { MessageSquare, MapPin, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp } from "@/lib/animations";

interface ConciergeSlide {
  eyebrow: string;
  heading: string;
  description: string;
}

const CONCIERGE_SLIDES: ConciergeSlide[] = [
  {
    eyebrow: "Personalized Concierge Guidance",
    heading: "NOT SURE WHAT TO CHOOSE?",
    description:
      "Whether selecting an auspicious silver kalash for housewarming, an infant nazariya, or custom traditional temple jewellery, our silver specialists are available to assist you.",
  },
  {
    eyebrow: "Artisanal Customization & Bespoke",
    heading: "BESPOKE SILVER HEIRLOOMS",
    description:
      "Collaborate directly with our master silversmiths to customize bridal silverware sets, engraved pooja articles, and sacred deity idols tailored to your cherished traditions.",
  },
  {
    eyebrow: "Heritage Purity Assurance",
    heading: "CERTIFIED 925 & 999 PURITY",
    description:
      "Every handcrafted piece features verified BIS laser hallmarking stamps, ensuring generations of sacred value, enduring luster, and complete peace of mind.",
  },
];

export function NeedHelpChoosingSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CONCIERGE_SLIDES.length);
    }, 7000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  const slide = CONCIERGE_SLIDES[currentSlide];

  return (
    <section className="py-20 lg:py-28 bg-[#f5f3ee] border-b border-[#e8e8e8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative rounded-none border border-[#c5a880]/25 overflow-hidden bg-[#0a0806] text-[#ffffff] p-8 sm:p-12 lg:p-16 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.3)] metallic-sheen"
        >
          {/* Subtle Top & Bottom Gold Ambient Hairlines */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#c5a880]/40 to-transparent z-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#c5a880]/20 to-transparent z-20 pointer-events-none" />

          {/* Micro Corner Accent Marks */}
          <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-[#c5a880]/40 pointer-events-none z-20 hidden sm:block" />
          <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-[#c5a880]/40 pointer-events-none z-20 hidden sm:block" />

          {/* Background Editorial Lifestyle Image with Gentle Ambient Scale */}
          <motion.div
            className="absolute inset-0 z-0"
            initial={{ scale: 1 }}
            animate={{ scale: 1.02 }}
            transition={{
              duration: 12,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDL4ZHJballUMddbhgvJ07QygDrNZxq2vQ-msqoHsNhByUh7jbOpM6vrXsxNPn-bv3etyswE4p5D8FlXWIbkXViizn276ukWrMdMVxvTG3kc6ZN2GM4abAixgMDSG4cW7A3B1EQm5ZX--xTLPQLPh4PDvu8Lomk5lAERZylDSVs0cLlKYCg_jSlE2K0JyQFBXi1mCnz-IqFnOJTC9no3pXWc_zdYfU4wz3yk8Q2SbiVh8D5bPZIhxD7"
              alt="Sri Bhagavathi Silvers Boutique Consultation"
              className="w-full h-full object-cover object-center opacity-75"
            />
          </motion.div>

          {/* Multi-tier Editorial Overlay: Left-dark for crisp readability, lighter on right to reveal photograph */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0806] via-[#0a0806]/92 sm:via-[#0a0806]/85 md:via-[#0a0806]/65 to-[#0a0806]/15 z-10 pointer-events-none" />
          
          {/* Vertical Gradient for mobile text isolation */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0806]/95 via-transparent to-transparent sm:hidden z-10 pointer-events-none" />

          {/* Subtle Warm Amber/Gold Ambient Tone */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#c5a880]/15 via-transparent to-transparent z-10 pointer-events-none" />

          {/* Content Area */}
          <div className="relative z-20 max-w-2xl min-h-[290px] sm:min-h-[270px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4 sm:space-y-5"
              >
                {/* Refined Eyebrow with Fine Gold Accent Lines */}
                <div className="inline-flex items-center gap-2.5 text-[#c5a880] font-sans-editorial text-[11px] sm:text-xs uppercase tracking-[0.28em] font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-[#c5a880]" />
                  <span>{slide.eyebrow}</span>
                  <span className="w-8 sm:w-12 h-[1px] bg-gradient-to-r from-[#c5a880]/60 to-transparent inline-block" />
                </div>

                {/* Editorial Serif Heading */}
                <h2 className="font-serif-luxury font-light text-3xl sm:text-4xl lg:text-[2.75rem] text-[#fbf9f4] tracking-tight leading-[1.16]">
                  {slide.heading}
                </h2>

                {/* Supporting Text */}
                <p className="font-sans-editorial text-sm sm:text-base text-[#d8d3c8] leading-relaxed max-w-[640px] font-normal">
                  {slide.description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Upgraded Dual CTA Buttons */}
            <div className="pt-7 sm:pt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
              {/* Primary CTA: Talk to an Expert */}
              <a
                href="https://wa.me/919876543210?text=Hello%20Sri%20Bhagavathi%20Silvers%2C%20I%20would%20like%20expert%20assistance%20choosing%20a%20silver%20piece."
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 h-[50px] sm:h-[52px] bg-[#c5a880] text-[#0a0806] font-sans-editorial text-[11px] sm:text-xs uppercase tracking-[0.2em] font-semibold btn-light-sweep hover:bg-[#d6bc96] transition-all duration-300 hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(197,168,128,0.22)]"
              >
                <MessageSquare className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                <span>Talk to an Expert</span>
              </a>

              {/* Secondary CTA: Visit Our Showroom */}
              <Link
                href="/visit-our-store"
                className="group inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 h-[50px] sm:h-[52px] bg-transparent border border-[#c5a880]/50 hover:border-[#c5a880] text-[#fbf9f4] font-sans-editorial text-[11px] sm:text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#c5a880]/10 hover:-translate-y-0.5 transition-all duration-300"
              >
                <MapPin className="w-4 h-4 text-[#c5a880] transition-transform duration-300 group-hover:scale-110" />
                <span>Visit Our Showroom</span>
              </Link>
            </div>
          </div>

          {/* Refined Carousel Indicators */}
          <div className="relative z-20 mt-8 sm:mt-10 pt-4 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {CONCIERGE_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Go to concierge slide ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentSlide === idx
                      ? "w-8 bg-[#c5a880]"
                      : "w-2 bg-[#c5a880]/30 hover:bg-[#c5a880]/60"
                  }`}
                />
              ))}
            </div>

            <div className="text-[11px] font-sans-editorial tracking-widest uppercase text-[#c5a880]/80">
              0{currentSlide + 1} <span className="text-white/30">/</span> 0{CONCIERGE_SLIDES.length}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
