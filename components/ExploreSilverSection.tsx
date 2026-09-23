"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";

export function ExploreSilverSection() {
  const exploreCards = [
    {
      id: "jewellery",
      title: "Silver Jewellery",
      subtitle: "Adornments Forged in Sterling 925",
      description: "Artisanal rings, chokers, kolusu payals, and sculpted kadas with heritage South Indian filigree.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCW7_d9BeF9-rkPp7KgexqRyKdBpMQCDz3AWVUEkvMyjrGpcGTq29MtqyB1K1yUmFgZUphYCEqqa-LO_WQ-Jz1gMWCbcT1dCVGWHigjiseuyPScOr8dRn1_UVnP-0Qk1hehK7Z8Wid4sTnzCCA8mpZtS1t3wNWr5KLuqVZChLB4GzN5HPDszV4-1POIwGptQHw2xyO5EVcKy2XcSZfu97kwjHRZc_D1o93WzDNbzDcfWR73CNVK5G4U",
      href: "/shop?category=rings",
      spanCols: "col-span-1 md:col-span-2 lg:col-span-2",
      height: "h-[420px]",
    },
    {
      id: "divine",
      title: "Divine Silver",
      subtitle: "Sanctum Sculptures & Sacred Idols",
      description: "Consecrated silver statues of Lakshmi, Ganesha, and sanctum deities for altar worship.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBebFltOEMAcE6R6mZ6Z1TBZfH4-TijfaIpJ__GrkTG0O29yBaY3abO2Jol3K4nvXyBF1AS-Hez068b7KSVSZYh1KHRXCPQwTUJMAFDani3kGocj-Rz6LWGSXwaVjigaazw-JBmCfAzeQF_u8vBFv0zzFLYnAWTCAT0DeXBM6RE6t2ztp-hodot759T_d38hxC__x7oD3TNdK6TKvh9n4bcwrvRqfAF3wIXdUrrMHuDswNK1MH68jTz",
      href: "/pooja-and-articles",
      spanCols: "col-span-1 md:col-span-1 lg:col-span-1",
      height: "h-[420px]",
    },
    {
      id: "pooja",
      title: "Pooja Articles",
      subtitle: "Traditional Lamps & Ritual Vessels",
      description: "High-purity Kamakshi deepams, silver kalash pots, and ritual bell vessels.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBJsJNjsfhqhYNiIY5kHFh5KqLUR1YdNJ2QA7P9EQi66BrSBPly29FOcKEBq4uARR1bSkJu3dM39RazWYcD8_1m9JGadeMHT0DFJDf2WezwBG5EQ-4eibd0CyPz8vb6umVlgsuoAhmQCCyPMBLEkX8qLuo-2acGSfi_KODdOj3kMX3GNB0THjMJiRAGB4rG5grn1kcXQLNNWcMaXsaimAr5Wx6J6ssLmLxF8Jy9M8LjcLhNtpwaEOZs",
      href: "/pooja-and-articles",
      spanCols: "col-span-1 md:col-span-1 lg:col-span-1",
      height: "h-[380px]",
    },
    {
      id: "gifting",
      title: "Gifting Collections",
      subtitle: "Meaningful Silver Keepsakes",
      description: "Blessed infant nazariya bangles, thali dinner sets, and commemorative silver heirlooms.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDL4ZHJballUMddbhgvJ07QygDrNZxq2vQ-msqoHsNhByUh7jbOpM6vrXsxNPn-bv3etyswE4p5D8FlXWIbkXViizn276ukWrMdMVxvTG3kc6ZN2GM4abAixgMDSG4cW7A3B1EQm5ZX--xTLPQLPh4PDvu8Lomk5lAERZylDSVs0cLlKYCg_jSlE2K0JyQFBXi1mCnz-IqFnOJTC9no3pXWc_zdYfU4wz3yk8Q2SbiVh8D5bPZIhxD7",
      href: "/shop?category=articles",
      spanCols: "col-span-1 md:col-span-1 lg:col-span-1",
      height: "h-[380px]",
    },
    {
      id: "coins",
      title: "Coins & Bullion",
      subtitle: "999 Fine Silver Wealth Reservation",
      description: "Assay-certified fine silver coins and serial-numbered bullion bars in gift casings.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtMHNOlGI0dreKAMQAhRm7fEfRH-T9d157VYXs_7K--58_vo74cwDu9wIuJPNseR-dxeE7XB_PpuufVNK9oP03jenxjctjaVL1YHOCXZ7cVd75VAh40EWBDRdhfjkQKGW9vYR9A5gBL_Zh_09F32yCENYhVgGM15-0CXfO6s6uslwLn5Hry_yfVxLDh_7j9b3_coKy-WA6A4xkAxp-HUFA_3o9Vpg6IefBlDZ_XfGVgE77KHpu66wl",
      href: "/shop?category=coins",
      spanCols: "col-span-1 md:col-span-1 lg:col-span-1",
      height: "h-[380px]",
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#fbf9f4] relative overflow-hidden border-b border-[#e8e8e8]">
      {/* Background Watermark */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 watermark-editorial text-7xl lg:text-[140px] whitespace-nowrap opacity-[0.03] select-none pointer-events-none">
        EXPLORE SILVER
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 border-b border-[#e8e8e8] pb-6 gap-4"
        >
          <div>
            <div className="flex items-center gap-2 text-[#725b38] font-sans-editorial text-xs uppercase tracking-[0.25em] font-semibold mb-2">
              <Sparkles className="w-4 h-4 text-[#c5a880]" />
              Curated Discovery
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl text-[#010101] tracking-tight">
              EXPLORE SILVER
            </h2>
          </div>
          <p className="font-sans-editorial text-xs sm:text-sm text-[#444748] max-w-md">
            Enter the universe of Sri Bhagavathi Silvers across six distinct silver dimensions forged by master artisans.
          </p>
        </motion.div>

        {/* Editorial Grid Layout */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {exploreCards.map((card) => (
            <motion.div
              key={card.id}
              variants={fadeUp}
              className={`${card.spanCols} group relative rounded-none overflow-hidden border border-[#e8e8e8] bg-[#010101] metallic-sheen`}
            >
              <Link href={card.href} className="block relative w-full h-full overflow-hidden">
                {/* Image Container with Hover Scale */}
                <div className={`${card.height} relative w-full overflow-hidden`}>
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 opacity-85 group-hover:opacity-95"
                  />
                  {/* Subtle Gradient Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#010101]/90 via-[#010101]/30 to-transparent transition-opacity duration-300 group-hover:from-[#010101]/95" />
                </div>

                {/* Card Content Overlay */}
                <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-end text-[#ffffff] z-10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-sans-editorial text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#c5a880] font-bold">
                      {card.subtitle}
                    </span>
                    <div className="w-9 h-9 rounded-full bg-[#ffffff]/10 backdrop-blur-md border border-[#ffffff]/20 flex items-center justify-center text-[#ffffff] transition-all duration-300 group-hover:bg-[#c5a880] group-hover:text-[#010101] group-hover:translate-x-1 group-hover:-translate-y-1">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#ffffff] tracking-wide mb-2 transition-transform duration-300 group-hover:translate-x-1">
                    {card.title}
                  </h3>
                  <p className="font-sans-editorial text-xs text-[#e4e2dd] line-clamp-2 max-w-lg transition-transform duration-300 group-hover:translate-x-1">
                    {card.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
