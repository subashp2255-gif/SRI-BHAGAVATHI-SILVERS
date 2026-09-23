"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, ShieldCheck, Award, Clock, Hammer, ArrowLeft, CheckCircle2, MessageSquare, Share2 } from "lucide-react";
import { CUSTOMIZED_PIECES } from "@/data/customized";
import { SilverReflectionCard } from "@/components/SilverReflectionCard";
import { CustomEnquiryModal } from "@/components/CustomEnquiryModal";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SearchModal } from "@/components/SearchModal";
import { CartDrawer } from "@/components/CartDrawer";
import { WishlistDrawer } from "@/components/WishlistDrawer";
import { WhatsAppConcierge } from "@/components/WhatsAppConcierge";

export default function CustomizedDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const piece = CUSTOMIZED_PIECES.find((p) => p.slug === slug);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(piece?.image || "");

  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);

  if (!piece) {
    return (
      <div className="min-h-screen bg-[#fbf9f4] flex flex-col justify-between">
        <Navbar
          onOpenSearch={() => setSearchOpen(true)}
          onOpenWishlist={() => setWishlistOpen(true)}
          onOpenCart={() => setCartOpen(true)}
        />
        <div className="pt-36 pb-20 flex items-center justify-center text-center px-4 flex-grow">
          <div className="space-y-4 max-w-md">
            <h1 className="font-serif-luxury text-3xl text-[#010101]">Customized Piece Not Found</h1>
            <p className="font-sans-editorial text-xs text-[#444748]">
              The bespoke silver ornament you are looking for is currently unavailable in our active showcase archive.
            </p>
            <Link
              href="/customized"
              className="inline-flex items-center gap-2 bg-[#010101] text-white px-6 py-3 text-xs font-sans-editorial uppercase tracking-widest font-bold"
            >
              ← Back To Customized Studio
            </Link>
          </div>
        </div>
        <Footer />
        <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
        <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
        <WishlistDrawer isOpen={wishlistOpen} onClose={() => setWishlistOpen(false)} onQuickView={() => {}} />
        <WhatsAppConcierge />
      </div>
    );
  }

  const relatedPieces = CUSTOMIZED_PIECES.filter((p) => p.id !== piece.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#fbf9f4] text-[#010101] flex flex-col justify-between">
      {/* BRAND NAVBAR HEADER */}
      <Navbar
        onOpenSearch={() => setSearchOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
        onOpenCart={() => setCartOpen(true)}
      />

      <main className="flex-grow pt-24 sm:pt-32 pb-16">
        {/* Top Breadcrumb Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="flex items-center gap-2 font-sans-editorial text-xs text-[#444748]">
            <Link href="/customized" className="hover:text-[#010101] flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Customized Studio
            </Link>
            <span className="text-[#c5a880]">•</span>
            <span className="text-[#725b38] font-semibold">{piece.category}</span>
            <span className="text-[#c5a880]">•</span>
            <span className="text-[#010101] truncate max-w-[200px] sm:max-w-xs">{piece.name}</span>
          </div>
        </div>

        {/* Main Detail Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Left Column: Visual Gallery presentation */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative aspect-[4/3] bg-[#f5f3ee] border border-[#e8e8e8] shadow-xl overflow-hidden group">
                <img
                  src={activeImage || piece.image}
                  alt={piece.name}
                  className="w-full h-full object-cover"
                />

                {/* Signature Metallic Reflection Sweep */}
                <div
                  className="absolute inset-0 pointer-events-none z-10"
                  style={{
                    background:
                      "linear-gradient(115deg, transparent 0%, rgba(255,255,255,0.03) 35%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.03) 65%, transparent 100%)",
                  }}
                />

                <div className="absolute top-4 left-4 z-20">
                  <span className="font-sans-editorial text-[10px] uppercase tracking-[0.2em] bg-[#010101] text-white px-3 py-1 font-bold shadow-md">
                    {piece.category}
                  </span>
                </div>
              </div>

              {/* Thumbnail switcher if concept sketch exists */}
              {piece.conceptSketchImage && (
                <div className="flex gap-3">
                  <button
                    onClick={() => setActiveImage(piece.image)}
                    className={`relative w-24 aspect-square border overflow-hidden transition-all ${
                      activeImage === piece.image ? "border-[#010101] ring-2 ring-[#725b38]" : "border-[#e8e8e8]"
                    }`}
                  >
                    <img src={piece.image} alt="Finished Silver" className="w-full h-full object-cover" />
                    <span className="absolute bottom-0 inset-x-0 bg-[#010101]/80 text-white text-[8px] font-sans-editorial uppercase text-center py-0.5">
                      Finished Silver
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveImage(piece.conceptSketchImage!)}
                    className={`relative w-24 aspect-square border overflow-hidden transition-all ${
                      activeImage === piece.conceptSketchImage ? "border-[#010101] ring-2 ring-[#725b38]" : "border-[#e8e8e8]"
                    }`}
                  >
                    <img src={piece.conceptSketchImage} alt="Concept Design Sketch" className="w-full h-full object-cover" />
                    <span className="absolute bottom-0 inset-x-0 bg-[#010101]/80 text-white text-[8px] font-sans-editorial uppercase text-center py-0.5">
                      Concept Sketch
                    </span>
                  </button>
                </div>
              )}
            </div>

            {/* Right Column: Piece Specifications & Enquiry */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                {piece.occasions && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {piece.occasions.map((occ) => (
                      <span
                        key={occ}
                        className="font-sans-editorial text-[10px] uppercase tracking-wider text-[#725b38] font-bold bg-[#f5f3ee] px-2.5 py-0.5 border border-[#e8e8e8]"
                      >
                        {occ}
                      </span>
                    ))}
                  </div>
                )}

                <h1 className="font-serif-luxury text-2xl sm:text-3xl lg:text-4xl text-[#010101] tracking-wide leading-tight mb-3">
                  {piece.name}
                </h1>

                <p className="font-sans-editorial text-xs sm:text-sm text-[#444748] leading-relaxed">
                  {piece.fullDescription}
                </p>
              </div>

              {/* Craftsmanship Specs Table */}
              <div className="bg-[#ffffff] border border-[#e8e8e8] p-5 space-y-3">
                <h3 className="font-serif-luxury text-sm font-bold text-[#010101] uppercase tracking-wider pb-2 border-b border-[#e8e8e8]">
                  Atelier Craft Specifications
                </h3>

                <div className="grid grid-cols-2 gap-y-2 text-xs font-sans-editorial">
                  <div className="text-[#444748]">Metal Composition:</div>
                  <div className="font-semibold text-[#010101]">{piece.craftsmanshipDetails.metal}</div>

                  <div className="text-[#444748]">Hallmark Guarantee:</div>
                  <div className="font-semibold text-[#725b38]">{piece.craftsmanshipDetails.hallmark}</div>

                  <div className="text-[#444748]">Artisan Technique:</div>
                  <div className="font-semibold text-[#010101]">{piece.craftsmanshipDetails.technique}</div>

                  <div className="text-[#444748]">Estimated Turnaround:</div>
                  <div className="font-semibold text-[#010101]">{piece.craftsmanshipDetails.turnaroundDays}</div>
                </div>
              </div>

              {/* Customization Options List */}
              {piece.customizationOptions && piece.customizationOptions.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-sans-editorial text-xs uppercase tracking-wider font-bold text-[#010101]">
                    Available Customization Scope:
                  </h4>
                  <ul className="space-y-1.5">
                    {piece.customizationOptions.map((opt, i) => (
                      <li key={i} className="font-sans-editorial text-xs text-[#444748] flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#725b38] shrink-0" />
                        <span>{opt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Client Story Snippet */}
              {piece.storySnippet && (
                <div className="p-4 bg-[#f5f3ee] border border-[#e8e8e8] italic text-xs font-sans-editorial text-[#444748]">
                  &ldquo;{piece.storySnippet}&rdquo;
                </div>
              )}

              {/* Main Enquiry CTA */}
              <div className="pt-4 flex flex-col gap-3">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full bg-[#010101] hover:bg-[#725b38] text-white py-4 px-6 font-sans-editorial text-xs uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-3 transition-all shadow-md group"
                >
                  Request Custom Quote For This Piece <ArrowRight className="w-4 h-4 text-[#c5a880] group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => {
                    const text = encodeURIComponent(
                      `Hello Sri Bhagavathi Silvers, I am interested in customizing a piece similar to: ${piece.name} (Slug: ${piece.slug})`
                    );
                    window.open(`https://wa.me/919876543210?text=${text}`, "_blank");
                  }}
                  className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-3 px-6 font-sans-editorial text-xs uppercase tracking-[0.16em] font-bold flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" /> Discuss Design via WhatsApp
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Related Custom Pieces */}
        {relatedPieces.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#e8e8e8] pt-16">
            <div className="mb-8">
              <span className="font-sans-editorial text-[10px] uppercase tracking-[0.2em] text-[#725b38] font-bold block mb-1">
                Atelier Archive
              </span>
              <h3 className="font-serif-luxury text-2xl text-[#010101]">MORE CUSTOMIZED PIECES</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPieces.map((relPiece) => (
                <SilverReflectionCard
                  key={relPiece.id}
                  piece={relPiece}
                  onEnquire={() => setIsModalOpen(true)}
                  aspectRatio="square"
                />
              ))}
            </div>
          </section>
        )}
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
        preselectedCategory={piece.category}
        preselectedPieceName={piece.name}
      />
    </div>
  );
}
