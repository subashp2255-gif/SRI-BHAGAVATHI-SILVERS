"use client";

import React from "react";
import { X, BookOpen, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { modalReveal } from "@/lib/animations";

export interface GuideArticle {
  id: string;
  title: string;
  category: string;
  readTime: string;
  excerpt: string;
  image: string;
  content: string[];
}

interface ArticleModalProps {
  article: GuideArticle | null;
  onClose: () => void;
}

export function ArticleModal({ article, onClose }: ArticleModalProps) {
  if (!article) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#010101]/70 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          variants={modalReveal}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative w-full max-w-3xl bg-[#fbf9f4] border border-[#e8e8e8] shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#e8e8e8] bg-[#f5f3ee] shrink-0">
            <div className="flex items-center gap-2 text-[#725b38] font-sans-editorial text-xs uppercase tracking-widest font-bold">
              <BookOpen className="w-4 h-4 text-[#c5a880]" />
              Silver Knowledge Hub
            </div>
            <button
              onClick={onClose}
              className="p-1 text-[#444748] hover:text-[#010101] hover:bg-[#eae8e3] transition-colors rounded-full"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Body */}
          <div className="overflow-y-auto p-6 sm:p-8 space-y-6 flex-grow">
            <div className="relative w-full h-64 sm:h-72 overflow-hidden border border-[#e8e8e8] bg-[#010101]">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute top-4 left-4 bg-[#010101]/80 backdrop-blur-md px-3 py-1 text-[#c5a880] font-sans-editorial text-[10px] uppercase font-bold tracking-widest border border-[#c5a880]">
                {article.category} • {article.readTime}
              </div>
            </div>

            <div>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[#010101] font-bold mb-3">
                {article.title}
              </h2>
              <p className="font-sans-editorial text-sm text-[#725b38] font-semibold italic border-l-2 border-[#c5a880] pl-4 py-1 mb-6">
                {article.excerpt}
              </p>
            </div>

            <div className="space-y-4 font-sans-editorial text-sm text-[#444748] leading-relaxed">
              {article.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="pt-6 border-t border-[#e8e8e8] flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#725b38] font-sans-editorial text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 text-[#c5a880]" />
                Certified BIS 925 / 999 Fine Silver Advice
              </div>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#010101] text-[#ffffff] font-sans-editorial text-xs uppercase tracking-widest font-bold hover:bg-[#725b38] transition-colors"
              >
                Close Article
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
