"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PRODUCTS, Product } from "@/data/products";
import { Gift, MessageCircle } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

const RECIPIENTS = [
  { id: "Parents", label: "Parents" },
  { id: "Couple", label: "Couple" },
  { id: "Baby", label: "Baby" },
  { id: "Friend", label: "Friend" },
  { id: "Devotee", label: "Devotee" },
  { id: "Other", label: "Other" },
];

const OCCASIONS = [
  { id: "Wedding", label: "Wedding" },
  { id: "Housewarming", label: "Housewarming" },
  { id: "Birthday", label: "Birthday" },
  { id: "Festival", label: "Festival" },
  { id: "Pooja", label: "Pooja" },
  { id: "Anniversary", label: "Anniversary" },
];

export function GuidedGiftingTool() {
  const [selectedRecipient, setSelectedRecipient] = useState<string>("Parents");
  const [selectedOccasion, setSelectedOccasion] = useState<string>("Wedding");

  // Deterministic client-side matching based on enriched product attributes
  const recommendedProducts = PRODUCTS.filter((p) => {
    const matchesRecipient = p.occasions?.includes(selectedRecipient) || p.tags?.some(t => t.toLowerCase().includes(selectedRecipient.toLowerCase())) || true;
    const matchesOccasion = p.occasions?.includes(selectedOccasion) || p.category === "pooja" || p.category === "articles" || p.category === "coins";
    return matchesRecipient && matchesOccasion;
  }).slice(0, 3);

  const handleWhatsAppGifting = (prod: Product) => {
    const text = encodeURIComponent(
      `Hello Sri Bhagavathi Silvers, I am using your Gifting Concierge. I am looking for a gift for ${selectedRecipient} for ${selectedOccasion}, and am interested in "${prod.name}" (${prod.formattedPrice}). Please guide me.`
    );
    window.open(`https://wa.me/919876543210?text=${text}`, "_blank");
  };

  return (
    <section className="w-full bg-[#010101] text-[#ffffff] py-20 sm:py-28 relative overflow-hidden border-b border-[#1c1c1c]">
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#c5a880] via-[#010101] to-[#010101]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-sans-editorial text-[11px] uppercase tracking-[0.3em] text-[#c5a880] font-bold block mb-3 flex items-center justify-center gap-2">
            <Gift className="w-4 h-4 text-[#c5a880]" />
            FIND THE RIGHT SILVER GIFT
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#ffffff] tracking-tight mb-4 font-normal">
            Guided Gifting Experience
          </h2>
          <p className="font-sans-editorial text-sm sm:text-base text-[#c4c7c7] font-light leading-relaxed">
            Select who you are honouring and the milestone. Our concierge filters certified hallmark silver pieces crafted for lifelong reverence.
          </p>
        </ScrollReveal>

        {/* Guided Filter Bar */}
        <div className="bg-[#0d0d0d] p-6 sm:p-8 border border-[#ffffff]/15 mb-14 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Step 1: Who is it for? */}
            <div className="lg:col-span-6">
              <span className="font-sans-editorial text-[10px] uppercase tracking-[0.2em] text-[#c5a880] font-bold block mb-3">
                STEP 1: WHO IS IT FOR?
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                {RECIPIENTS.map((rec) => (
                  <button
                    suppressHydrationWarning
                    key={rec.id}
                    onClick={() => setSelectedRecipient(rec.id)}
                    className={`font-sans-editorial text-xs px-4 py-2.5 transition-all font-semibold border ${
                      selectedRecipient === rec.id
                        ? "bg-[#ffffff] text-[#010101] border-[#ffffff] shadow"
                        : "bg-[#1b1c19] text-[#c4c7c7] border-[#ffffff]/15 hover:border-[#c5a880]"
                    }`}
                  >
                    {rec.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: What is the occasion? */}
            <div className="lg:col-span-6">
              <span className="font-sans-editorial text-[10px] uppercase tracking-[0.2em] text-[#c5a880] font-bold block mb-3">
                STEP 2: WHAT IS THE OCCASION?
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                {OCCASIONS.map((occ) => (
                  <button
                    suppressHydrationWarning
                    key={occ.id}
                    onClick={() => setSelectedOccasion(occ.id)}
                    className={`font-sans-editorial text-xs px-4 py-2.5 transition-all font-semibold border ${
                      selectedOccasion === occ.id
                        ? "bg-[#c5a880] text-[#010101] border-[#c5a880] shadow"
                        : "bg-[#1b1c19] text-[#c4c7c7] border-[#ffffff]/15 hover:border-[#c5a880]"
                    }`}
                  >
                    {occ.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Curated Recommendations */}
        <div>
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#ffffff]/10">
            <span className="font-sans-editorial text-xs uppercase tracking-widest text-[#c5a880] font-semibold">
              Selected Recommendations ({recommendedProducts.length} items)
            </span>
            <span className="font-sans-editorial text-xs text-[#a4a7a7]">
              Certified BIS Hallmarked 925 / 999 Fine Silver
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {recommendedProducts.map((prod) => (
              <div
                key={prod.id}
                className="bg-[#0d0d0d] border border-[#ffffff]/10 p-5 flex flex-col justify-between group metallic-sheen"
              >
                <div>
                  <div className="relative aspect-[4/3] w-full bg-[#1b1c19] border border-[#ffffff]/10 mb-4 overflow-hidden">
                    <Image
                      src={prod.image}
                      alt={prod.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2.5 left-2.5 bg-[#010101]/90 text-[#c5a880] px-2.5 py-1 font-sans-editorial text-[10px] uppercase font-bold border border-[#c5a880]/30">
                      {prod.netWeight}
                    </span>
                  </div>

                  <span className="font-sans-editorial text-[10px] uppercase tracking-widest text-[#c5a880] font-bold block mb-1">
                    {prod.categoryLabel}
                  </span>
                  <h3 className="font-serif-luxury text-lg text-[#ffffff] font-medium mb-2 group-hover:text-[#c5a880] transition-colors">
                    {prod.name}
                  </h3>
                  <p className="font-serif-luxury text-xl text-[#ffffff] font-semibold mb-4">
                    {prod.formattedPrice}
                  </p>
                </div>

                <button
                  suppressHydrationWarning
                  onClick={() => handleWhatsAppGifting(prod)}
                  className="btn-light-sweep w-full py-3 px-4 bg-[#f5f3ee] hover:bg-[#eae8e3] text-[#010101] font-sans-editorial text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-[#725b38]" />
                  <span>Enquire Gift via WhatsApp</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
