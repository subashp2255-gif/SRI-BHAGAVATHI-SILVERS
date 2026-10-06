"use client";

import React, { useState } from "react";
import { MessageCircle, Mail, Send, Check } from "lucide-react";

export function WhatsAppConcierge() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setEmail("");
    }
  };

  const handleWhatsAppClick = () => {
    const text = encodeURIComponent(
      "Hello Sri Bhagavathi Silvers, I would like to consult with a silver specialist regarding custom articles and current silver rates."
    );
    window.open(`https://wa.me/919876543210?text=${text}`, "_blank");
  };

  return (
    <>
      <section className="w-full bg-[#fbf9f4] py-12 sm:py-20 lg:py-24 border-b border-[#e8e8e8]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#ffffff] p-5 sm:p-8 lg:p-12 border border-[#e8e8e8] shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              {/* WhatsApp Concierge Focus */}
              <div className="lg:col-span-6 lg:pr-8 lg:border-r lg:border-[#e8e8e8]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#725b38]" />
                  <span className="font-sans-editorial text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#725b38] font-bold">
                    Instant Guidance
                  </span>
                </div>
                <h3 className="font-serif-luxury text-xl sm:text-3xl text-[#010101] mb-2 sm:mb-3 font-medium">
                  Connect with a Silver Specialist
                </h3>
                <p className="font-sans-editorial text-xs sm:text-sm text-[#444748] mb-5 sm:mb-6 leading-relaxed">
                  Have specific weight queries, want custom engraving, or need video calls of articles before purchase? Our concierge is on hand.
                </p>
                <button
                  suppressHydrationWarning
                  onClick={handleWhatsAppClick}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#f5f3ee] hover:bg-[#eae8e3] text-[#010101] px-6 py-3.5 sm:py-4 border border-[#e8e8e8] shadow-sm font-sans-editorial text-xs uppercase tracking-wider font-semibold transition-colors min-h-[46px]"
                >
                  <MessageCircle className="w-4 h-4 text-[#725b38]" />
                  <span>Chat with Us on WhatsApp</span>
                </button>
              </div>

              {/* Silver Rates & Newsletter Privileges */}
              <div className="lg:col-span-6 lg:pl-8">
                <span className="font-sans-editorial text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#725b38] block mb-2 font-bold">
                  Private Ledger
                </span>
                <h3 className="font-serif-luxury text-xl sm:text-3xl text-[#010101] mb-2 sm:mb-3 font-medium">
                  Daily Rates & Auspicious Releases
                </h3>
                <p className="font-sans-editorial text-xs sm:text-sm text-[#444748] mb-5 sm:mb-6 leading-relaxed">
                  Subscribe to receive weekly certified 925 bullion rates, Akshaya Tritiya catalogs, and private collector previews.
                </p>

                <form suppressHydrationWarning onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
                  <div className="relative flex-grow">
                    <Mail className="w-4 h-4 text-[#747878] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      suppressHydrationWarning
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full bg-[#f5f3ee] pl-10 pr-4 py-3 sm:py-3.5 text-xs sm:text-sm text-[#010101] font-sans-editorial border border-[#e8e8e8] focus:outline-none focus:border-[#010101] transition-colors min-h-[44px]"
                    />
                  </div>
                  <button
                    suppressHydrationWarning
                    type="submit"
                    className="w-full sm:w-auto bg-[#010101] text-[#ffffff] font-sans-editorial text-xs uppercase px-6 py-3 sm:py-3.5 tracking-[0.16em] hover:bg-[#333333] transition-colors whitespace-nowrap font-semibold shadow flex items-center justify-center gap-2 min-h-[44px]"
                  >
                    {subscribed ? (
                      <>
                        <Check className="w-4 h-4 text-[#c5a880]" /> Subscribed
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5 text-[#c5a880]" /> Join Privilege
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Bottom-Right WhatsApp Contact Widget */}
      <aside className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 pb-[env(safe-area-inset-bottom,0px)]">
        <a
          href="https://wa.me/919876543210?text=Hello%20Sri%20Bhagavathi%20Silvers%2C%20I%20would%20like%20to%20know%20more%20about%20your%20silver%20jewellery."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Sri Bhagavathi Silvers on WhatsApp"
          className="bg-[#ffffff] shadow-[0_12px_32px_-4px_rgba(28,28,28,0.2)] hover:shadow-[0_16px_36px_-4px_rgba(28,28,28,0.26)] hover:-translate-y-0.5 hover:bg-[#faf9f6] transition-all duration-300 p-2.5 sm:px-4 sm:py-3 border border-[#e8e8e8] rounded-full sm:rounded-xl flex items-center gap-2.5 sm:gap-3 group cursor-pointer"
        >
          {/* WhatsApp Circular Icon Container */}
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#25D366]/15 flex items-center justify-center text-[#25D366] shrink-0 group-hover:scale-105 transition-transform duration-300">
            <svg
              className="w-5 h-5 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.8 7.37 7.5 3.67 12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15ZM16.56 14.41C16.31 14.29 15.1 13.69 14.88 13.61C14.65 13.53 14.49 13.49 14.32 13.73C14.16 13.98 13.69 14.53 13.54 14.7C13.4 14.87 13.25 14.89 13 14.77C12.75 14.65 11.96 14.39 11.02 13.55C10.29 12.9 9.79 12.09 9.65 11.84C9.5 11.59 9.63 11.46 9.76 11.34C9.87 11.22 10.01 11.04 10.14 10.89C10.26 10.74 10.3 10.64 10.38 10.47C10.47 10.31 10.42 10.16 10.36 10.04C10.3 9.92 9.83 8.76 9.63 8.29C9.44 7.83 9.24 7.89 9.09 7.88C8.95 7.88 8.79 7.88 8.62 7.88C8.46 7.88 8.19 7.94 7.96 8.19C7.74 8.44 7.11 9.03 7.11 10.23C7.11 11.44 7.99 12.6 8.11 12.76C8.24 12.93 9.72 15.21 11.98 16.19C12.52 16.42 12.94 16.56 13.27 16.66C13.81 16.84 14.3 16.81 14.69 16.75C15.13 16.69 16.03 16.21 16.22 15.68C16.41 15.15 16.41 14.7 16.35 14.6C16.29 14.51 16.14 14.46 15.89 14.34L16.56 14.41Z" />
            </svg>
          </div>

          {/* Desktop Typography */}
          <div className="hidden sm:flex flex-col text-left">
            <span className="font-sans-editorial text-[9px] uppercase tracking-[0.22em] text-[#c5a880] font-bold">
              WHATSAPP
            </span>
            <span className="font-sans-editorial text-xs font-semibold text-[#010101] tracking-tight">
              Chat with Sri Bhagavathi Silvers
            </span>
          </div>

          {/* Mobile Label */}
          <span className="sm:hidden font-sans-editorial text-xs font-semibold text-[#010101] pr-1.5">
            WhatsApp
          </span>
        </a>
      </aside>
    </>
  );
}
