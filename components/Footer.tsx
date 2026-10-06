"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShieldCheck, Award, Lock, Instagram, Facebook, Youtube, MessageCircle, ChevronDown } from "lucide-react";

function FooterAccordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-[#e8e8e8] md:border-b-0 pb-1 md:pb-0">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-3 md:py-0 min-h-[44px] md:min-h-0 font-sans-editorial text-xs uppercase tracking-[0.18em] text-[#010101] font-bold text-left md:pointer-events-none md:mb-4"
        aria-expanded={isOpen}
        suppressHydrationWarning
      >
        <span>{title}</span>
        <ChevronDown className={`w-4 h-4 text-[#725b38] md:hidden transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <div className={`mt-1 md:mt-0 ${isOpen ? "block pb-3 md:pb-0" : "hidden md:block"}`}>
        {children}
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="w-full bg-[#f5f3ee] pt-12 sm:pt-16 pb-8 border-t border-[#e8e8e8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand Logo Header */}
        <div className="flex items-center gap-3.5 sm:gap-4 mb-8 sm:mb-10 pb-5 sm:pb-6 border-b border-[#e8e8e8]">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden bg-[#ffffff] border border-[#c5a880] p-1 shadow-sm flex items-center justify-center shrink-0">
            <img src="/logo-emblem.png" alt="Sri Bagavathi Silvers Emblem Logo" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif-luxury text-lg sm:text-2xl tracking-[0.15em] uppercase text-[#010101] font-semibold leading-tight">
              Sri Bagavathi Silvers
            </span>
            <span className="font-sans-editorial text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] text-[#725b38] uppercase font-bold mt-0.5">
              Certified Hallmark 925 & 999 Fine Bullion Silver
            </span>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2 md:gap-8 mb-8 md:mb-14">
          {/* Shop Column */}
          <FooterAccordion title="Shop">
            <ul className="space-y-1.5 md:space-y-2.5 font-sans-editorial text-xs text-[#444748] pb-2 md:pb-0">
              <li>
                <Link href="/shop" className="hover:text-[#010101] transition-colors py-1.5 block">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/shop?category=necklaces" className="hover:text-[#010101] transition-colors py-1.5 block">
                  Silver Jewellery
                </Link>
              </li>
              <li>
                <Link href="/shop?category=articles" className="hover:text-[#010101] transition-colors py-1.5 block">
                  Silver Articles
                </Link>
              </li>
              <li>
                <Link href="/shop?category=pooja" className="hover:text-[#010101] transition-colors py-1.5 block">
                  Pooja Collection
                </Link>
              </li>
              <li>
                <Link href="/shop?sort=newest" className="hover:text-[#010101] transition-colors py-1.5 block">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </FooterAccordion>

          {/* Collections Column */}
          <FooterAccordion title="Collections">
            <ul className="space-y-1.5 md:space-y-2.5 font-sans-editorial text-xs text-[#444748] pb-2 md:pb-0">
              <li>
                <Link href="/customized" className="hover:text-[#010101] transition-colors font-semibold text-[#725b38] py-1.5 block">
                  Customized Atelier ✨
                </Link>
              </li>
              <li>
                <Link href="/shop?category=anklets" className="hover:text-[#010101] transition-colors py-1.5 block">
                  Traditional Kolusu & Payal
                </Link>
              </li>
              <li>
                <Link href="/shop?sort=featured" className="hover:text-[#010101] transition-colors py-1.5 block">
                  Wedding Heirloom Sets
                </Link>
              </li>
              <li>
                <Link href="/pooja-and-articles" className="hover:text-[#010101] transition-colors py-1.5 block">
                  Festive Pooja Articles
                </Link>
              </li>
              <li>
                <Link href="/shop?category=bracelets" className="hover:text-[#010101] transition-colors py-1.5 block">
                  Kids & Infant Nazariya
                </Link>
              </li>
            </ul>
          </FooterAccordion>

          {/* Information Column */}
          <FooterAccordion title="Information">
            <ul className="space-y-1.5 md:space-y-2.5 font-sans-editorial text-xs text-[#444748] pb-2 md:pb-0">
              <li>
                <Link href="/about-us" className="hover:text-[#010101] transition-colors py-1.5 block">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#010101] transition-colors py-1.5 block">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/visit-our-store" className="hover:text-[#010101] transition-colors py-1.5 block">
                  Store Location
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="hover:text-[#010101] transition-colors py-1.5 block">
                  Silver Care & Hallmark Guarantee
                </Link>
              </li>
            </ul>
          </FooterAccordion>

          {/* Showroom & Concierge Column */}
          <div className="lg:col-span-2 pt-4 md:pt-0 border-t border-[#e8e8e8] md:border-t-0">
            <h4 className="font-sans-editorial text-xs uppercase tracking-[0.18em] text-[#010101] font-bold mb-3 sm:mb-4">
              Showroom & Concierge
            </h4>
            <div className="space-y-2 font-sans-editorial text-xs text-[#444748] mb-6 leading-relaxed">
              <p>
                <strong className="text-[#010101]">Flagship Boutique:</strong> 714, Vasavi Towers, Raja St, Town Hall, Coimbatore, Tamil Nadu 641001, India
              </p>
              <p>
                <strong className="text-[#010101]">Phone:</strong>{" "}
                <a href="tel:+914222345678" className="hover:text-[#725b38] underline transition-colors">
                  +91 422 234 5678
                </a>
              </p>
              <p>
                <strong className="text-[#010101]">Email:</strong>{" "}
                <a href="mailto:boutique@bhagavathisilvers.com" className="hover:text-[#725b38] underline transition-colors">
                  boutique@bhagavathisilvers.com
                </a>
              </p>
              <p>
                <strong className="text-[#010101]">Boutique Hours:</strong> Monday – Sunday: 10:00 AM – 8:30 PM
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-11 h-11 bg-[#ffffff] border border-[#e8e8e8] text-[#444748] hover:text-[#010101] transition-colors flex items-center justify-center shrink-0 min-w-[44px] min-h-[44px]"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-11 h-11 bg-[#ffffff] border border-[#e8e8e8] text-[#444748] hover:text-[#010101] transition-colors flex items-center justify-center shrink-0 min-w-[44px] min-h-[44px]"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-11 h-11 bg-[#ffffff] border border-[#e8e8e8] text-[#444748] hover:text-[#010101] transition-colors flex items-center justify-center shrink-0 min-w-[44px] min-h-[44px]"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-11 h-11 bg-[#ffffff] border border-[#e8e8e8] text-[#444748] hover:text-[#010101] transition-colors flex items-center justify-center shrink-0 min-w-[44px] min-h-[44px]"
              >
                <MessageCircle className="w-4 h-4 text-[#725b38]" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Trust & Copyright Bar */}
        <div className="pt-6 border-t border-[#e8e8e8] flex flex-col md:flex-row items-center justify-between gap-4 bg-[#f0eee9] p-4 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6">
            <div className="flex items-center gap-1.5 font-sans-editorial text-xs uppercase tracking-wider text-[#010101]">
              <ShieldCheck className="w-4 h-4 text-[#725b38]" />
              <span>925 Sterling Purity</span>
            </div>
            <div className="flex items-center gap-1.5 font-sans-editorial text-xs uppercase tracking-wider text-[#010101]">
              <Award className="w-4 h-4 text-[#725b38]" />
              <span>BIS Hallmarked</span>
            </div>
            <div className="flex items-center gap-1.5 font-sans-editorial text-xs uppercase tracking-wider text-[#010101]">
              <Lock className="w-4 h-4 text-[#725b38]" />
              <span>Insured Transit</span>
            </div>
          </div>

          <p className="font-sans-editorial text-xs text-[#444748]">
            © 2026 SRI BHAGAVATHI SILVERS. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
