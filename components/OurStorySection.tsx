"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { MagneticButton } from "./MagneticButton";

export function OurStorySection() {
  return (
    <section className="w-full bg-[#fbf9f4] py-20 sm:py-28 border-b border-[#e8e8e8]/60 relative overflow-hidden">
      {/* Background Watermark Editorial Typography (Prompt Rule 10) */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[20vw] font-serif-luxury text-black/[0.025] tracking-widest pointer-events-none uppercase whitespace-nowrap font-bold select-none">
        HERITAGE
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
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

            {/* Floating Glassmorphic Brand Emblem Box (Prompt Rule 21) */}
            <div className="hidden sm:flex absolute -bottom-6 -right-6 w-48 h-48 glass-panel p-5 shadow-2xl border border-[#e8e8e8] flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-full bg-[#010101] text-[#c5a880] flex items-center justify-center font-serif-luxury font-bold text-xl mb-2 shadow">
                S
              </div>
              <p className="font-serif-luxury text-xs font-semibold text-[#010101]">SRI BHAGAVATHI</p>
              <p className="font-sans-editorial text-[9px] uppercase tracking-widest text-[#725b38] font-bold">SILVERS • ESTD 1984</p>
            </div>
          </ScrollReveal>

          {/* Right Story Copy */}
          <ScrollReveal className="lg:col-span-6 flex flex-col justify-center lg:pl-6" delay={0.2}>
            <span className="font-sans-editorial text-[11px] uppercase tracking-[0.25em] text-[#725b38] mb-2 font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#c5a880]" />
              Generations of Grace
            </span>

            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl text-[#010101] mb-6 leading-tight font-normal">
              OUR STORY — <br />
              <span className="font-normal italic text-[#725b38]">Sri Bhagavathi Silvers</span>
            </h2>

            <p className="font-sans-editorial text-base sm:text-lg text-[#1b1c19] mb-4 font-light leading-relaxed">
              Founded in the heritage-rich heart of Tamil Nadu, Sri Bhagavathi Silvers was born from a deep reverence for the sacred silver art of South Indian temples.
            </p>

            <p className="font-sans-editorial text-sm sm:text-base text-[#444748] mb-8 leading-relaxed">
              For decades, our atelier has partnered directly with generational families of silversmiths. Each anklet, pooja deepam, and intricate necklace is an ode to ritual sanctity and aesthetic purity. We reject mass machine stamping in favor of deliberate, soulful craft, ensuring every piece you welcome into your sanctuary carries blessings, unmatched weight integrity, and timeless luxury.
            </p>

            <div>
              <MagneticButton>
                <Link
                  href="/about-us"
                  className="btn-light-sweep inline-flex items-center gap-2 bg-[#010101] text-[#ffffff] font-sans-editorial text-xs uppercase px-7 py-4 tracking-[0.18em] hover:bg-[#262626] transition-colors shadow font-semibold group"
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
