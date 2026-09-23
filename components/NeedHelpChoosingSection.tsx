"use client";

import React from "react";
import Link from "next/link";
import { MessageSquare, MapPin, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

export function NeedHelpChoosingSection() {
  return (
    <section className="py-20 lg:py-28 bg-[#f5f3ee] border-b border-[#e8e8e8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative rounded-none border border-[#e8e8e8] overflow-hidden bg-[#010101] text-[#ffffff] p-8 sm:p-12 lg:p-16 metallic-sheen"
        >
          {/* Background Editorial Image */}
          <div className="absolute inset-0 z-0 opacity-40">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDL4ZHJballUMddbhgvJ07QygDrNZxq2vQ-msqoHsNhByUh7jbOpM6vrXsxNPn-bv3etyswE4p5D8FlXWIbkXViizn276ukWrMdMVxvTG3kc6ZN2GM4abAixgMDSG4cW7A3B1EQm5ZX--xTLPQLPh4PDvu8Lomk5lAERZylDSVs0cLlKYCg_jSlE2K0JyQFBXi1mCnz-IqFnOJTC9no3pXWc_zdYfU4wz3yk8Q2SbiVh8D5bPZIhxD7"
              alt="Boutique Consultation"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Dark Glass Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#010101] via-[#010101]/90 to-transparent z-10" />

          {/* Content */}
          <div className="relative z-20 max-w-2xl space-y-6">
            <div className="flex items-center gap-2 text-[#c5a880] font-sans-editorial text-xs uppercase tracking-[0.25em] font-semibold">
              <Sparkles className="w-4 h-4" />
              Personalized Concierge Guidance
            </div>

            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl text-[#ffffff] tracking-tight leading-tight">
              NOT SURE WHAT TO CHOOSE?
            </h2>

            <p className="font-sans-editorial text-sm sm:text-base text-[#e4e2dd] leading-relaxed">
              Whether selecting an auspicious silver kalash for housewarming, an infant nazariya, or custom traditional temple jewellery, our silver specialists are available to assist you.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <a
                href="https://wa.me/919876543210?text=Hello%20Sri%20Bhagavathi%20Silvers%2C%20I%20would%20like%20expert%20assistance%20choosing%20a%20silver%20piece."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#c5a880] text-[#010101] font-sans-editorial text-xs uppercase tracking-[0.2em] font-bold btn-light-sweep hover:bg-[#ffffff] transition-colors shadow-lg"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Talk to an Expert</span>
              </a>

              <Link
                href="/visit-our-store"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent border border-[#ffffff]/40 text-[#ffffff] font-sans-editorial text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#ffffff] hover:text-[#010101] transition-colors"
              >
                <MapPin className="w-4 h-4 text-[#c5a880]" />
                <span>Visit Our Showroom</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
