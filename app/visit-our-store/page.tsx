"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StoreLocatorSection } from "@/components/StoreLocatorSection";
import { ShowroomFinalCTA } from "@/components/ShowroomFinalCTA";
import { STORE_JSON_LD } from "@/lib/storeConfig";
import { SearchModal } from "@/components/SearchModal";
import { CartDrawer } from "@/components/CartDrawer";
import { WishlistDrawer } from "@/components/WishlistDrawer";
import { QuickViewModal } from "@/components/QuickViewModal";
import { Product } from "@/data/products";
import { CheckCircle, Send } from "lucide-react";

export default function VisitStorePage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);

  const [bookingForm, setBookingForm] = useState({
    name: "",
    phone: "",
    date: "",
    categoryInterest: "Bridal Heirloom Silver",
    notes: "",
  });
  const [booked, setBooked] = useState(false);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBooked(true);
    setTimeout(() => setBooked(false), 6000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf9f4]">
      <Navbar
        onOpenSearch={() => setSearchOpen(true)}
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
      />

      <main className="flex-grow w-full pt-24">
        <StoreLocatorSection />

        {/* Private Boutique Viewing Appointment Form */}
        <section className="w-full bg-[#ffffff] py-16 sm:py-24 border-b border-[#e8e8e8]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#f5f3ee] p-8 sm:p-12 border border-[#e8e8e8] shadow-lg">
              <div className="text-center max-w-xl mx-auto mb-8">
                <span className="font-sans-editorial text-xs uppercase tracking-[0.2em] text-[#725b38] font-bold block mb-1">
                  Private Salon VIP Consultation
                </span>
                <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#010101]">
                  Book a Private Store Viewing
                </h2>
                <p className="font-sans-editorial text-sm text-[#444748] mt-2">
                  Reserve a dedicated consultation room with our senior master silversmith for wedding trough planning or custom article commissions.
                </p>
              </div>

              {booked ? (
                <div className="bg-[#ffffff] p-8 text-center border border-[#c5a880] space-y-3">
                  <CheckCircle className="w-10 h-10 text-[#725b38] mx-auto" />
                  <h3 className="font-serif-luxury text-2xl text-[#010101]">
                    Appointment Reservation Received
                  </h3>
                  <p className="font-sans-editorial text-sm text-[#444748]">
                    Our concierge team will confirm your date ({bookingForm.date}) and call you at {bookingForm.phone}. Thank you!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBooking} className="space-y-4 font-sans-editorial text-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#010101] font-semibold mb-1">
                        Full Name *
                      </label>
                      <input
                        suppressHydrationWarning
                        type="text"
                        required
                        value={bookingForm.name}
                        onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                        placeholder="e.g. Ananya Sundaram"
                        className="w-full bg-[#ffffff] p-3 border border-[#e8e8e8] focus:outline-none focus:border-[#010101]"
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
                        value={bookingForm.phone}
                        onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full bg-[#ffffff] p-3 border border-[#e8e8e8] focus:outline-none focus:border-[#010101]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#010101] font-semibold mb-1">
                        Preferred Date *
                      </label>
                      <input
                        suppressHydrationWarning
                        type="date"
                        required
                        value={bookingForm.date}
                        onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                        className="w-full bg-[#ffffff] p-3 border border-[#e8e8e8] focus:outline-none focus:border-[#010101]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#010101] font-semibold mb-1">
                        Primary Interest
                      </label>
                      <select
                        suppressHydrationWarning
                        value={bookingForm.categoryInterest}
                        onChange={(e) => setBookingForm({ ...bookingForm, categoryInterest: e.target.value })}
                        className="w-full bg-[#ffffff] p-3 border border-[#e8e8e8] focus:outline-none cursor-pointer"
                      >
                        <option value="Bridal Heirloom Silver">Bridal Heirloom Silver</option>
                        <option value="Pooja Sanctum Articles">Pooja Sanctum Articles</option>
                        <option value="Silver Dining & Articles">Silver Dining & Articles</option>
                        <option value="Bespoke Custom Commission">Bespoke Custom Commission</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#010101] font-semibold mb-1">
                      Notes or Special Requirements
                    </label>
                    <textarea
                      suppressHydrationWarning
                      rows={3}
                      value={bookingForm.notes}
                      onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                      placeholder="Specify estimated weight preferences, specific deepam sizes, or auspicious date requirements..."
                      className="w-full bg-[#ffffff] p-3 border border-[#e8e8e8] focus:outline-none focus:border-[#010101]"
                    />
                  </div>

                  <button
                    suppressHydrationWarning
                    type="submit"
                    className="w-full bg-[#010101] text-[#ffffff] font-sans-editorial text-xs uppercase tracking-[0.18em] py-4 shadow hover:bg-[#333333] transition-colors font-semibold flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4 text-[#c5a880]" />
                    <span>CONFIRM VIEWING RESERVATION</span>
                  </button>
                </form>

              )}
            </div>
          </div>
        </section>

        {/* Showroom Conversion CTA */}
        <ShowroomFinalCTA />
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
