"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ShieldCheck, Award, ArrowRight, MapPin } from "lucide-react";
import { EASE_CINEMATIC } from "@/lib/animations";
import { MagneticButton } from "./MagneticButton";

export function HeroSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.14,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.85,
        ease: EASE_CINEMATIC,
      },
    },
  };

  return (
    <section className="relative w-full bg-[#fbf9f4] pt-4 sm:pt-8 lg:py-24 pb-12 sm:pb-16 overflow-hidden border-b border-[#e8e8e8]/60">
      {/* Subtle Background Watermark Typography */}
      <div className="absolute top-6 right-2 sm:top-10 sm:right-4 lg:right-20 text-[16vw] lg:text-[14vw] font-serif-luxury text-black/[0.025] tracking-widest pointer-events-none uppercase whitespace-nowrap font-bold select-none">
        SILVER
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Narrative Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 flex flex-col justify-center lg:pr-8"
          >
            {/* Tagline Badge */}
            <motion.div variants={itemVariants} className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
              <span className="w-6 sm:w-8 h-[1.5px] bg-[#725b38]" />
              <span className="font-sans-editorial text-[10px] sm:text-[12px] uppercase tracking-[0.25em] text-[#725b38] font-bold">
                Heritage Hallmarked Silver
              </span>
            </motion.div>

            {/* Display Headline */}
            <motion.h1
              variants={itemVariants}
              className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl text-[#010101] tracking-tight leading-[1.08] mb-2 sm:mb-3 font-normal"
            >
              TIMELESS <br />
              <span className="italic font-normal text-[#725b38]">SILVER</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={itemVariants}
              className="font-serif-luxury text-lg sm:text-2xl text-[#725b38] mb-3 sm:mb-5 font-normal"
            >
              Tradition, Crafted Beautifully.
            </motion.p>

            {/* Editorial Synopsis */}
            <motion.p
              variants={itemVariants}
              className="font-sans-editorial text-sm sm:text-base lg:text-lg text-[#444748] max-w-xl mb-6 sm:mb-8 leading-relaxed font-normal"
            >
              Discover finely crafted silver jewellery and timeless heirloom articles inspired by South Indian temple architecture, handcrafted by generational master artisans.
            </motion.p>

            {/* Dual CTAs with Light Sweep & Arrow Animation */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-10 w-full sm:w-auto">
              <MagneticButton className="w-full sm:w-auto">
                <Link
                  href="/shop"
                  className="btn-light-sweep w-full sm:w-auto justify-center bg-[#010101] text-[#ffffff] font-sans-editorial text-[11px] sm:text-[13px] uppercase px-6 sm:px-7 py-3.5 sm:py-4 tracking-[0.16em] hover:bg-[#262626] transition-all duration-300 shadow-md flex items-center gap-2 group font-semibold"
                >
                  <span>EXPLORE COLLECTION</span>
                  <ArrowRight className="w-4 h-4 text-[#c5a880] transition-transform duration-300 group-hover:translate-x-1.5" />
                </Link>
              </MagneticButton>

              <MagneticButton className="w-full sm:w-auto">
                <Link
                  href="/visit-our-store"
                  className="btn-light-sweep w-full sm:w-auto justify-center bg-[#ffffff] text-[#010101] border border-[#e8e8e8] shadow-sm hover:bg-[#f5f3ee] transition-all duration-300 font-sans-editorial text-[11px] sm:text-[13px] uppercase px-6 sm:px-7 py-3.5 sm:py-4 tracking-[0.16em] flex items-center gap-2 font-semibold"
                >
                  <MapPin className="w-4 h-4 text-[#725b38]" />
                  <span>VISIT OUR STORE</span>
                </Link>
              </MagneticButton>
            </motion.div>

            {/* Micro Credential Strip */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-4 sm:gap-6 pt-5 sm:pt-6 border-t border-[#e8e8e8]"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#725b38]" />
                <span className="font-sans-editorial text-xs sm:text-sm font-semibold text-[#1b1c19]">
                  BIS 925 Hallmark Certified
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 text-[#725b38]" />
                <span className="font-sans-editorial text-xs sm:text-sm text-[#444748]">
                  Generational Silversmiths
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Visual Plinth Column with Cinematic Scale Opening (Prompt Rule 3) */}
          <motion.div
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: EASE_CINEMATIC }}
            className="lg:col-span-6 relative mt-2 sm:mt-6 lg:mt-0"
            data-cursor="VIEW MASTERPIECE"
          >
            <div className="relative w-full aspect-[4/5] bg-[#f5f3ee] shadow-2xl overflow-hidden group border border-[#e8e8e8] metallic-sheen">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA44lCpazxIH8yCH2520Khg4pCPSC1YOJyis7bwy4N0brunyyI2QjXFSAGiJCcd4W6AMstAZm2DNgtz9mZq3ZgB62zgtRVcGVoHDGLb_SEM3rGS1ZfheFTfHFUOju-RmyPhSkz_iaWMpBZhwpM2hzBy5WUTMxx7zpSVH9p4p4XHP25r0UmRF4OZnSeszIV83yZyN3RqRYGWkZ5UrIqv4CLxF1HM99Z_FFgZv8rppBNw_atF9z9ISVR6"
                alt="Ornate South Indian antique 925 silver choker necklace"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#010101]/40 via-transparent to-transparent pointer-events-none" />

              {/* Glassmorphic Live Rate Floating Pill */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 glass-panel px-2.5 py-1 sm:px-4 sm:py-2 shadow-lg flex items-center gap-1.5 sm:gap-2 border border-[#e8e8e8]"
              >
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#34d399] animate-pulse" />
                <span className="font-sans-editorial text-[9px] sm:text-[11px] uppercase tracking-[0.16em] sm:tracking-[0.2em] text-[#010101] font-bold">
                  999 Fine Silver ₹128.40 / g
                </span>
              </motion.div>

              {/* Glassmorphic Secondary Brand Floating Card */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 glass-panel p-3 sm:p-5 shadow-xl max-w-[200px] xs:max-w-xs border border-[#e8e8e8]"
              >
                <p className="font-sans-editorial text-[9px] sm:text-[10px] text-[#725b38] uppercase tracking-[0.18em] sm:tracking-[0.2em] font-bold mb-0.5 sm:mb-1">
                  Authentic Legacy
                </p>
                <p className="font-serif-luxury text-xs sm:text-base text-[#010101] leading-tight font-medium">
                  Master Chased South Indian Silver Articles
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
