"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Sparkles, Shield, Compass, HeartHandshake } from "lucide-react";
import Link from "next/link";

const JOURNEY_STEPS = [
  {
    id: "01",
    phase: "RAW MATERIAL",
    title: "92.5% Pure Sterling Bullion",
    subtitle: "Sourced from Certified Refineries",
    description:
      "Every masterpiece starts with unblemished sterling bullion, tested to strict 925 purity specifications before touching our artisans' hearth.",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=85",
    icon: Sparkles,
  },
  {
    id: "02",
    phase: "HERITAGE CRAFT",
    title: "Centuries of Silversmithing",
    subtitle: "Hand-Carved Molds & Filigree",
    description:
      "Master craftsmen with generational heritage shape raw silver into intricate traditional forms, nakshi engravings, and solid article plinths.",
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=85",
    icon: Compass,
  },
  {
    id: "03",
    phase: "INTRICATE DETAIL",
    title: "Polished to Perfection",
    subtitle: "Anti-Tarnish Protective Shield",
    description:
      "Precision buffing yields a radiant mirror luster. Specialized anti-tarnish formulation ensures long-lasting brilliance across all climate conditions.",
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=85",
    icon: Shield,
  },
  {
    id: "04",
    phase: "HEIRLOOM LEGACY",
    title: "BIS Hallmarked Guarantee",
    subtitle: "Passed Down Through Generations",
    description:
      "Stamped with official government BIS hallmark laser certification, packaged in signature velvet boxes designed to honor life's finest milestones.",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=85",
    icon: HeartHandshake,
  },
];

export function SilverJourneyHorizontal() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <>
      {/* MOBILE & SMALL TABLET VIEW (< md): Touch-friendly snap carousel */}
      <section className="md:hidden bg-[#010101] text-[#ffffff] py-14 sm:py-20 px-4 sm:px-6 relative overflow-hidden border-t border-[#1c1c1c]">
        {/* Ambient Top Glow */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#c5a880] via-[#010101] to-[#010101]" />

        {/* Background Watermark Typography */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 text-[18vw] font-serif-luxury text-white/[0.02] tracking-widest pointer-events-none uppercase whitespace-nowrap font-bold select-none">
          CRAFT
        </div>

        {/* Section Header */}
        <div className="relative z-10 mb-8 max-w-lg">
          <span className="font-sans-editorial text-[11px] uppercase tracking-[0.3em] text-[#c5a880] block font-bold mb-2">
            Visual Storytelling
          </span>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[#ffffff] leading-tight mb-3 font-medium">
            The Journey of Silver
          </h2>
          <p className="font-sans-editorial text-xs sm:text-sm text-[#c4c7c7] leading-relaxed mb-4">
            From unrefined bullion to hallmarked heirloom. Trace the meticulous steps of authentic Indian silversmithing.
          </p>
          <div className="flex items-center gap-2 font-sans-editorial text-[11px] uppercase tracking-widest text-[#c5a880]">
            <span>Swipe to Explore</span>
            <ArrowRight className="w-3.5 h-3.5 animate-pulse" />
          </div>
        </div>

        {/* Mobile Horizontal Touch Track */}
        <div className="relative z-10 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 pt-1 -mx-4 px-4 scrollbar-none touch-pan-x">
          {JOURNEY_STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.id}
                className="w-[86vw] xs:w-[82vw] sm:w-[70vw] shrink-0 snap-center bg-[#0d0d0d] border border-[#ffffff]/10 p-5 flex flex-col justify-between metallic-sheen"
              >
                {/* Header */}
                <div className="flex items-start justify-between border-b border-[#ffffff]/10 pb-4 mb-4">
                  <div>
                    <span className="font-sans-editorial text-[10px] uppercase tracking-[0.25em] text-[#c5a880] font-bold block mb-0.5">
                      PHASE {step.id}
                    </span>
                    <h3 className="font-sans-editorial text-xs uppercase tracking-[0.2em] text-[#ffffff] font-semibold">
                      {step.phase}
                    </h3>
                  </div>
                  <div className="p-2.5 bg-[#1b1c19] border border-[#ffffff]/15 text-[#c5a880]">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3 mb-4">
                  <h4 className="font-serif-luxury text-lg text-[#ffffff] leading-snug">
                    {step.title}
                  </h4>
                  <p className="font-sans-editorial text-[11px] text-[#c5a880] uppercase tracking-wider font-semibold">
                    {step.subtitle}
                  </p>
                  <p className="font-sans-editorial text-xs text-[#a4a7a7] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden border border-[#ffffff]/15 mb-4">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    sizes="85vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/80 via-transparent to-transparent" />
                </div>

                {/* Footer Link */}
                <div className="pt-3 border-t border-[#ffffff]/10 flex items-center justify-between text-[11px] font-sans-editorial">
                  <span className="text-[#747878] uppercase tracking-wider text-[10px]">
                    Sri Bhagavathi Standard
                  </span>
                  <Link
                    href="/about-us"
                    className="text-[#c5a880] hover:text-[#ffffff] transition-colors flex items-center gap-1 font-semibold uppercase tracking-wider"
                  >
                    <span>Purity Info</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* DESKTOP & LARGE TABLET VIEW (md+): Sticky horizontal scroll */}
      <section ref={targetRef} className="hidden md:block relative h-[300vh] bg-[#010101] text-[#ffffff] border-t border-[#1c1c1c]">
        {/* Sticky Container */}
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          {/* Ambient Top Glow */}
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#c5a880] via-[#010101] to-[#010101]" />

          {/* Background Watermark Typography */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-serif-luxury text-white/[0.02] tracking-widest pointer-events-none uppercase whitespace-nowrap font-bold">
            CRAFT & LEGACY
          </div>

          {/* Horizontal Moving Track */}
          <motion.div style={{ x }} className="flex gap-8 px-6 sm:px-16 lg:px-24">
            {/* Introductory Header Panel */}
            <div className="w-[85vw] sm:w-[50vw] lg:w-[35vw] shrink-0 flex flex-col justify-center pr-8 border-r border-[#ffffff]/15">
              <span className="font-sans-editorial text-[11px] uppercase tracking-[0.3em] text-[#c5a880] block font-bold mb-3">
                Visual Storytelling
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#ffffff] leading-tight mb-6 font-medium">
                The Journey of Silver
              </h2>
              <p className="font-sans-editorial text-sm sm:text-base text-[#c4c7c7] leading-relaxed mb-8 max-w-md">
                From unrefined bullion to hallmarked heirloom. Trace the meticulous steps of authentic Indian silversmithing.
              </p>
              <div className="flex items-center gap-3 font-sans-editorial text-xs uppercase tracking-widest text-[#c5a880]">
                <span>Scroll to Explore</span>
                <ArrowRight className="w-4 h-4 animate-pulse" />
              </div>
            </div>

            {/* 4 Journey Story Panels */}
            {JOURNEY_STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.id}
                  className="w-[85vw] sm:w-[65vw] lg:w-[48vw] shrink-0 bg-[#0d0d0d] border border-[#ffffff]/10 p-6 sm:p-10 flex flex-col justify-between relative group metallic-sheen"
                  data-cursor={`PHASE ${step.id}`}
                >
                  {/* Large Serial Number Header */}
                  <div className="flex items-start justify-between border-b border-[#ffffff]/10 pb-6 mb-6">
                    <div>
                      <span className="font-sans-editorial text-[10px] uppercase tracking-[0.25em] text-[#c5a880] font-bold block mb-1">
                        PHASE {step.id}
                      </span>
                      <h3 className="font-sans-editorial text-xs uppercase tracking-[0.2em] text-[#ffffff] font-semibold">
                        {step.phase}
                      </h3>
                    </div>
                    <div className="p-3 bg-[#1b1c19] border border-[#ffffff]/15 text-[#c5a880]">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Main Content & Image Split */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center flex-grow">
                    <div className="md:col-span-6 space-y-3">
                      <h4 className="font-serif-luxury text-xl sm:text-2xl text-[#ffffff]">
                        {step.title}
                      </h4>
                      <p className="font-sans-editorial text-xs text-[#c5a880] uppercase tracking-wider font-semibold">
                        {step.subtitle}
                      </p>
                      <p className="font-sans-editorial text-xs sm:text-sm text-[#a4a7a7] leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    <div className="md:col-span-6 relative aspect-[4/3] overflow-hidden border border-[#ffffff]/15">
                      <Image
                        src={step.image}
                        alt={step.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/80 via-transparent to-transparent" />
                    </div>
                  </div>

                  {/* Footer Link */}
                  <div className="pt-6 border-t border-[#ffffff]/10 flex items-center justify-between text-xs font-sans-editorial">
                    <span className="text-[#747878] uppercase tracking-widest">
                      Sri Bhagavathi Craft Standard
                    </span>
                    <Link
                      href="/about-us"
                      className="text-[#c5a880] hover:text-[#ffffff] transition-colors flex items-center gap-1 font-semibold uppercase tracking-wider"
                    >
                      <span>Learn Purity Standards</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </>
  );
}
