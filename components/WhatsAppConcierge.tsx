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
      <section className="w-full bg-[#fbf9f4] py-16 sm:py-24 border-b border-[#e8e8e8]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#ffffff] p-8 sm:p-12 border border-[#e8e8e8] shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* WhatsApp Concierge Focus */}
              <div className="lg:col-span-6 lg:pr-8 lg:border-r lg:border-[#e8e8e8]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#725b38]" />
                  <span className="font-sans-editorial text-[11px] uppercase tracking-[0.2em] text-[#725b38] font-bold">
                    Instant Guidance
                  </span>
                </div>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#010101] mb-3 font-medium">
                  Connect with a Silver Specialist
                </h3>
                <p className="font-sans-editorial text-sm text-[#444748] mb-6 leading-relaxed">
                  Have specific weight queries, want custom engraving, or need video calls of articles before purchase? Our concierge is on hand.
                </p>
                <button
                  suppressHydrationWarning
                  onClick={handleWhatsAppClick}
                  className="inline-flex items-center gap-2.5 bg-[#f5f3ee] hover:bg-[#eae8e3] text-[#010101] px-6 py-4 border border-[#e8e8e8] shadow-sm font-sans-editorial text-xs uppercase tracking-wider font-semibold transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#725b38]" />
                  <span>Chat with Us on WhatsApp</span>
                </button>
              </div>

              {/* Silver Rates & Newsletter Privileges */}
              <div className="lg:col-span-6 lg:pl-8">
                <span className="font-sans-editorial text-[11px] uppercase tracking-[0.2em] text-[#725b38] block mb-2 font-bold">
                  Private Ledger
                </span>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#010101] mb-3 font-medium">
                  Daily Rates & Auspicious Releases
                </h3>
                <p className="font-sans-editorial text-sm text-[#444748] mb-6 leading-relaxed">
                  Subscribe to receive weekly certified 925 bullion rates, Akshaya Tritiya catalogs, and private collector previews.
                </p>

                <form suppressHydrationWarning onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-grow">
                    <Mail className="w-4 h-4 text-[#747878] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      suppressHydrationWarning
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full bg-[#f5f3ee] pl-10 pr-4 py-3.5 text-sm text-[#010101] font-sans-editorial border border-[#e8e8e8] focus:outline-none focus:border-[#010101] transition-colors"
                    />
                  </div>
                  <button
                    suppressHydrationWarning
                    type="submit"
                    className="bg-[#010101] text-[#ffffff] font-sans-editorial text-xs uppercase px-6 py-3.5 tracking-[0.16em] hover:bg-[#333333] transition-colors whitespace-nowrap font-semibold shadow flex items-center justify-center gap-2"
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

      {/* Floating Bottom-Right Concierge Pill */}
      <aside className="fixed bottom-6 right-6 z-40">
        <button
          suppressHydrationWarning
          onClick={handleWhatsAppClick}
          className="bg-[#ffffff] shadow-[0_12px_32px_-4px_rgba(28,28,28,0.18)] hover:bg-[#f5f3ee] transition-all duration-300 px-4 py-3 border border-[#e8e8e8] flex items-center gap-3 group"
        >
          <div className="w-9 h-9 rounded-full bg-[#010101] flex items-center justify-center text-[#c5a880] shrink-0 group-hover:scale-105 transition-transform">
            <MessageCircle className="w-4 h-4" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-sans-editorial text-[9px] uppercase tracking-widest text-[#725b38] font-bold">
              Concierge
            </span>
            <span className="font-sans-editorial text-xs font-semibold text-[#010101]">
              Chat with Silver Specialist
            </span>
          </div>
        </button>
      </aside>
    </>
  );
}
