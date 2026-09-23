"use client";

import React from "react";
import { CheckCircle2, ShieldCheck, Palette, Wrench } from "lucide-react";
import { ScrollReveal, ScrollItem } from "./ScrollReveal";

export function WhyUsSection() {
  const pillars = [
    {
      num: "01",
      title: "Authentic 925 & 999 Silver",
      desc: "Every single piece is fabricated with pure certified silver bullion, guaranteeing flawless metallurgical integrity without compromise.",
      badge: "Certified Purity",
      icon: CheckCircle2,
    },
    {
      num: "02",
      title: "Hallmarking You Can Trust",
      desc: "Recognized BIS hallmarking seals stamped on all jewellery, verifying standard conformity under government-approved assaying parameters.",
      badge: "BIS Hallmarked",
      icon: ShieldCheck,
    },
    {
      num: "03",
      title: "Master Silversmiths",
      desc: "Crafted by generational South Indian karigars who breathe life into traditional embossing, filigree, and hand-chased ornamentation.",
      badge: "Artisan Heritage",
      icon: Palette,
    },
    {
      num: "04",
      title: "Custom Orders & Service",
      desc: "Bespoke wedding heirloom commissions, custom pooja vessel weights, and tailored doorstep presentation appointments across Tamil Nadu.",
      badge: "Bespoke Guidance",
      icon: Wrench,
    },
  ];

  return (
    <section className="w-full bg-[#f0eee9] py-16 sm:py-24 border-b border-[#e8e8e8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-sans-editorial text-[11px] uppercase tracking-[0.25em] text-[#725b38] font-semibold block mb-1">
            Our Pillar of Trust
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#010101] tracking-tight">
            Why Sri Bhagavathi Silvers
          </h2>
          <p className="font-sans-editorial text-sm sm:text-base text-[#444748] mt-2">
            Upholding the sacred standards of pure metalwork for discerning families.
          </p>
        </ScrollReveal>

        <ScrollReveal stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item) => {
            const Icon = item.icon;
            return (
              <ScrollItem key={item.num}>
                <div className="bg-[#ffffff] p-6 sm:p-8 border border-[#e8e8e8] shadow-sm hover:shadow-xl hover:border-[#c5a880] transition-all duration-300 flex flex-col justify-between h-full">
                  <div>
                    <span className="font-serif-luxury text-4xl sm:text-5xl text-[#e0c298] block mb-4 font-normal">
                      {item.num}
                    </span>
                    <h3 className="font-serif-luxury text-xl text-[#010101] mb-3 font-medium">
                      {item.title}
                    </h3>
                    <p className="font-sans-editorial text-xs sm:text-sm text-[#444748] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <div className="pt-6 mt-6 border-t border-[#f5f3ee] flex items-center gap-2 text-[#725b38]">
                    <Icon className="w-4 h-4" />
                    <span className="font-sans-editorial text-[11px] uppercase tracking-wider font-semibold">
                      {item.badge}
                    </span>
                  </div>
                </div>
              </ScrollItem>
            );
          })}
        </ScrollReveal>
      </div>
    </section>
  );
}
