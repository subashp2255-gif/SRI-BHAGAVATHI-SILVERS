"use client";

import React, { useState, useEffect } from "react";
import { Instagram, ExternalLink, Heart, AlertCircle } from "lucide-react";
import { InstagramPostItem } from "@/data/instagram";

interface InstagramPostCardProps {
  post: InstagramPostItem;
}

export function InstagramPostCard({ post }: InstagramPostCardProps) {
  const [embedError, setEmbedError] = useState(false);
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    setEmbedError(false);
    setIsProcessing(true);

    const timer = setTimeout(() => {
      if ((window as any).instgrm) {
        try {
          (window as any).instgrm.Embeds.process();
        } catch {
          // ignore
        }
      }
      setIsProcessing(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [post.id]);

  return (
    <div className="w-full flex flex-col items-center justify-center relative min-h-[360px] sm:min-h-[440px] bg-[#121211] border border-white/10 rounded-lg p-3 sm:p-5 shadow-2xl overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#C4AD80]/10 rounded-full blur-3xl pointer-events-none" />

      {!embedError ? (
        <div className="w-full flex justify-center max-h-[480px] overflow-hidden">
          <blockquote
            className="instagram-media w-full"
            data-instgrm-permalink={post.url}
            data-instgrm-version="14"
            style={{
              background: "#171716",
              border: 0,
              borderRadius: "8px",
              margin: "1px",
              maxWidth: "540px",
              minWidth: "280px",
              padding: 0,
              width: "99%",
            }}
          >
            {/* Native Preview / Shimmer while embed script resolves */}
            <div className="p-4 text-center flex flex-col items-center">
              <div className="relative aspect-[4/3] w-full max-w-sm mb-3 bg-[#242321] overflow-hidden rounded-md border border-white/10">
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  onError={() => setEmbedError(true)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171716] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 left-3 right-3 text-left">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#C4AD80] block mb-0.5">
                    {post.type === "reel" ? "🎬 REEL" : "📸 POST"}
                  </span>
                  <span className="text-xs text-[#F7F4EE] font-serif-luxury font-bold block truncate">
                    {post.title}
                  </span>
                </div>
              </div>

              {isProcessing && (
                <div className="flex items-center gap-2 text-xs text-[#BFC3C6]">
                  <Instagram className="w-4 h-4 text-[#C4AD80] animate-spin" />
                  <span>Loading Instagram content...</span>
                </div>
              )}
            </div>
          </blockquote>
        </div>
      ) : (
        /* Graceful Fallback Card */
        <div className="flex flex-col items-center justify-center p-8 text-center max-w-sm">
          <div className="w-12 h-12 rounded-full bg-[#242321] border border-[#C4AD80]/30 flex items-center justify-center mb-4 text-[#C4AD80]">
            <AlertCircle className="w-6 h-6" />
          </div>

          <h4 className="font-serif-luxury text-base text-[#F7F4EE] font-bold mb-2">
            Instagram Post Unavailable for Embedded View
          </h4>

          <p className="font-sans-editorial text-xs text-[#BFC3C6] mb-5 leading-relaxed">
            {post.title} — {post.caption}
          </p>

          <a
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-[#C4AD80] hover:bg-[#F7F4EE] text-[#171716] font-sans-editorial text-xs uppercase font-bold tracking-wider rounded transition-all flex items-center gap-2"
          >
            <span>VIEW ON INSTAGRAM</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      )}
    </div>
  );
}
