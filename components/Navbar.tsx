"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, User, Heart, ShoppingBag, Menu, X, ChevronDown, Sparkles, ArrowRight, PhoneCall, Instagram } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AnnouncementBar } from "./AnnouncementBar";
import { SilverRateBar } from "./SilverRateBar";
import { InstagramModal } from "./InstagramModal";
import { InstagramButton } from "./InstagramButton";
import { megaMenuReveal } from "@/lib/animations";

interface NavbarProps {
  wishlistCount?: number;
  cartCount?: number;
  onOpenSearch?: () => void;
  onOpenWishlist?: () => void;
  onOpenCart?: () => void;
}

export function Navbar({
  wishlistCount = 2,
  cartCount = 1,
  onOpenSearch,
  onOpenWishlist,
  onOpenCart,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopMegaOpen, setShopMegaOpen] = useState(false);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);
  const [instagramOpen, setInstagramOpen] = useState(false);
  const pathname = usePathname();
  const megaMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mega menu on route change & handle body scroll lock for mobile menu
  useEffect(() => {
    setShopMegaOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: "SHOP", href: "/shop", hasMega: true },
    { name: "COLLECTIONS", href: "/collections" },
    { name: "OCCASIONS", href: "/occasions" },
    { name: "CUSTOMIZED", href: "/customized" },
    { name: "GIFTING", href: "/occasions/gifting" },
    { name: "OUR STORY", href: "/about-us" },
    { name: "VISIT US", href: "/visit-our-store" },
  ];

  const megaJewelleryLinks = [
    { name: "Silver Rings", href: "/shop?category=rings" },
    { name: "Silver Chains", href: "/shop?category=chains" },
    { name: "Silver Anklets (Kolusu)", href: "/shop?category=anklets" },
    { name: "Silver Bangles & Kadas", href: "/shop?category=bracelets" },
    { name: "Silver Necklaces & Chokers", href: "/shop?category=necklaces" },
    { name: "Silver Earrings & Jhumkas", href: "/shop?category=earrings" },
  ];

  const megaPoojaLinks = [
    { name: "Silver Idols & Statues", href: "/pooja-and-articles" },
    { name: "Kamakshi Deepams", href: "/pooja-and-articles" },
    { name: "Pooja Kalash & Panchapatra", href: "/pooja-and-articles" },
    { name: "Pooja Bells & Trays", href: "/pooja-and-articles" },
    { name: "Silver Dining Sets", href: "/shop?category=articles" },
  ];

  const megaGiftsLinks = [
    { name: "999 Pure Silver Coins", href: "/shop?category=coins" },
    { name: "50g Silver Bullion Bars", href: "/shop?category=coins" },
    { name: "Infant Nazariya & Baby Gifts", href: "/shop?category=bracelets" },
    { name: "Corporate & Wedding Gifts", href: "/shop?category=articles" },
  ];

  const megaStylesLinks = [
    { name: "Traditional Heritage", href: "/shop?style=Traditional" },
    { name: "Temple & Kemp", href: "/shop?style=Temple" },
    { name: "Botanical & Floral", href: "/shop?style=Floral" },
    { name: "Sacred & Divine", href: "/shop?style=Divine" },
    { name: "Minimal & Contemporary", href: "/shop?style=Minimal" },
  ];

  const megaBudgetLinks = [
    { name: "Under ₹3,000", href: "/shop?maxPrice=3000" },
    { name: "₹3,000 – ₹7,000", href: "/shop?maxPrice=7000" },
    { name: "₹7,000 – ₹15,000", href: "/shop?maxPrice=15000" },
    { name: "₹15,000 & Above", href: "/shop?maxPrice=50000" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <SilverRateBar />

      <div
        className={`w-full transition-all duration-300 ${
          scrolled
            ? "bg-[#fbf9f4]/95 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.06)] border-b border-[#e8e8e8]"
            : "bg-[#fbf9f4]/90 backdrop-blur-sm border-b border-[#e8e8e8]/50"
        }`}
      >
        <div className="max-w-7xl mx-auto pl-1 sm:pl-4 pr-2 sm:pr-6 lg:px-8 h-16 sm:h-24 flex items-center justify-between gap-1 sm:gap-4">
          <Link href="/" className="flex items-center gap-1 sm:gap-2.5 group shrink-0">
            <div className="shrink-0 flex items-center justify-center py-0.5 sm:py-1">
              <img
                src="/logo-emblem.png"
                alt="Sri Bagavathi Silvers Emblem Logo"
                className="h-8 sm:h-14 lg:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col shrink-0">
              <span className="font-serif-luxury text-xs sm:text-lg lg:text-xl tracking-[0.06em] sm:tracking-[0.15em] uppercase text-[#010101] font-semibold whitespace-nowrap">
                Sri Bagavathi
              </span>
              <span className="font-sans-editorial text-[7.5px] sm:text-[10px] lg:text-[11px] tracking-[0.08em] sm:tracking-[0.2em] text-[#725b38] uppercase font-bold flex items-center gap-0.5 sm:gap-1 whitespace-nowrap">
                Silvers <span className="text-[#c5a880]">•</span> Hallmark 925
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Header */}
          <nav className="hidden xl:flex items-center gap-4 xl:gap-6 relative whitespace-nowrap">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              if (link.hasMega) {
                return (
                  <div
                    key={link.name}
                    className="relative group py-8"
                    onMouseEnter={() => setShopMegaOpen(true)}
                    onMouseLeave={() => setShopMegaOpen(false)}
                  >
                    <Link
                      href={link.href}
                      className={`font-sans-editorial text-[12px] uppercase tracking-[0.18em] transition-colors flex items-center gap-1 py-1 whitespace-nowrap ${
                        shopMegaOpen || isActive ? "text-[#010101] font-bold" : "text-[#444748] hover:text-[#010101]"
                      }`}
                    >
                      {link.name}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${shopMegaOpen ? "rotate-180" : ""}`} />
                    </Link>

                    {/* Desktop Mega Menu Dropdown */}
                    <AnimatePresence>
                      {shopMegaOpen && (
                        <motion.div
                          ref={megaMenuRef}
                          variants={megaMenuReveal}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="fixed top-[112px] left-0 w-full bg-[#fbf9f4]/98 backdrop-blur-xl border-b border-t border-[#e8e8e8] shadow-2xl z-50 py-8 px-6 lg:px-12"
                        >
                          <div className="max-w-7xl mx-auto grid grid-cols-5 gap-8">
                            {/* Column 1: Silver Jewellery */}
                            <div className="flex flex-col space-y-3">
                              <h3 className="font-serif-luxury text-sm font-bold uppercase tracking-widest text-[#010101] pb-2 border-b border-[#e8e8e8]">
                                Silver Jewellery
                              </h3>
                              <ul className="space-y-2">
                                {megaJewelleryLinks.map((item) => (
                                  <li key={item.name}>
                                    <Link
                                      href={item.href}
                                      className="font-sans-editorial text-xs text-[#444748] hover:text-[#725b38] transition-colors hover:translate-x-1 inline-block transform duration-150"
                                    >
                                      {item.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Column 2: Silver Idols & Sacred */}
                            <div className="flex flex-col space-y-3">
                              <h3 className="font-serif-luxury text-sm font-bold uppercase tracking-widest text-[#010101] pb-2 border-b border-[#e8e8e8]">
                                Idols & Sacred
                              </h3>
                              <ul className="space-y-2">
                                {megaPoojaLinks.map((item) => (
                                  <li key={item.name}>
                                    <Link
                                      href={item.href}
                                      className="font-sans-editorial text-xs text-[#444748] hover:text-[#725b38] transition-colors hover:translate-x-1 inline-block transform duration-150"
                                    >
                                      {item.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Column 3: Coins & Gifts */}
                            <div className="flex flex-col space-y-3">
                              <h3 className="font-serif-luxury text-sm font-bold uppercase tracking-widest text-[#010101] pb-2 border-b border-[#e8e8e8]">
                                Bullion & Gifts
                              </h3>
                              <ul className="space-y-2">
                                {megaGiftsLinks.map((item) => (
                                  <li key={item.name}>
                                    <Link
                                      href={item.href}
                                      className="font-sans-editorial text-xs text-[#444748] hover:text-[#725b38] transition-colors hover:translate-x-1 inline-block transform duration-150"
                                    >
                                      {item.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Column 4: Shop By Style */}
                            <div className="flex flex-col space-y-3">
                              <h3 className="font-serif-luxury text-sm font-bold uppercase tracking-widest text-[#010101] pb-2 border-b border-[#e8e8e8]">
                                Shop by Style
                              </h3>
                              <ul className="space-y-2">
                                {megaStylesLinks.map((item) => (
                                  <li key={item.name}>
                                    <Link
                                      href={item.href}
                                      className="font-sans-editorial text-xs text-[#444748] hover:text-[#725b38] transition-colors hover:translate-x-1 inline-block transform duration-150"
                                    >
                                      {item.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Column 5: Shop by Budget + Editorial Banner */}
                            <div className="flex flex-col space-y-4 bg-[#f5f3ee] p-4 border border-[#e8e8e8]">
                              <h3 className="font-serif-luxury text-xs font-bold uppercase tracking-widest text-[#010101] pb-1 border-b border-[#e8e8e8]">
                                Shop by Budget
                              </h3>
                              <div className="flex flex-wrap gap-1.5">
                                {megaBudgetLinks.map((b) => (
                                  <Link
                                    key={b.name}
                                    href={b.href}
                                    className="px-2.5 py-1 bg-[#ffffff] border border-[#e8e8e8] text-[11px] font-sans-editorial text-[#444748] hover:border-[#725b38] hover:text-[#725b38] transition-colors"
                                  >
                                    {b.name}
                                  </Link>
                                ))}
                              </div>
                              <div className="pt-2 border-t border-[#e8e8e8] flex flex-col gap-1">
                                <span className="font-serif-luxury text-xs font-semibold text-[#010101]">Sanctum & Temple Series</span>
                                <p className="font-sans-editorial text-[11px] text-[#725b38]">Consecrated 999 fine silver idols & deepams.</p>
                                <Link
                                  href="/collections"
                                  className="inline-flex items-center gap-1 font-sans-editorial text-[10px] uppercase font-bold text-[#010101] hover:text-[#725b38] mt-1"
                                >
                                  View Collection <ArrowRight className="w-3 h-3" />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-sans-editorial text-[12px] uppercase tracking-[0.18em] transition-colors relative py-1 whitespace-nowrap ${
                    isActive ? "text-[#010101] font-bold" : "text-[#444748] hover:text-[#010101]"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-[#725b38]"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Utilities (Search, Account, Wishlist, Cart) */}
          <div className="flex items-center gap-0.5 sm:gap-3 shrink-0">
            <button
              suppressHydrationWarning
              onClick={onOpenSearch}
              aria-label="Search Boutique"
              className="p-1 sm:p-2 text-[#444748] hover:text-[#010101] transition-colors rounded-full hover:bg-[#f0eee9]"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Instagram Navbar Button */}
            <InstagramButton onClick={() => setInstagramOpen(true)} className="!p-1 sm:!p-2" />

            <Link
              href="/contact"
              aria-label="Account / Concierge"
              className="hidden md:flex p-2 text-[#444748] hover:text-[#010101] transition-colors rounded-full hover:bg-[#f0eee9]"
            >
              <User className="w-5 h-5" />
            </Link>

            <button
              suppressHydrationWarning
              onClick={onOpenWishlist}
              aria-label="Wishlist"
              className="relative p-1 sm:p-2 text-[#444748] hover:text-[#010101] transition-colors rounded-full hover:bg-[#f0eee9]"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#725b38] text-[#ffffff] font-sans-editorial text-[8px] sm:text-[10px] font-bold rounded-full h-3.5 w-3.5 sm:h-4.5 sm:w-4.5 flex items-center justify-center shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              suppressHydrationWarning
              onClick={onOpenCart}
              aria-label="Shopping Bag"
              className="relative p-1 sm:p-2 text-[#444748] hover:text-[#010101] transition-colors rounded-full hover:bg-[#f0eee9]"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#010101] text-[#ffffff] font-sans-editorial text-[8px] sm:text-[10px] font-bold rounded-full h-3.5 w-3.5 sm:h-4.5 sm:w-4.5 flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              suppressHydrationWarning
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
              className="xl:hidden p-1 sm:p-2 text-[#010101] hover:bg-[#f0eee9] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Accordion Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-[#fbf9f4] border-b border-[#e8e8e8] shadow-2xl overflow-y-auto max-h-[85vh]"
          >
            <div className="px-6 py-6 space-y-4 max-w-md mx-auto">
              <div className="flex items-center gap-2 pb-3 border-b border-[#e8e8e8] text-[#725b38] font-sans-editorial text-xs uppercase tracking-widest font-semibold">
                <Sparkles className="w-4 h-4 text-[#c5a880]" />
                Explore Sri Bhagavathi Silvers
              </div>
              <nav className="flex flex-col space-y-2">
                {/* Mobile Shop Accordion */}
                <div>
                  <button
                    onClick={() => setMobileShopOpen(!mobileShopOpen)}
                    className="w-full font-serif-luxury text-lg text-[#010101] py-2 flex items-center justify-between border-b border-[#f5f3ee]"
                  >
                    <span>SHOP</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${mobileShopOpen ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {mobileShopOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-4 py-2 space-y-3 bg-[#f5f3ee] border-b border-[#e8e8e8] my-1"
                      >
                        <div className="space-y-1">
                          <span className="font-sans-editorial text-[10px] uppercase font-bold text-[#725b38]">Jewellery</span>
                          {megaJewelleryLinks.slice(0, 4).map((j) => (
                            <Link key={j.name} href={j.href} onClick={() => setMobileMenuOpen(false)} className="block text-xs text-[#444748] py-0.5">
                              {j.name}
                            </Link>
                          ))}
                        </div>
                        <div className="space-y-1">
                          <span className="font-sans-editorial text-[10px] uppercase font-bold text-[#725b38]">Idols & Pooja</span>
                          {megaPoojaLinks.slice(0, 3).map((p) => (
                            <Link key={p.name} href={p.href} onClick={() => setMobileMenuOpen(false)} className="block text-xs text-[#444748] py-0.5">
                              {p.name}
                            </Link>
                          ))}
                        </div>
                        <div className="space-y-1">
                          <span className="font-sans-editorial text-[10px] uppercase font-bold text-[#725b38]">Coins & Bullion</span>
                          {megaGiftsLinks.map((g) => (
                            <Link key={g.name} href={g.href} onClick={() => setMobileMenuOpen(false)} className="block text-xs text-[#444748] py-0.5">
                              {g.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link
                  href="/collections"
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-serif-luxury text-lg text-[#010101] hover:text-[#725b38] transition-colors py-2 flex items-center justify-between border-b border-[#f5f3ee]"
                >
                  <span>COLLECTIONS</span>
                  <span className="text-[#c5a880] text-sm">→</span>
                </Link>
                <Link
                  href="/occasions"
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-serif-luxury text-lg text-[#010101] hover:text-[#725b38] transition-colors py-2 flex items-center justify-between border-b border-[#f5f3ee]"
                >
                  <span>OCCASIONS</span>
                  <span className="text-[#c5a880] text-sm">→</span>
                </Link>
                <Link
                  href="/customized"
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-serif-luxury text-lg text-[#010101] hover:text-[#725b38] transition-colors py-2 flex items-center justify-between border-b border-[#f5f3ee]"
                >
                  <span className="flex items-center gap-2">
                    CUSTOMIZED
                    <span className="text-[10px] font-sans-editorial uppercase tracking-wider bg-[#725b38] text-white px-1.5 py-0.5 font-normal">Atelier</span>
                  </span>
                  <span className="text-[#c5a880] text-sm">→</span>
                </Link>
                <Link
                  href="/shop?category=coins"
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-serif-luxury text-lg text-[#010101] hover:text-[#725b38] transition-colors py-2 flex items-center justify-between border-b border-[#f5f3ee]"
                >
                  <span>GIFTING</span>
                  <span className="text-[#c5a880] text-sm">→</span>
                </Link>
                <Link
                  href="/about-us"
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-serif-luxury text-lg text-[#010101] hover:text-[#725b38] transition-colors py-2 flex items-center justify-between border-b border-[#f5f3ee]"
                >
                  <span>OUR STORY</span>
                  <span className="text-[#c5a880] text-sm">→</span>
                </Link>
                <Link
                  href="/visit-our-store"
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-serif-luxury text-lg text-[#010101] hover:text-[#725b38] transition-colors py-2 flex items-center justify-between border-b border-[#f5f3ee]"
                >
                  <span>VISIT US</span>
                  <span className="text-[#c5a880] text-sm">→</span>
                </Link>
              </nav>

              <div className="pt-4 flex flex-col gap-3">
                <a
                  href="tel:+919876543210"
                  className="bg-[#010101] text-[#ffffff] py-3 px-4 text-center font-sans-editorial text-xs uppercase tracking-[0.16em] flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-4 h-4 text-[#c5a880]" />
                  Call Concierge: +91 98765 43210
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instagram Premium Modal */}
      <InstagramModal
        isOpen={instagramOpen}
        onClose={() => setInstagramOpen(false)}
      />
    </header>
  );
}
