"use client";

import React from "react";
import { motion } from "framer-motion";
import { PROCESS_STEPS } from "@/data/customized";
import { Sparkles, ArrowRight, MessageSquare, PenTool, Hammer, PackageCheck } from "lucide-react";

interface ProcessTimelineProps {
  onStartEnquiry?: () => void;
}

export function ProcessTimeline({ onStartEnquiry }: ProcessTimelineProps) {
  const stepIcons = [MessageSquare, PenTool, Hammer, PackageCheck];

  return (
    <section className="py-20 bg-[#f5f3ee] border-y border-[#e8e8e8] relative overflow-hidden">
      {/* Background Watermark Typography */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 watermark-editorial text-[10vw] select-none pointer-events-none opacity-25">
        CRAFTSMANSHIP
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ffffff] border border-[#e8e8e8] text-[#725b38]">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="font-sans-editorial text-[11px] uppercase tracking-[0.25em] font-bold">
              Transparent Craft Process
            </span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl text-[#010101] tracking-wide">
            FROM IDEA TO SILVER
          </h2>

          <p className="font-sans-editorial text-xs sm:text-sm text-[#444748] leading-relaxed">
            How we bring your personalized silver ornaments to life — from initial sketch consultation to hallmarked perfection.
          </p>
        </div>

        {/* Desktop Horizontal Process Grid */}
        <div className="hidden lg:grid grid-cols-4 gap-6 relative">
          {/* Animated Connecting Line */}
          <div className="absolute top-12 left-[10%] right-[10%] h-[2px] bg-[#e8e8e8] z-0">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-[#725b38] via-[#c5a880] to-[#725b38] origin-left"
            />
          </div>

          {PROCESS_STEPS.map((step, index) => {
            const IconComponent = stepIcons[index] || Sparkles;
            return (
              <motion.div
                key={step.stepNumber}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative z-10 flex flex-col items-center text-center group"
              >
                {/* Step Number Circle */}
                <div className="w-20 h-20 rounded-full bg-[#fbf9f4] border-2 border-[#e8e8e8] group-hover:border-[#725b38] transition-colors flex flex-col items-center justify-center mb-6 shadow-md relative">
                  <span className="font-serif-luxury text-xl font-bold text-[#010101] group-hover:text-[#725b38] transition-colors">
                    {step.stepNumber}
                  </span>
                  <IconComponent className="w-4 h-4 text-[#725b38] mt-0.5" />
                </div>

                {/* Step Content */}
                <div className="bg-[#ffffff] p-6 border border-[#e8e8e8] w-full flex-1 flex flex-col justify-between shadow-sm group-hover:shadow-md transition-all">
                  <div>
                    <span className="font-sans-editorial text-[10px] uppercase tracking-[0.2em] text-[#725b38] font-bold block mb-1">
                      {step.subtitle}
                    </span>
                    <h3 className="font-serif-luxury text-lg text-[#010101] font-semibold mb-2">
                      {step.title}
                    </h3>
                    <p className="font-sans-editorial text-xs text-[#444748] leading-relaxed mb-4">
                      {step.description}
                    </p>
                  </div>

                  {/* Bullet Points */}
                  <ul className="space-y-1.5 text-left pt-3 border-t border-[#f5f3ee]">
                    {step.detailPoints.map((pt, i) => (
                      <li key={i} className="font-sans-editorial text-[11px] text-[#444748] flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880] shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile & Tablet Vertical Timeline */}
        <div className="lg:hidden space-y-6 relative pl-6 border-l-2 border-[#c5a880]/50">
          {PROCESS_STEPS.map((step, index) => {
            const IconComponent = stepIcons[index] || Sparkles;
            return (
              <motion.div
                key={step.stepNumber}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative pl-4"
              >
                {/* Node indicator */}
                <div className="absolute -left-[31px] top-1.5 w-6 h-6 rounded-full bg-[#725b38] text-white text-[10px] font-bold flex items-center justify-center border-2 border-[#ffffff]">
                  {index + 1}
                </div>

                <div className="bg-[#ffffff] p-5 border border-[#e8e8e8] space-y-2 shadow-sm">
                  <div className="flex items-center gap-2">
                    <IconComponent className="w-4 h-4 text-[#725b38]" />
                    <span className="font-sans-editorial text-[10px] uppercase tracking-[0.2em] text-[#725b38] font-bold">
                      Step {step.stepNumber} • {step.subtitle}
                    </span>
                  </div>

                  <h3 className="font-serif-luxury text-lg text-[#010101] font-semibold">{step.title}</h3>
                  <p className="font-sans-editorial text-xs text-[#444748] leading-relaxed">{step.description}</p>

                  <ul className="space-y-1 pt-2">
                    {step.detailPoints.map((pt, i) => (
                      <li key={i} className="font-sans-editorial text-[11px] text-[#444748] flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-[#c5a880] shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Process Footer Action */}
        {onStartEnquiry && (
          <div className="mt-14 text-center">
            <button
              type="button"
              suppressHydrationWarning
              onClick={onStartEnquiry}
              className="bg-[#010101] hover:bg-[#725b38] text-white px-8 py-3.5 font-sans-editorial text-xs uppercase tracking-[0.2em] font-bold inline-flex items-center gap-3 transition-all shadow-md group"
            >
              Start Your Design Process <ArrowRight className="w-4 h-4 text-[#c5a880] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
