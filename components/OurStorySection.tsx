"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { MagneticButton } from "./MagneticButton";

export function OurStorySection() {
  return (
    <section className="w-full bg-[#fbf9f4] py-14 sm:py-20 lg:py-28 border-b border-[#e8e8e8]/60 relative overflow-hidden">
      {/* Background Watermark Editorial Typography (Prompt Rule 10) */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[20vw] font-serif-luxury text-black/[0.025] tracking-widest pointer-events-none uppercase whitespace-nowrap font-bold select-none">
        HERITAGE
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Artisan Image Plinth */}
          <ScrollReveal className="lg:col-span-6 relative" data-cursor="HANDCRAFTED">
            <div className="aspect-[4/3] lg:aspect-[5/4] w-full bg-[#eae8e3] overflow-hidden shadow-xl relative border border-[#e8e8e8] group metallic-sheen">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBm9djPwZEJmnBwrnJOyugw3K1dXyOFoFBsQlWX9ldLFh_vbR9-LPTghdf8ADtRWNou_BrsPb14xg1CABEcERdSy9Dvh2eMHy5X0QonrxgHsgvUE62ntAMUtrxHo0IUoqqbqQqnTcleKVO09O50BlQPMSbBKyi-eqF-gX1oYPk07VyuYMFY6C_H_KJAD4AlIjaT5XUozU-j5JrRoaNLgbEd5A2RpWsKQZpUpnFdrE3WbmZ8g7XUtxWs"
                alt="South Indian master silversmith meticulously chasing a silver plate"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-104"
              />
              <div className="absolute inset-0 bg-[#010101]/10 pointer-events-none" />
            </div>

            {/* Floating Glassmorphic Brand Emblem Box (Safely constrained to prevent horizontal bleed) */}
            <div className="hidden md:flex absolute -bottom-4 sm:-bottom-6 right-2 md:-right-4 lg:-right-6 w-40 sm:w-48 h-40 sm:h-48 glass-panel p-4 sm:p-5 shadow-2xl border border-[#e8e8e8] flex-col items-center justify-center text-center">
              <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-[#010101] text-[#c5a880] flex items-center justify-center font-serif-luxury font-bold text-lg sm:text-xl mb-2 shadow">
                S
              </div>
              <p className="font-serif-luxury text-xs font-semibold text-[#010101]">SRI BHAGAVATHI</p>
              <p className="font-sans-editorial text-[9px] uppercase tracking-widest text-[#725b38] font-bold">SILVERS • ESTD 1984</p>
            </div>
          </ScrollReveal>

          {/* Right Story Copy */}
          <ScrollReveal className="lg:col-span-6 flex flex-col justify-center lg:pl-6" delay={0.2}>
            <span className="font-sans-editorial text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#725b38] mb-2 font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#c5a880]" />
              Generations of Grace
            </span>

            <h2 className="font-serif-luxury text-2xl sm:text-4xl lg:text-5xl text-[#010101] mb-4 sm:mb-6 leading-tight font-normal">
              OUR STORY — <br />
              <span className="font-normal italic text-[#725b38]">Sri Bhagavathi Silvers</span>
            </h2>

            <p className="font-sans-editorial text-sm sm:text-lg text-[#1b1c19] mb-3 sm:mb-4 font-light leading-relaxed">
              Founded in the heritage-rich heart of Tamil Nadu, Sri Bhagavathi Silvers was born from a deep reverence for the sacred silver art of South Indian temples.
            </p>

            <p className="font-sans-editorial text-xs sm:text-base text-[#444748] mb-6 sm:mb-8 leading-relaxed">
              For decades, our atelier has partnered directly with generational families of silversmiths. Each anklet, pooja deepam, and intricate necklace is an ode to ritual sanctity and aesthetic purity. We reject mass machine stamping in favor of deliberate, soulful craft, ensuring every piece you welcome into your sanctuary carries blessings, unmatched weight integrity, and timeless luxury.
            </p>

            <div>
              <MagneticButton className="w-full sm:w-auto">
                <Link
                  href="/about-us"
                  className="btn-light-sweep w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#010101] text-[#ffffff] font-sans-editorial text-xs uppercase px-7 py-3.5 sm:py-4 tracking-[0.18em] hover:bg-[#262626] transition-colors shadow font-semibold group min-h-[44px]"
                >
                  <span>LEARN MORE ABOUT US</span>
                  <ArrowRight className="w-4 h-4 text-[#c5a880] transition-transform duration-300 group-hover:translate-x-1.5" />
                </Link>
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
