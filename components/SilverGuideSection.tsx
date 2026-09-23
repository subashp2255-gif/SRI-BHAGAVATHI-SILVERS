"use client";

import React, { useState } from "react";
import { BookOpen, ArrowRight } from "lucide-react";
import { ArticleModal, GuideArticle } from "./ArticleModal";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { motion } from "framer-motion";

const KNOWLEDGE_ARTICLES: GuideArticle[] = [
  {
    id: "purity",
    title: "Understanding Silver Purity (999 vs 925)",
    category: "Purity & Certification",
    readTime: "4 min read",
    excerpt: "Demystifying BIS laser stamps, fine bullion silver, and sterling alloy durability.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtMHNOlGI0dreKAMQAhRm7fEfRH-T9d157VYXs_7K--58_vo74cwDu9wIuJPNseR-dxeE7XB_PpuufVNK9oP03jenxjctjaVL1YHOCXZ7cVd75VAh40EWBDRdhfjkQKGW9vYR9A5gBL_Zh_09F32yCENYhVgGM15-0CXfO6s6uslwLn5Hry_yfVxLDh_7j9b3_coKy-WA6A4xkAxp-HUFA_3o9Vpg6IefBlDZ_XfGVgE77KHpu66wl",
    content: [
      "When investing in pure silver articles or daily-wear jewellery, understanding silver purity is paramount. In India, official Bureau of Indian Standards (BIS) hallmarking guarantees authenticity.",
      "999 Fine Silver contains 99.9% pure silver bullion. Because pure silver in its unalloyed state is exceptionally soft, 999 fine silver is ideal for sacred temple idols, pooja kalash pots, and bullion coins.",
      "925 Sterling Silver contains 92.5% pure silver strengthened with 7.5% copper or zinc. This alloy provides the tensile strength required for intricate filigree rings, anklets (kolusu), chains, and stone-set temple jewellery."
    ]
  },
  {
    id: "care",
    title: "How to Care for Silver & Prevent Tarnishing",
    category: "Silver Care Guide",
    readTime: "3 min read",
    excerpt: "Essential steps to preserve anti-tarnish luster and restore antique silver sheen at home.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDL4ZHJballUMddbhgvJ07QygDrNZxq2vQ-msqoHsNhByUh7jbOpM6vrXsxNPn-bv3etyswE4p5D8FlXWIbkXViizn276ukWrMdMVxvTG3kc6ZN2GM4abAixgMDSG4cW7A3B1EQm5ZX--xTLPQLPh4PDvu8Lomk5lAERZylDSVs0cLlKYCg_jSlE2K0JyQFBXi1mCnz-IqFnOJTC9no3pXWc_zdYfU4wz3yk8Q2SbiVh8D5bPZIhxD7",
    content: [
      "Silver naturally reacts with trace atmospheric sulfur compounds to form silver sulfide, creating a dark tarnish layer over time. Regular care prevents tarnish buildup effortlessly.",
      "Always store silver jewellery and dining articles in dry, airtight velvet boxes or ziplock bags with anti-tarnish strips. Avoid leaving silver exposed to high humidity.",
      "To polish oxidized antique silver or mirror-finish thalis, wipe gently using Sri Bhagavathi Silvers' micro-fiber polish cloth. For intricate filigree, use mild warm soapy water and dry thoroughly with a soft cloth."
    ]
  },
  {
    id: "gifting",
    title: "Choosing Silver Gifts for Auspicious Milestones",
    category: "Gifting Guide",
    readTime: "4 min read",
    excerpt: "Selecting meaningful silver gifts for weddings, housewarmings, and newborn celebrations.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAfYg9OibdgI7Rz7QFmKIjs-s5pzetgcW9L7JBEFoMT438c_YhKwTBw7m5dNd3-LPq_7LrH0jhKsuKjwwPJ7FiOcgNjHCEu_jXxkOkK2NCofY6B5-M6NvfLDiZSflyDCHeq04S1sdfgi9_jRlDasS2MyzSobhShOjW8ZBW4FXYpSmpNXSVocQme1bYaj0nCQiRgthBo7uuLstBfFsvdIwU0uxajEjIvoh4NG1ELp8dGN4DNpahJtgP0",
    content: [
      "In South Indian tradition, silver is considered a sacred metal that bestows prosperity, cool energy, and divine blessings upon the recipient.",
      "For newborn babies, infant nazariya bangles with black glass protective beads or silver feeding spoons make cherishable heritage gifts.",
      "For housewarmings and weddings, consecrated 999 fine silver coins, Kamakshi deepams, or heirloom thali sets remain the most honored gifts."
    ]
  },
  {
    id: "pooja",
    title: "Silver Articles for Temple & Home Pooja",
    category: "Ritual & Sanctum",
    readTime: "5 min read",
    excerpt: "Sacred guidelines on placing silver Kamakshi lamps, kalash pots, and idol pedestals.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBebFltOEMAcE6R6mZ6Z1TBZfH4-TijfaIpJ__GrkTG0O29yBaY3abO2Jol3K4nvXyBF1AS-Hez068b7KSVSZYh1KHRXCPQwTUJMAFDani3kGocj-Rz6LWGSXwaVjigaazw-JBmCfAzeQF_u8vBFv0zzFLYnAWTCAT0DeXBM6RE6t2ztp-hodot759T_d38hxC__x7oD3TNdK6TKvh9n4bcwrvRqfAF3wIXdUrrMHuDswNK1MH68jTz",
    content: [
      "Sanctum silver vessels amplify spiritual vibrations in the puja room. Deepams represent divine illumination dispelling ignorance.",
      "Place Kamakshi Vilakku lamps facing East or North for household peace and spiritual prosperity. Ensure the wick and oil reservoir are wiped clean after daily puja.",
      "Kalash pots filled with holy water, mango leaves, and silver coins invoke Goddess Lakshmi's eternal presence in your sanctuary."
    ]
  }
];

export function SilverGuideSection() {
  const [activeArticle, setActiveArticle] = useState<GuideArticle | null>(null);

  return (
    <section className="py-20 lg:py-28 bg-[#fbf9f4] border-b border-[#e8e8e8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#e8e8e8] pb-6 gap-4"
        >
          <div>
            <div className="flex items-center gap-2 text-[#725b38] font-sans-editorial text-xs uppercase tracking-[0.25em] font-semibold mb-2">
              <BookOpen className="w-4 h-4 text-[#c5a880]" />
              Knowledge & Heritage
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl text-[#010101] tracking-tight">
              KNOW YOUR SILVER
            </h2>
          </div>
          <span className="font-sans-editorial text-xs text-[#444748] max-w-xs">
            Expert insights on silver purity, hallmarking standards, maintenance, and ritual significance.
          </span>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {KNOWLEDGE_ARTICLES.map((article) => (
            <motion.div
              key={article.id}
              variants={fadeUp}
              onClick={() => setActiveArticle(article)}
              className="bg-[#ffffff] border border-[#e8e8e8] p-5 hover:border-[#725b38] transition-all duration-300 cursor-pointer group flex flex-col justify-between metallic-sheen shadow-sm hover:shadow-md"
            >
              <div>
                <div className="relative w-full h-44 overflow-hidden mb-4 bg-[#f5f3ee] border border-[#e8e8e8]">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2 right-2 bg-[#010101]/90 text-[#c5a880] px-2 py-0.5 font-sans-editorial text-[9px] uppercase font-bold tracking-widest border border-[#c5a880]">
                    {article.readTime}
                  </span>
                </div>

                <span className="font-sans-editorial text-[10px] uppercase tracking-widest text-[#725b38] font-bold block mb-1">
                  {article.category}
                </span>
                <h3 className="font-serif-luxury text-lg text-[#010101] font-semibold mb-2 group-hover:text-[#725b38] transition-colors">
                  {article.title}
                </h3>
                <p className="font-sans-editorial text-xs text-[#444748] line-clamp-2 leading-relaxed mb-4">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-[#f5f3ee] flex items-center justify-between font-sans-editorial text-xs font-bold text-[#010101] group-hover:text-[#725b38]">
                <span>Read Article</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <ArticleModal article={activeArticle} onClose={() => setActiveArticle(null)} />
    </section>
  );
}
