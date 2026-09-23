"use client";

import React from "react";
import { ShieldCheck, Hammer, Sparkles, HeartHandshake, PackageCheck } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";

export function TrustStrip() {
  const promiseItems = [
    {
      icon: ShieldCheck,
      title: "Authentic Silver",
      subtitle: "BIS 925 Hallmark & 999 Bullion",
      description: "Official government laser hallmarking on every sterling piece and assay certificates for 999 fine bullion.",
    },
    {
      icon: Hammer,
      title: "Quality Craftsmanship",
      subtitle: "Hereditary Silversmithing",
      description: "Hand-finished by South Indian master silversmiths using traditional filigree, chasing, and stone setting.",
    },
    {
      icon: HeartHandshake,
      title: "Care Guidance",
      subtitle: "Complimentary Care Cloth",
      description: "Every order includes a micro-fiber silver polish cloth and anti-tarnish storage instructions.",
    },
    {
      icon: PackageCheck,
      title: "Trusted Support & Packaging",
      subtitle: "Insured Transit & Concierge",
      description: "Tamper-evident luxury gift packaging backed by dedicated WhatsApp boutique concierge support.",
    },
  ];

  return (
    <section className="w-full bg-[#f5f3ee] py-12 lg:py-16 border-b border-[#e8e8e8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-2 text-[#725b38] font-sans-editorial text-xs uppercase tracking-[0.25em] font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#c5a880]" />
            Foundational Commitment
          </div>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[#010101] tracking-tight uppercase">
            THE BHAGAVATHI PROMISE
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {promiseItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                variants={fadeUp}
                className="flex flex-col p-5 bg-[#fbf9f4] border border-[#e8e8e8] hover:border-[#725b38] transition-all duration-300 metallic-sheen"
              >
                <div className="w-10 h-10 bg-[#010101] text-[#c5a880] flex items-center justify-center mb-3 shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-sans-editorial text-xs uppercase tracking-wider text-[#010101] font-bold mb-0.5">
                  {item.title}
                </h3>
                <span className="font-sans-editorial text-[11px] text-[#725b38] font-semibold block mb-2">
                  {item.subtitle}
                </span>
                <p className="font-sans-editorial text-[11px] text-[#444748] leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
