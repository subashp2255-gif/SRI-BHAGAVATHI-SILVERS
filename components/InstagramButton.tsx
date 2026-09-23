"use client";

import React from "react";
import { Instagram } from "lucide-react";

interface InstagramButtonProps {
  onClick: () => void;
  className?: string;
}

export function InstagramButton({ onClick, className = "" }: InstagramButtonProps) {
  return (
    <button
      type="button"
      suppressHydrationWarning
      onClick={onClick}
      aria-label="Open Sri Bhagavathi Silvers Instagram"
      className={`p-1.5 sm:p-2 text-[#444748] hover:text-[#C4AD80] transition-all duration-200 rounded-full hover:bg-[#f0eee9] active:scale-95 group relative flex items-center justify-center ${className}`}
      title="View Sri Bhagavathi Silvers Instagram Profile"
    >
      <Instagram className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-[1.05] transition-transform duration-200 text-[#444748] group-hover:text-[#C4AD80]" />
    </button>
  );
}
