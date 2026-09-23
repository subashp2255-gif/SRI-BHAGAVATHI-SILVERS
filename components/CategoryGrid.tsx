"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import { ScrollReveal, ScrollItem } from "./ScrollReveal";

export function CategoryGrid() {
  return (
    <section className="w-full bg-[#fbf9f4] py-16 sm:py-24 border-b border-[#e8e8e8]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="font-sans-editorial text-[11px] uppercase tracking-[0.25em] text-[#725b38] block font-semibold mb-2">
              Curation
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#010101] tracking-tight">
              Shop by Category
            </h2>
            <p className="font-sans-editorial text-sm sm:text-base text-[#444748] mt-2">
              Discover pieces crafted for every auspicious celebration and daily poise.
            </p>
          </div>
          <Link
            href="/shop"
            className="font-sans-editorial text-[12px] uppercase tracking-[0.18em] text-[#010101] hover:text-[#725b38] transition-colors flex items-center gap-1.5 self-start md:self-end font-semibold group"
          >
            <span>View Full Catalogue</span>
            <ArrowRight className="w-4 h-4 text-[#725b38] transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </ScrollReveal>

        {/* 8-Category Architectural Grid with Staggered Entrance */}
        <ScrollReveal stagger className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES.map((cat) => (
            <ScrollItem key={cat.id}>
              <Link
                href={cat.href}
                className="group bg-[#ffffff] p-3 sm:p-4 border border-[#e8e8e8] shadow-sm hover:shadow-xl hover:border-[#c5a880] transition-all duration-300 flex flex-col h-full"
              >
                <div className="aspect-square w-full bg-[#f5f3ee] overflow-hidden relative mb-3 border border-[#e8e8e8]/50">
                  <Image
                    src={cat.image}
                    alt={cat.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-serif-luxury text-base sm:text-lg text-[#010101] mb-1 group-hover:text-[#725b38] transition-colors font-medium">
                  {cat.name}
                </h3>
                <span className="font-sans-editorial text-[11px] uppercase tracking-wider text-[#725b38] group-hover:text-[#010101] flex items-center gap-1 mt-auto font-semibold">
                  Explore Collection →
                </span>
              </Link>
            </ScrollItem>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
