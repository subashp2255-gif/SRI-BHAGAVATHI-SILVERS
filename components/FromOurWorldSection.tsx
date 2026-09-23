"use client";

import React from "react";
import { Instagram } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";

export function FromOurWorldSection() {
  const posts = [
    {
      id: "ig-1",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCW7_d9BeF9-rkPp7KgexqRyKdBpMQCDz3AWVUEkvMyjrGpcGTq29MtqyB1K1yUmFgZUphYCEqqa-LO_WQ-Jz1gMWCbcT1dCVGWHigjiseuyPScOr8dRn1_UVnP-0Qk1hehK7Z8Wid4sTnzCCA8mpZtS1t3wNWr5KLuqVZChLB4GzN5HPDszV4-1POIwGptQHw2xyO5EVcKy2XcSZfu97kwjHRZc_D1o93WzDNbzDcfWR73CNVK5G4U",
      caption: "Floral filigree antique silver ring captured during high-polish inspection.",
      handle: "@sribhagavathisilvers",
    },
    {
      id: "ig-2",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAWFKfS6Go96TEmCGI2yWSkTCAd5-HnZ5yc3hg2h1l7wHe4S0lpYjs5tWKWfYxZsBEU-zjOch4dXSDpEzee5gQAODDsx6YRXTHyJMZCfUjJhpgk1hUO0oGnytSfBJaKGF0p1Km069X8qJ8vvaPX1qjq3K0FULjDfjCsj0p0LUJHG2iHkdEiS9_cq0bKG_vNXHy7nxd6YqG521L3yjihJ8_SqyNKZ5T6lRbLj34MO2oGzXbNuITZ-yAg",
      caption: "Bridal silver kolusu payal anklet with delicate tinkling bells.",
      handle: "@sribhagavathisilvers",
    },
    {
      id: "ig-3",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBebFltOEMAcE6R6mZ6Z1TBZfH4-TijfaIpJ__GrkTG0O29yBaY3abO2Jol3K4nvXyBF1AS-Hez068b7KSVSZYh1KHRXCPQwTUJMAFDani3kGocj-Rz6LWGSXwaVjigaazw-JBmCfAzeQF_u8vBFv0zzFLYnAWTCAT0DeXBM6RE6t2ztp-hodot759T_d38hxC__x7oD3TNdK6TKvh9n4bcwrvRqfAF3wIXdUrrMHuDswNK1MH68jTz",
      caption: "Pure silver Kamakshi deepam illuminated during Varalakshmi Puja.",
      handle: "@sribhagavathisilvers",
    },
    {
      id: "ig-4",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDL4ZHJballUMddbhgvJ07QygDrNZxq2vQ-msqoHsNhByUh7jbOpM6vrXsxNPn-bv3etyswE4p5D8FlXWIbkXViizn276ukWrMdMVxvTG3kc6ZN2GM4abAixgMDSG4cW7A3B1EQm5ZX--xTLPQLPh4PDvu8Lomk5lAERZylDSVs0cLlKYCg_jSlE2K0JyQFBXi1mCnz-IqFnOJTC9no3pXWc_zdYfU4wz3yk8Q2SbiVh8D5bPZIhxD7",
      caption: "Royal 925 silver thali dinner set placed on cream silk setting.",
      handle: "@sribhagavathisilvers",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#fbf9f4] border-b border-[#e8e8e8] relative overflow-hidden">
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
              <Instagram className="w-4 h-4 text-[#c5a880]" />
              Social Gallery
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl text-[#010101] tracking-tight">
              FROM OUR WORLD
            </h2>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-sans-editorial text-xs uppercase tracking-[0.2em] font-bold text-[#010101] hover:text-[#725b38] transition-colors"
          >
            <span>Follow @SriBhagavathiSilvers</span>
            <Instagram className="w-4 h-4 text-[#c5a880]" />
          </a>
        </motion.div>

        {/* Asymmetric Social Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6"
        >
          {posts.map((post) => (
            <motion.div
              key={post.id}
              variants={fadeUp}
              className="group relative h-64 sm:h-80 overflow-hidden border border-[#e8e8e8] bg-[#010101] metallic-sheen"
            >
              <img
                src={post.image}
                alt="Sri Bhagavathi Silvers Social"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#010101]/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end text-[#ffffff]">
                <div className="w-8 h-8 rounded-full bg-[#ffffff]/20 backdrop-blur-md border border-[#ffffff]/30 flex items-center justify-center text-[#c5a880] mb-2">
                  <Instagram className="w-4 h-4" />
                </div>
                <p className="font-sans-editorial text-xs text-[#e4e2dd] line-clamp-2 mb-1">
                  {post.caption}
                </p>
                <span className="font-sans-editorial text-[10px] text-[#c5a880] uppercase tracking-wider font-bold">
                  {post.handle}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
