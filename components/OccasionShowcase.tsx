"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal, ScrollItem } from "./ScrollReveal";

export function OccasionShowcase() {
  const occasions = [
    {
      title: "Weddings & Muhurtham",
      category: "Bridal & Muhurtham",
      desc: "Exquisite heirloom sets, toe rings, and traditional silver thali plates for sacred vows.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD2t6p3aYpq4My4__eyO5yu3FEOY04Bd2dXjwAjxODVlzsPGNIMAM2OBJ8lJR7_2BW34r3uXG3HLSZ0jK8Ot-Wonw84rt03hGSrzZ5CXZ3F8Eg6ue1LO8qN5f6MDyE_vYaocdd9X03VeAujNS_XU34raxylv5ztVRcAIPHOKe6a7vGdYMoup4RMDrlKl_m-HELKmJO_No0x8V_kmTAzWDTvv71Qiwk1fTnAA7Rwha3VveMCErxwgcAN",
      href: "/shop?category=necklaces",
      linkText: "Explore Bridal Silver →",
    },
    {
      title: "Festivals & Varalakshmi Pooja",
      category: "Divine Festivals",
      desc: "Handmade Lakshmi idols, deepams, silver lotus flowers, and ritual thalis for holy festivities.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDtVCTYH-SrWcJhTZk-fOfS89OfI89RHjGp2Jlxe6W8bJJfNyak9w5seOt-nheh0i2XkkL-iU1lvx3rPu_tU_IRvBHnxOnes5t5LMzoMxQlCmuxSYhKM2wc7droKbV0iVWYwzq67gNegrs48AT2ffJziP2SGDTQsT57aCKdaTzp2t6qhgBF8pcY9Be0YaqGOi6epgdk7icfWBT1glh8LyTd0sp9HzUIsM5FM5RvQwRxGXtucMEUbxc3",
      href: "/pooja-and-articles",
      linkText: "Explore Pooja Sanctum →",
    },
    {
      title: "Traditional Silver Gifting",
      category: "Corporate & Personal",
      desc: "Certified silver coins, baby feeding sets, and elegant tableware in bespoke gift packaging.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDigZ6HocNoGBlppki-y0wbG-1lxfHeAKxasIEHe_wERhN2sNKJ2Pm0xBWFQEC_vS36ABOZW6v3rYOf3kSif34rlTCwi610z5Wg4VbUCQ5gQd22H1SA03DgqBFFPLNbNWdr66JhmCM-n65pgvIWGnGP5-rtRf2Jfa52ugZJfM--vCD_dkUYDtiTKVBanlrUmDGk99p7zgV5EhSSjiVTiAvz35EOtu3pQYLUyRD_oEaZF8STJxIWOrBR",
      href: "/shop?category=articles",
      linkText: "Explore Gifting Ideas →",
    },
  ];

  return (
    <section className="w-full bg-[#f5f3ee] py-16 sm:py-24 border-b border-[#e8e8e8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-sans-editorial text-[11px] uppercase tracking-[0.25em] text-[#725b38] font-semibold block mb-1">
            Sacred Milestones
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#010101] tracking-tight">
            FOR EVERY SPECIAL MOMENT
          </h2>
          <p className="font-sans-editorial text-sm sm:text-base text-[#444748] mt-2">
            Treasured silver treasures designed for life’s most auspicious ceremonies.
          </p>
        </ScrollReveal>

        <ScrollReveal stagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {occasions.map((occ, idx) => (
            <ScrollItem key={idx}>
              <div className="relative bg-[#ffffff] border border-[#e8e8e8] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group h-full">
                <div className="aspect-[4/5] w-full overflow-hidden bg-[#eae8e3] relative">
                  <Image
                    src={occ.image}
                    alt={occ.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#010101]/90 via-[#010101]/30 to-transparent" />
                </div>

                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 text-[#ffffff]">
                  <span className="font-sans-editorial text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#fedeb2] block mb-1.5 font-semibold">
                    {occ.category}
                  </span>
                  <h3 className="font-serif-luxury text-xl sm:text-2xl text-[#ffffff] mb-2 font-medium">
                    {occ.title}
                  </h3>
                  <p className="font-sans-editorial text-xs sm:text-sm text-[#eae8e3] mb-6 font-light leading-relaxed">
                    {occ.desc}
                  </p>
                  <Link
                    href={occ.href}
                    className="font-sans-editorial text-[11px] sm:text-[12px] uppercase tracking-[0.18em] text-[#fedeb2] hover:text-[#ffffff] hover:underline flex items-center gap-1.5 font-semibold transition-colors"
                  >
                    <span>{occ.linkText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </ScrollItem>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
