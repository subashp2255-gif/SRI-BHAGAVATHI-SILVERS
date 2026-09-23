"use client";

import React, { useRef } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Heart, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { InstagramPostItem } from "@/data/instagram";
import { InstagramPostCard } from "./InstagramPostCard";

interface InstagramPostViewerProps {
  posts: InstagramPostItem[];
  activeIndex: number;
  onSelectIndex: (index: number) => void;
}

export function InstagramPostViewer({
  posts,
  activeIndex,
  onSelectIndex,
}: InstagramPostViewerProps) {
  const touchStartX = useRef<number | null>(null);

  const activePost = posts[activeIndex] || posts[0];

  const handleNext = () => {
    onSelectIndex((activeIndex + 1) % posts.length);
  };

  const handlePrev = () => {
    onSelectIndex((activeIndex - 1 + posts.length) % posts.length);
  };

  // Mobile Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 40) {
      handleNext();
    } else if (diff < -40) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  return (
    <div
      className="flex-grow flex flex-col p-4 sm:p-6 overflow-y-auto font-sans-editorial"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start flex-grow">
        {/* Main Active Embed Area (7 Cols Desktop) */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePost.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex flex-col items-center"
            >
              <InstagramPostCard post={activePost} />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            type="button"
            suppressHydrationWarning
            onClick={handlePrev}
            aria-label="Previous Instagram Post"
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2.5 bg-[#171716]/85 hover:bg-[#C4AD80] text-[#F7F4EE] hover:text-[#171716] rounded-full border border-white/20 shadow-xl transition-all z-30"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            suppressHydrationWarning
            onClick={handleNext}
            aria-label="Next Instagram Post"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-[#171716]/85 hover:bg-[#C4AD80] text-[#F7F4EE] hover:text-[#171716] rounded-full border border-white/20 shadow-xl transition-all z-30"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Right Info & Caption Panel (5 Cols Desktop) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-5 bg-[#121211] p-5 sm:p-6 border border-white/10 rounded-lg min-h-[360px] sm:min-h-[440px]">
          <div>
            <div className="flex items-center justify-between text-xs text-[#C4AD80] font-bold mb-3 border-b border-white/10 pb-2.5">
              <span className="uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C4AD80]" />
                {activePost.type === "reel" ? "🎬 REEL" : "📸 FEATURED POST"}
              </span>
              <span className="text-[#BFC3C6] font-normal">{activePost.date}</span>
            </div>

            <h3 className="font-serif-luxury text-lg sm:text-xl text-[#F7F4EE] font-bold mb-3 tracking-wide">
              {activePost.title}
            </h3>

            <p className="font-sans-editorial text-xs sm:text-sm text-[#BFC3C6] leading-relaxed mb-6">
              {activePost.caption}
            </p>

            {activePost.likes && (
              <div className="inline-flex items-center gap-2 bg-[#242321] px-3 py-1.5 rounded border border-white/10 text-xs text-[#F7F4EE]">
                <Heart className="w-3.5 h-3.5 text-[#C4AD80] fill-current" />
                <span className="font-bold text-[#C4AD80]">{activePost.likes}</span>
                <span className="text-[#BFC3C6]">likes</span>
              </div>
            )}
          </div>

          {/* View Post Direct Button */}
          <div className="pt-4 border-t border-white/10">
            <a
              href={activePost.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View this post directly on Instagram"
              className="w-full py-3 px-4 bg-[#242321] hover:bg-[#C4AD80] text-[#C4AD80] hover:text-[#171716] font-bold text-xs uppercase tracking-widest border border-[#C4AD80]/40 rounded transition-all flex items-center justify-center gap-2 group"
            >
              <span>VIEW THIS POST ON INSTAGRAM</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Gallery Thumbnail Selector */}
      <div className="mt-6 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] uppercase tracking-widest text-[#C4AD80] font-bold">
            FEATURED CONTENT ({posts.length} POSTS)
          </span>
          <span className="text-[10px] text-[#BFC3C6] font-medium">
            {activeIndex + 1} of {posts.length}
          </span>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {posts.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              suppressHydrationWarning
              onClick={() => onSelectIndex(idx)}
              aria-label={`Select post: ${item.title}`}
              className={`relative w-20 h-20 shrink-0 rounded border-2 overflow-hidden transition-all ${
                activeIndex === idx
                  ? "border-[#C4AD80] scale-105 shadow-lg"
                  : "border-white/10 opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <span className="absolute bottom-1 left-1 text-[8px] uppercase font-bold text-white tracking-wider">
                {item.type === "reel" ? "REEL" : "POST"}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
