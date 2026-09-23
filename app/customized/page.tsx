"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, ShieldCheck, Award, Filter, MapPin, PhoneCall, Check, Sparkle, Layers } from "lucide-react";
import { CUSTOM_CATEGORIES, CUSTOMIZATION_TYPES, CUSTOMIZED_PIECES, CustomizedPiece } from "@/data/customized";
import { SilverReflectionCard } from "@/components/SilverReflectionCard";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { HorizontalCustomRail } from "@/components/HorizontalCustomRail";
import { IdeaToCreationTransition } from "@/components/IdeaToCreationTransition";
import { CustomEnquiryModal } from "@/components/CustomEnquiryModal";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SearchModal } from "@/components/SearchModal";
import { CartDrawer } from "@/components/CartDrawer";
import { WishlistDrawer } from "@/components/WishlistDrawer";
import { WhatsAppConcierge } from "@/components/WhatsAppConcierge";

export default function CustomizedPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedOccasion, setSelectedOccasion] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [enquiryPiece, setEnquiryPiece] = useState<{ name?: string; category?: string }>({});

  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [wishlistOpen, setWishlistOpen] = useState<boolean>(false);

  const occasionsList = ["all", "Housewarming", "Wedding", "Baby", "Anniversary", "Pooja", "Corporate"];

  const handleOpenEnquiry = (pieceName?: string, category?: string) => {
    setEnquiryPiece({ name: pieceName, category: category || "Name Plates" });
    setIsModalOpen(true);
  };

  const filteredPieces = CUSTOMIZED_PIECES.filter((piece) => {
    const matchesCategory =
      selectedCategory === "all" || piece.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesOccasion =
      selectedOccasion === "all" ||
      (piece.occasions && piece.occasions.some((occ) => occ.toLowerCase() === selectedOccasion.toLowerCase()));
    return matchesCategory && matchesOccasion;
  });

  return (
    <div className="min-h-screen bg-[#fbf9f4] text-[#010101] flex flex-col justify-between">
      {/* BRAND NAVBAR HEADER */}
      <Navbar
        onOpenSearch={() => setSearchOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
        onOpenCart={() => setCartOpen(true)}
      />

      <main className="flex-grow pt-24 sm:pt-32">
        {/* ==================================================
            1. CINEMATIC EDITORIAL HERO
        ================================================== */}
        <section className="relative overflow-hidden pt-6 pb-16 sm:pb-24 border-b border-[#e8e8e8]">
          {/* Background Watermark */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 watermark-editorial text-[16vw] opacity-15 select-none pointer-events-none">
            CUSTOM
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* LEFT HERO COLUMN */}
              <div className="lg:col-span-6 space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-[#f5f3ee] border border-[#e8e8e8] text-[#725b38]"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span className="font-sans-editorial text-[11px] uppercase tracking-[0.25em] font-bold">
                    Bespoke Silver Atelier
                  </span>
                </motion.div>

                {/* Mask Reveal Headline */}
                <div className="overflow-hidden">
                  <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                    className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl text-[#010101] tracking-wide leading-[1.1]"
                  >
                    CUSTOMIZED IN SILVER
                  </motion.h1>
                </div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.25 }}
                  className="font-sans-editorial text-sm sm:text-base text-[#444748] max-w-xl leading-relaxed"
                >
                  Made for your moment. Crafted in silver. Turn meaningful ideas, family crests, and sacred memories into hallmarked 925 sterling silver masterpieces.
                </motion.p>

                {/* Process Pipeline Micro-Summary */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.35 }}
                  className="py-3 px-4 bg-[#ffffff] border border-[#e8e8e8] flex flex-wrap items-center gap-2 text-[11px] font-sans-editorial uppercase tracking-wider text-[#725b38] font-bold"
                >
                  <span>Custom Idea</span>
                  <span className="text-[#c5a880]">↓</span>
                  <span>Silver Craftsmanship</span>
                  <span className="text-[#c5a880]">↓</span>
                  <span>Personalized Design</span>
                  <span className="text-[#c5a880]">↓</span>
                  <span className="text-[#010101]">Finished Ornament</span>
                </motion.div>

                {/* Hero Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex flex-wrap gap-4 pt-2"
                >
                  <button
                    type="button"
                    suppressHydrationWarning
                    onClick={() => handleOpenEnquiry()}
                    className="bg-[#010101] hover:bg-[#725b38] text-white px-8 py-4 font-sans-editorial text-xs uppercase tracking-[0.2em] font-bold inline-flex items-center gap-3 transition-all shadow-md group"
                  >
                    Start A Custom Enquiry <ArrowRight className="w-4 h-4 text-[#c5a880] group-hover:translate-x-1 transition-transform" />
                  </button>

                  <a
                    href="#showcase"
                    className="bg-[#ffffff] border border-[#e8e8e8] hover:border-[#010101] text-[#010101] px-6 py-4 font-sans-editorial text-xs uppercase tracking-[0.18em] font-bold inline-flex items-center gap-2 transition-all shadow-sm"
                  >
                    Explore Showcase ↓
                  </a>
                </motion.div>
              </div>

              {/* RIGHT HERO ASYMMETRICAL IMAGE */}
              <div className="lg:col-span-6 relative">
                <motion.div
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="relative aspect-[4/3] sm:aspect-[5/4] bg-[#f5f3ee] border border-[#e8e8e8] shadow-2xl overflow-hidden group"
                >
                  <img
                    src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1400&q=85"
                    alt="Sri Bhagavathi Silvers Customized 925 Silver Piece"
                    className="w-full h-full object-cover"
                  />

                  {/* Metallic Reflection Sweep Effect */}
                  <div
                    className="absolute inset-0 pointer-events-none z-10"
                    style={{
                      background:
                        "linear-gradient(115deg, transparent 0%, rgba(255,255,255,0.03) 30%, rgba(255,255,255,0.45) 50%, rgba(255,255,255,0.03) 70%, transparent 100%)",
                    }}
                  />

                  {/* Floating Glassmorphic Atelier Card */}
                  <div className="absolute bottom-4 left-4 right-4 bg-[#fbf9f4]/90 backdrop-blur-md p-4 border border-[#e8e8e8] flex items-center justify-between z-20">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#010101] text-[#c5a880] flex items-center justify-center font-serif-luxury font-bold text-sm">
                        925
                      </div>
                      <div>
                        <h3 className="font-serif-luxury text-sm font-semibold text-[#010101]">Bespoke Silver Atelier</h3>
                        <p className="font-sans-editorial text-[11px] text-[#444748]">100% Certified BIS Hallmark Purity Guarantee</p>
                      </div>
                    </div>

                    <span className="font-sans-editorial text-[10px] uppercase tracking-widest text-[#725b38] font-bold hidden sm:inline-block">
                      Coimbatore Studio
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            2. MADE MEANINGFUL — STORYTELLING SECTION
        ================================================== */}
        <section className="py-16 bg-[#ffffff] border-b border-[#e8e8e8] relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
            <span className="font-sans-editorial text-[11px] uppercase tracking-[0.25em] text-[#725b38] font-bold block">
              Crafted For Generations
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-4xl text-[#010101] tracking-wide leading-tight">
              &ldquo;Some moments deserve something made just for you.&rdquo;
            </h2>
            <p className="font-sans-editorial text-xs sm:text-sm text-[#444748] max-w-2xl mx-auto leading-relaxed">
              At Sri Bhagavathi Silvers, customization is not merely adding a name tag — it is translating your devotion, family heritage, and milestones into enduring sterling silver that becomes tomorrow&apos;s heirloom.
            </p>
          </div>
        </section>

        {/* ==================================================
            3. WHAT CAN WE CUSTOMIZE? (CUSTOMIZATION TYPES)
        ================================================== */}
        <section className="py-20 bg-[#fbf9f4] border-b border-[#e8e8e8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#f5f3ee] border border-[#e8e8e8] text-[#725b38]">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="font-sans-editorial text-[11px] uppercase tracking-[0.25em] font-bold">
                  Atelier Scope
                </span>
              </div>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#010101] tracking-wide">
                WHAT CAN WE CUSTOMIZE?
              </h2>
              <p className="font-sans-editorial text-xs sm:text-sm text-[#444748]">
                Explore the spectrum of personalized silver techniques available at our Coimbatore master workshop.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {CUSTOMIZATION_TYPES.map((type, idx) => (
                <motion.div
                  key={type.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="bg-[#ffffff] border border-[#e8e8e8] p-6 space-y-4 hover:border-[#725b38] transition-all group shadow-sm hover:shadow-md"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-[#f5f3ee]">
                    <img
                      src={type.image}
                      alt={type.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2.5 left-2.5 font-sans-editorial text-[9px] uppercase tracking-widest bg-[#010101] text-white px-2 py-0.5 font-bold">
                      {type.tag}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="font-serif-luxury text-lg text-[#010101] group-hover:text-[#725b38] transition-colors">
                      {type.title}
                    </h3>
                    <p className="font-sans-editorial text-xs text-[#444748] leading-relaxed">
                      {type.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================
            4. EDITORIAL SHOWCASE MASONRY GALLERY
        ================================================== */}
        <section id="showcase" className="py-20 bg-[#ffffff] border-b border-[#e8e8e8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#f5f3ee] border border-[#e8e8e8] text-[#725b38]">
                  <Layers className="w-3.5 h-3.5" />
                  <span className="font-sans-editorial text-[11px] uppercase tracking-[0.25em] font-bold">
                    Bespoke Portfolio
                  </span>
                </div>
                <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl text-[#010101] tracking-wide">
                  CRAFTED FOR YOU
                </h2>
                <p className="font-sans-editorial text-xs sm:text-sm text-[#444748] max-w-xl">
                  Browse real customized silver pieces crafted by Sri Bhagavathi Silvers. Select any piece to view details or request a custom quote.
                </p>
              </div>

              {/* Filter Tabs */}
              <div className="flex flex-col gap-3">
                {/* Category Filter Pills */}
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    suppressHydrationWarning
                    onClick={() => setSelectedCategory("all")}
                    className={`px-3.5 py-1.5 font-sans-editorial text-[11px] uppercase tracking-wider font-bold transition-all border ${
                      selectedCategory === "all"
                        ? "bg-[#010101] text-white border-[#010101]"
                        : "bg-[#ffffff] text-[#444748] border-[#e8e8e8] hover:border-[#725b38]"
                    }`}
                  >
                    All Categories
                  </button>
                  {CUSTOM_CATEGORIES.map((cat) => (
                    <button
                      type="button"
                      suppressHydrationWarning
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`px-3.5 py-1.5 font-sans-editorial text-[11px] uppercase tracking-wider font-bold transition-all border ${
                        selectedCategory === cat.name
                          ? "bg-[#010101] text-white border-[#010101]"
                          : "bg-[#ffffff] text-[#444748] border-[#e8e8e8] hover:border-[#725b38]"
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>

                {/* Occasion Filter Pills */}
                <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-[#f5f3ee]">
                  <span className="font-sans-editorial text-[10px] uppercase tracking-wider text-[#725b38] font-bold mr-1">
                    Filter Occasion:
                  </span>
                  {occasionsList.map((occ) => (
                    <button
                      type="button"
                      suppressHydrationWarning
                      key={occ}
                      onClick={() => setSelectedOccasion(occ)}
                      className={`px-2.5 py-1 font-sans-editorial text-[10px] uppercase tracking-wider transition-all border ${
                        selectedOccasion === occ
                          ? "bg-[#725b38] text-white border-[#725b38] font-bold"
                          : "bg-[#f5f3ee] text-[#444748] border-[#e8e8e8] hover:border-[#725b38]"
                      }`}
                    >
                      {occ === "all" ? "All Occasions" : occ}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* EDITORIAL MASONRY GRID */}
            {filteredPieces.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPieces.map((piece, index) => {
                  const ratioPattern: Array<"tall" | "square" | "wide"> = ["tall", "square", "wide", "square", "tall", "wide"];
                  const ratio = ratioPattern[index % ratioPattern.length];

                  return (
                    <motion.div
                      key={piece.id}
                      initial={{ opacity: 0, y: 25 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                    >
                      <SilverReflectionCard
                        piece={piece}
                        onEnquire={(name, cat) => handleOpenEnquiry(name, cat)}
                        aspectRatio={ratio}
                      />
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="py-16 text-center bg-[#fbf9f4] border border-[#e8e8e8] space-y-3">
                <span className="font-serif-luxury text-xl text-[#010101]">MORE CUSTOM PIECES COMING SOON</span>
                <p className="font-sans-editorial text-xs text-[#444748] max-w-md mx-auto">
                  We are actively adding recent client commissions to our digital archive. Have a specific design in mind? Speak directly with our master silversmith.
                </p>
                <button
                  type="button"
                  suppressHydrationWarning
                  onClick={() => handleOpenEnquiry()}
                  className="mt-2 bg-[#010101] text-white px-6 py-2.5 font-sans-editorial text-xs uppercase tracking-widest font-bold"
                >
                  Submit Custom Idea
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ==================================================
            5. SIGNATURE CUSTOM PIECES (HORIZONTAL RAIL)
        ================================================== */}
        <HorizontalCustomRail onEnquire={(name, cat) => handleOpenEnquiry(name, cat)} />

        {/* ==================================================
            6. PROCESS ANIMATION (HOW CUSTOMIZATION WORKS)
        ================================================== */}
        <ProcessTimeline onStartEnquiry={() => handleOpenEnquiry()} />

        {/* ==================================================
            7. FROM IDEA TO CREATION (BEFORE/AFTER TRANSITION)
        ================================================== */}
        <IdeaToCreationTransition onStartEnquiry={() => handleOpenEnquiry()} />

        {/* ==================================================
            8. CUSTOMIZED BY OCCASION
        ================================================== */}
        <section className="py-20 bg-[#fbf9f4] border-b border-[#e8e8e8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
              <span className="font-sans-editorial text-[11px] uppercase tracking-[0.25em] text-[#725b38] font-bold block">
                Curated Milestones
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#010101] tracking-wide">
                CUSTOMIZED BY OCCASION
              </h2>
              <p className="font-sans-editorial text-xs sm:text-sm text-[#444748]">
                Select an occasion to explore tailored silver gifting and sacred article custom ideas.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { title: "Housewarming", subtitle: "Name Plates & Deepam", occ: "Housewarming" },
                { title: "Wedding", subtitle: "Thaali & Coin Sets", occ: "Wedding" },
                { title: "Baby Arrival", subtitle: "Nazariya & Kada", occ: "Baby" },
                { title: "Anniversary", subtitle: "Engraved Frames", occ: "Anniversary" },
                { title: "Sacred Pooja", subtitle: "Idols & Kalash", occ: "Pooja" },
                { title: "Corporate Gifts", subtitle: "Bullion & Plaques", occ: "Corporate" },
              ].map((item) => (
                <button
                  type="button"
                  suppressHydrationWarning
                  key={item.title}
                  onClick={() => {
                    setSelectedOccasion(item.occ);
                    document.getElementById("showcase")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="bg-[#ffffff] border border-[#e8e8e8] p-5 text-center hover:border-[#725b38] hover:shadow-md transition-all group flex flex-col justify-between h-36"
                >
                  <div className="w-8 h-8 rounded-full bg-[#f5f3ee] text-[#725b38] group-hover:bg-[#725b38] group-hover:text-white transition-colors flex items-center justify-center mx-auto mb-2 font-serif-luxury text-xs font-bold">
                    ✦
                  </div>
                  <div>
                    <h3 className="font-serif-luxury text-sm font-semibold text-[#010101] group-hover:text-[#725b38] transition-colors">
                      {item.title}
                    </h3>
                    <span className="font-sans-editorial text-[10px] text-[#444748] block mt-0.5">{item.subtitle}</span>
                  </div>
                  <span className="font-sans-editorial text-[9px] uppercase tracking-widest text-[#725b38] font-bold block pt-1">
                    Explore →
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================
            9. ENQUIRY CTA & BOUTIQUE VISIT BANNER
        ================================================== */}
        <section className="py-20 bg-[#010101] text-white relative overflow-hidden">
          {/* Subtle Watermark */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 watermark-editorial-dark text-[14vw] opacity-10 pointer-events-none">
            CRAFT
          </div>

          <div className="max-w-5xl mx-auto px-4 text-center space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#171716] border border-[#725b38]/40 text-[#c5a880]">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="font-sans-editorial text-[11px] uppercase tracking-[0.25em] font-bold">
                Direct Silver Concierge
              </span>
            </div>

            <h2 className="font-serif-luxury text-3xl sm:text-5xl tracking-wide text-white">
              START YOUR CUSTOM JOURNEY TODAY
            </h2>

            <p className="font-sans-editorial text-xs sm:text-sm text-[#bfc3c6] max-w-2xl mx-auto leading-relaxed">
              Speak directly with our Coimbatore master silversmiths or submit your initial rough sketch for a complimentary design assessment & 925 silver quote.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <button
                type="button"
                suppressHydrationWarning
                onClick={() => handleOpenEnquiry()}
                className="bg-[#c5a880] hover:bg-[#ffffff] text-[#010101] px-8 py-4 font-sans-editorial text-xs uppercase tracking-[0.2em] font-bold inline-flex items-center gap-3 transition-all shadow-xl"
              >
                Start A Custom Enquiry <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                href="/visit-our-store"
                className="bg-transparent border border-[#bfc3c6]/40 hover:border-white text-white px-8 py-4 font-sans-editorial text-xs uppercase tracking-[0.2em] font-bold inline-flex items-center gap-2 transition-all"
              >
                <MapPin className="w-4 h-4 text-[#c5a880]" /> Visit Coimbatore Boutique
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <Footer />

      {/* DRAWERS & MODALS */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <WishlistDrawer isOpen={wishlistOpen} onClose={() => setWishlistOpen(false)} onQuickView={() => {}} />
      <WhatsAppConcierge />

      {/* CUSTOM ENQUIRY MODAL */}
      <CustomEnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        preselectedCategory={enquiryPiece.category}
        preselectedPieceName={enquiryPiece.name}
      />
    </div>
  );
}
