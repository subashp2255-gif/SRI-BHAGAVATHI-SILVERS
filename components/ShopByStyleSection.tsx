"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";

export function ShopByStyleSection() {
  const styles = [
    {
      id: "traditional",
      name: "TRADITIONAL",
      tagline: "Heritage Craftsmanship",
      description: "Timeless South Indian forms forged with hereditary filigree, payal chimes, and thali links.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAWFKfS6Go96TEmCGI2yWSkTCAd5-HnZ5yc3hg2h1l7wHe4S0lpYjs5tWKWfYxZsBEU-zjOch4dXSDpEzee5gQAODDsx6YRXTHyJMZCfUjJhpgk1hUO0oGnytSfBJaKGF0p1Km069X8qJ8vvaPX1qjq3K0FULjDfjCsj0p0LUJHG2iHkdEiS9_cq0bKG_vNXHy7nxd6YqG521L3yjihJ8_SqyNKZ5T6lRbLj34MO2oGzXbNuITZ-yAg",
      href: "/shop?style=Traditional",
    },
    {
      id: "temple",
      name: "TEMPLE",
      tagline: "Sacred Kemp & Antiquity",
      description: "Sanctum motifs, ruby cabochon kemp studs, and oxidized silver patina.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgJ68rs5lWru0g6Ae2-YX9vCd6ySFpZYP0PRWUA4CobH6d0hPpUlCDf6URLGUluaGXTN1-AmOlxEHuuY4vbsFt0T6F7APW21vm_Fc3pWUJjGU0-FLbNqD_Xmng_rhlx-S4_E2dyqgCK7EtZDAaYxchQw43mYOjgQsmUZG6I5kuYVmqpRp4-Hl_hAUU_xnks5_ffIHHLZuiXBuMctHPuvP-QQZWWbByQ8r5BcDqulYS3StODtz2HhlP",
      href: "/shop?style=Temple",
    },
    {
      id: "floral",
      name: "FLORAL",
      tagline: "Botanical Silver Geometry",
      description: "Natural lotus petals, jasmine bud drops, and floral filigree in sterling 925.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCW7_d9BeF9-rkPp7KgexqRyKdBpMQCDz3AWVUEkvMyjrGpcGTq29MtqyB1K1yUmFgZUphYCEqqa-LO_WQ-Jz1gMWCbcT1dCVGWHigjiseuyPScOr8dRn1_UVnP-0Qk1hehK7Z8Wid4sTnzCCA8mpZtS1t3wNWr5KLuqVZChLB4GzN5HPDszV4-1POIwGptQHw2xyO5EVcKy2XcSZfu97kwjHRZc_D1o93WzDNbzDcfWR73CNVK5G4U",
      href: "/shop?style=Floral",
    },
    {
      id: "divine",
      name: "DIVINE",
      tagline: "Consecrated Symbolism",
      description: "Auspicious icons of Goddess Lakshmi, Ganesha, and sanctum deepams.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBebFltOEMAcE6R6mZ6Z1TBZfH4-TijfaIpJ__GrkTG0O29yBaY3abO2Jol3K4nvXyBF1AS-Hez068b7KSVSZYh1KHRXCPQwTUJMAFDani3kGocj-Rz6LWGSXwaVjigaazw-JBmCfAzeQF_u8vBFv0zzFLYnAWTCAT0DeXBM6RE6t2ztp-hodot759T_d38hxC__x7oD3TNdK6TKvh9n4bcwrvRqfAF3wIXdUrrMHuDswNK1MH68jTz",
      href: "/shop?style=Divine",
    },
    {
      id: "minimal",
      name: "MINIMAL",
      tagline: "Clean Modern Silhouettes",
      description: "Sleek high-polish silver chains, delicate daily studs, and unadorned silver bullion.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAUnAWXenGMkuIi1rhgJFkonE9TInAa4M3HLsd3XoJPWhZEMpsKnziGQaKOPilpaC_F1TsL5cNPKL_l8VdJjC61d06D3Vjh9FS3arJKEAltdvVsRL1Vk9h0cxAb8cMVlrE3OKQMdPe-5VJ7xisMe7YLc_NUtibZnhaxvQuPc70DmX3rnSPiPWHU485XuGGOceOKUCMDmYpob590P2mmespkHSDuFbBOP3RIWWkdTnhDCZmrUBDVPvnr",
      href: "/shop?style=Minimal",
    },
    {
      id: "contemporary",
      name: "CONTEMPORARY",
      tagline: "Urban Luxury Expressions",
      description: "Embossed architectural kadas and statement geometric sterling creations.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAv-tVt6EWKA0OHCaG8yW-bEMau95yLtPSGyZMCSs5YLlZ_MDSOj1Q725mAPfl0oWaOtibFJjCYCBhiaG1hrcEbqpP0rq1aXOp0w_EbnCaSNeZ6bRPoTXGk2jSfdfMj5GLCxcCyEHAHwPRh0x-rk-Ql8zaKtTfSL7GCQXzCkfG1kNI3u1nQtIzN_jX1wxr2v8fP6SOR2TswKtV6cU2mO3tzPSUKbEZJe1gtq4B9mawgHZ-3wA18wQv0",
      href: "/shop?style=Contemporary",
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#f5f3ee] border-b border-[#e8e8e8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#e8e8e8] pb-6 gap-4"
        >
          <div>
            <div className="flex items-center gap-2 text-[#725b38] font-sans-editorial text-xs uppercase tracking-[0.25em] font-semibold mb-2">
              <Compass className="w-4 h-4 text-[#c5a880]" />
              Aesthetic Direction
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl text-[#010101] tracking-tight">
              SHOP BY STYLE
            </h2>
          </div>
          <p className="font-sans-editorial text-xs sm:text-sm text-[#444748] max-w-md">
            Discover silver pieces tailored to your personal aesthetic vision—from ancient temple motifs to sleek modern silhouettes.
          </p>
        </motion.div>

        {/* Style Editorial Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {styles.map((style) => (
            <motion.div
              key={style.id}
              variants={fadeUp}
              className="group bg-[#fbf9f4] border border-[#e8e8e8] hover:border-[#725b38] transition-all duration-300 p-6 flex flex-col justify-between"
            >
              <div>
                <div className="w-full h-48 overflow-hidden mb-6 relative metallic-sheen">
                  <img
                    src={style.image}
                    alt={style.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <span className="font-sans-editorial text-[10px] uppercase tracking-[0.2em] text-[#725b38] font-bold block mb-1">
                  {style.tagline}
                </span>
                <h3 className="font-serif-luxury text-2xl text-[#010101] tracking-tight mb-3">
                  {style.name}
                </h3>
                <p className="font-sans-editorial text-xs text-[#444748] leading-relaxed mb-6">
                  {style.description}
                </p>
              </div>

              <Link
                href={style.href}
                className="inline-flex items-center gap-2 font-sans-editorial text-xs uppercase tracking-[0.2em] font-bold text-[#010101] group-hover:text-[#725b38] transition-colors pt-4 border-t border-[#e8e8e8]"
              >
                <span>Explore {style.name}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
