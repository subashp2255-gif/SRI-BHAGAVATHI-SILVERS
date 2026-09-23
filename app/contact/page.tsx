"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppConcierge } from "@/components/WhatsAppConcierge";
import { SearchModal } from "@/components/SearchModal";
import { CartDrawer } from "@/components/CartDrawer";
import { WishlistDrawer } from "@/components/WishlistDrawer";
import { QuickViewModal } from "@/components/QuickViewModal";
import { Product } from "@/data/products";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { StoreLocatorSection } from "@/components/StoreLocatorSection";
import { ShowroomFinalCTA } from "@/components/ShowroomFinalCTA";
import { STORE_CONFIG, STORE_JSON_LD } from "@/lib/storeConfig";

export default function ContactPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);

  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf9f4]">
      <Navbar
        onOpenSearch={() => setSearchOpen(true)}
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
      />

      <main className="flex-grow w-full pt-24">
        {/* Header */}
        <div className="w-full bg-[#f5f3ee] py-12 border-b border-[#e8e8e8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-2xl">
            <span className="font-sans-editorial text-xs uppercase tracking-[0.25em] text-[#725b38] block font-bold mb-2">
              Concierge Assistance
            </span>
            <h1 className="font-serif-luxury text-4xl sm:text-5xl text-[#010101] tracking-tight mb-3">
              Contact Sri Bhagavathi Silvers
            </h1>
            <p className="font-sans-editorial text-sm sm:text-base text-[#444748]">
              We are available to answer weight queries, arrange insured shipping consultations, or customize traditional silver heirlooms.
            </p>
          </div>
        </div>

        {/* Form + Store Quick Cards */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Direct Info */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#ffffff] p-6 border border-[#e8e8e8] shadow-sm space-y-4">
                <h3 className="font-serif-luxury text-xl text-[#010101] font-semibold">
                  Flagship Store & Concierge
                </h3>
                <div className="space-y-3 font-sans-editorial text-sm text-[#444748]">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#725b38] mt-1 shrink-0" />
                    <p>{STORE_CONFIG.address.fullFormatted}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#725b38] shrink-0" />
                    <p>{STORE_CONFIG.phone}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#725b38] shrink-0" />
                    <p>{STORE_CONFIG.email}</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#f5f3ee] p-6 border border-[#e8e8e8]">
                <h4 className="font-serif-luxury text-lg text-[#010101] font-semibold mb-2">
                  Store Operating Hours
                </h4>
                <p className="font-sans-editorial text-xs text-[#444748] leading-relaxed">
                  Monday through Sunday: 10:00 AM – 8:30 PM (All Days Open)<br />
                  Video consultations available by pre-arranged WhatsApp appointment.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-[#ffffff] p-8 border border-[#e8e8e8] shadow-md">
                <h3 className="font-serif-luxury text-2xl text-[#010101] mb-6">
                  Send Us an Inquiry
                </h3>

                {submitted ? (
                  <div className="bg-[#f5f3ee] p-8 text-center border border-[#c5a880] space-y-3">
                    <CheckCircle className="w-10 h-10 text-[#725b38] mx-auto" />
                    <h4 className="font-serif-luxury text-xl text-[#010101]">Inquiry Transmitted</h4>
                    <p className="font-sans-editorial text-sm text-[#444748]">
                      Thank you for contacting Sri Bhagavathi Silvers. A senior concierge representative will respond within 2-4 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 font-sans-editorial text-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#010101] font-semibold mb-1">
                          Your Name *
                        </label>
                        <input
                          suppressHydrationWarning
                          type="text"
                          required
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          placeholder="e.g. Ramesh Kumar"
                          className="w-full bg-[#f5f3ee] p-3 border border-[#e8e8e8] focus:outline-none focus:border-[#010101]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#010101] font-semibold mb-1">
                          Phone Number *
                        </label>
                        <input
                          suppressHydrationWarning
                          type="tel"
                          required
                          value={contactForm.phone}
                          onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full bg-[#f5f3ee] p-3 border border-[#e8e8e8] focus:outline-none focus:border-[#010101]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#010101] font-semibold mb-1">
                        Email Address
                      </label>
                      <input
                        suppressHydrationWarning
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="ramesh@example.com"
                        className="w-full bg-[#f5f3ee] p-3 border border-[#e8e8e8] focus:outline-none focus:border-[#010101]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#010101] font-semibold mb-1">
                        Subject / Article Reference
                      </label>
                      <input
                        suppressHydrationWarning
                        type="text"
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                        placeholder="e.g. Kamakshi Vilakku custom weight quote"
                        className="w-full bg-[#f5f3ee] p-3 border border-[#e8e8e8] focus:outline-none focus:border-[#010101]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#010101] font-semibold mb-1">
                        Message Details *
                      </label>
                      <textarea
                        suppressHydrationWarning
                        rows={4}
                        required
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        placeholder="Describe your inquiry..."
                        className="w-full bg-[#f5f3ee] p-3 border border-[#e8e8e8] focus:outline-none focus:border-[#010101]"
                      />
                    </div>

                    <button
                      suppressHydrationWarning
                      type="submit"
                      className="w-full bg-[#010101] text-[#ffffff] font-sans-editorial text-xs uppercase tracking-[0.18em] py-4 shadow hover:bg-[#333333] transition-colors font-semibold flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4 text-[#c5a880]" />
                      <span>SUBMIT BOUTIQUE INQUIRY</span>
                    </button>
                  </form>
                )}

              </div>
            </div>
          </div>
        </section>

        {/* Store Location Map Showcase */}
        <StoreLocatorSection />

        {/* Pre-Footer Final Showroom CTA */}
        <ShowroomFinalCTA />

        <WhatsAppConcierge />
      </main>

      {/* JSON-LD LocalBusiness Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(STORE_JSON_LD) }}
      />

      <Footer />

      <QuickViewModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <WishlistDrawer
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        onQuickView={(p) => setSelectedProduct(p)}
      />
    </div>
  );
}
