"use client";

import React from "react";
import { Star, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/data/testimonials";
import { ScrollReveal, ScrollItem } from "./ScrollReveal";

export function TestimonialsSection() {
  return (
    <section className="w-full bg-[#fbf9f4] py-16 sm:py-24 border-b border-[#e8e8e8]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-sans-editorial text-[11px] uppercase tracking-[0.25em] text-[#725b38] font-semibold block mb-1">
            Testimonials
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#010101] tracking-tight">
            Loved by Our Customers
          </h2>
          <p className="font-sans-editorial text-sm sm:text-base text-[#444748] mt-2">
            Words of trust and devotion from families who cherish our silver.
          </p>
        </ScrollReveal>

        <ScrollReveal stagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <ScrollItem key={t.id}>
              <div className="bg-[#f5f3ee] p-6 sm:p-8 border border-[#e8e8e8] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between relative h-full">
                <Quote className="absolute top-6 right-6 w-8 h-8 text-[#c5a880]/30 pointer-events-none" />

                <div>
                  <div className="flex items-center gap-1 text-[#725b38] mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  <p className="font-sans-editorial text-sm sm:text-base text-[#1b1c19] italic mb-6 leading-relaxed font-light">
                    &quot;{t.text}&quot;
                  </p>
                </div>

                <div className="pt-4 border-t border-[#e8e8e8]">
                  <p className="font-serif-luxury text-lg text-[#010101] font-medium">
                    {t.author}
                  </p>
                  <p className="font-sans-editorial text-xs text-[#444748]">
                    {t.location} •{" "}
                    <span className="text-[#725b38] font-semibold">{t.badge}</span>
                  </p>
                </div>
              </div>
            </ScrollItem>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
