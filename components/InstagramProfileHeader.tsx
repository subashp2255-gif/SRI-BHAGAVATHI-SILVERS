"use client";

import React from "react";
import Image from "next/image";
import { Instagram, ArrowUpRight, X } from "lucide-react";
import { InstagramProfile } from "@/data/instagram";

interface InstagramProfileHeaderProps {
  profile: InstagramProfile;
  onClose: () => void;
}

export function InstagramProfileHeader({ profile, onClose }: InstagramProfileHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/10 bg-white/[0.04] backdrop-blur-md relative z-20">
      {/* Left: Profile Info */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Logo Container */}
        <div className="shrink-0 flex items-center justify-center py-0.5">
          {profile.avatarUrl ? (
            <img
              src="/logo-dark.png"
              alt={profile.name}
              className="h-12 sm:h-14 w-auto object-contain filter drop-shadow-[0_2px_10px_rgba(196,173,128,0.35)]"
            />
          ) : (
            <Instagram className="w-7 h-7 text-[#C4AD80]" />
          )}
        </div>

        {/* Profile Details */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-serif-luxury text-base sm:text-lg font-bold text-[#F7F4EE] tracking-wide">
              @{profile.username}
            </span>
          </div>
          <span className="font-sans-editorial text-xs text-[#BFC3C6] font-medium tracking-wider">
            {profile.name}
          </span>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* View Instagram External Link */}
        <a
          href={profile.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View Sri Bhagavathi Silvers Instagram profile in new tab"
          className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 hover:bg-[#C4AD80] text-[#F7F4EE] hover:text-[#171716] border border-white/15 hover:border-[#C4AD80] rounded text-[11px] font-sans-editorial font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm group"
        >
          <span>VIEW INSTAGRAM</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[#C4AD80] group-hover:text-[#171716] transition-colors" />
        </a>

        {/* Close Modal Button */}
        <button
          type="button"
          suppressHydrationWarning
          onClick={onClose}
          aria-label="Close Instagram"
          className="p-2 text-[#BFC3C6] hover:text-[#F7F4EE] hover:bg-white/10 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
