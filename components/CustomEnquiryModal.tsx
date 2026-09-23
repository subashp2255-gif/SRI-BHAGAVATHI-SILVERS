"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Send, CheckCircle2, MessageSquare, PhoneCall } from "lucide-react";
import { CUSTOM_CATEGORIES } from "@/data/customized";

interface CustomEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedCategory?: string;
  preselectedPieceName?: string;
}

export function CustomEnquiryModal({
  isOpen,
  onClose,
  preselectedCategory = "Name Plates",
  preselectedPieceName,
}: CustomEnquiryModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    category: preselectedCategory,
    occasion: "Housewarming",
    description: preselectedPieceName ? `Enquiry regarding bespoke crafting for: ${preselectedPieceName}` : "",
    budget: "₹5,000 – ₹15,000",
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const occasionsList = [
    "Housewarming",
    "Wedding & Bridal",
    "Baby & Newborn",
    "Anniversary",
    "Pooja & Sacred",
    "Corporate & Business Gifting",
    "Other Special Event",
  ];

  const budgetRanges = [
    "Under ₹5,000",
    "₹5,000 – ₹15,000",
    "₹15,000 – ₹35,000",
    "₹35,000 – ₹75,000",
    "₹75,000+",
  ];

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Please enter your name";
    if (!formData.phone.trim()) {
      errs.phone = "Phone or WhatsApp number required";
    } else if (formData.phone.trim().length < 8) {
      errs.phone = "Enter a valid contact number";
    }
    if (!formData.description.trim()) errs.description = "Please briefly describe your custom idea";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false);
    setErrors({});
    onClose();
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hello Sri Bhagavathi Silvers Atelier,\n\nI would like to start a custom enquiry:\n- *Name:* ${formData.name || "Customer"}\n- *Customization:* ${formData.category}\n- *Occasion:* ${formData.occasion}\n- *Idea Details:* ${formData.description || "Inquiring about bespoke silver ornament"}\n- *Budget Range:* ${formData.budget}`
    );
    window.open(`https://wa.me/919876543210?text=${text}`, "_blank");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
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
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-[#fbf9f4] border border-[#e8e8e8] shadow-2xl overflow-hidden my-auto z-10"
          >
            {/* Top Metallic Accent Bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#725b38] via-[#c5a880] to-[#725b38]" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-[#444748] hover:text-[#010101] hover:bg-[#f5f3ee] transition-colors rounded-full"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 sm:p-8">
              {!submitted ? (
                <>
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-[#725b38]" />
                    <span className="font-sans-editorial text-[11px] uppercase tracking-[0.25em] text-[#725b38] font-bold">
                      Bespoke Silver Atelier
                    </span>
                  </div>

                  <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[#010101] tracking-wide mb-2">
                    Start a Custom Enquiry
                  </h2>
                  <p className="font-sans-editorial text-xs sm:text-sm text-[#444748] mb-6">
                    Turn your meaningful moment or sketch into a 925 Hallmark silver masterpiece. Our master silversmiths will review your design concept within 24 hours.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name & Contact */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-sans-editorial text-[11px] uppercase tracking-wider text-[#010101] font-bold mb-1.5">
                          Your Name <span className="text-[#6A3035]">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Ananya Raman"
                          className="w-full bg-[#ffffff] border border-[#e8e8e8] focus:border-[#725b38] px-3.5 py-2.5 font-sans-editorial text-xs text-[#010101] outline-none transition-colors"
                        />
                        {errors.name && <p className="text-[11px] text-[#6A3035] mt-1 font-sans-editorial">{errors.name}</p>}
                      </div>

                      <div>
                        <label className="block font-sans-editorial text-[11px] uppercase tracking-wider text-[#010101] font-bold mb-1.5">
                          Phone / WhatsApp <span className="text-[#6A3035]">*</span>
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full bg-[#ffffff] border border-[#e8e8e8] focus:border-[#725b38] px-3.5 py-2.5 font-sans-editorial text-xs text-[#010101] outline-none transition-colors"
                        />
                        {errors.phone && <p className="text-[11px] text-[#6A3035] mt-1 font-sans-editorial">{errors.phone}</p>}
                      </div>
                    </div>

                    {/* Category & Occasion */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-sans-editorial text-[11px] uppercase tracking-wider text-[#010101] font-bold mb-1.5">
                          Customization Category
                        </label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full bg-[#ffffff] border border-[#e8e8e8] focus:border-[#725b38] px-3.5 py-2.5 font-sans-editorial text-xs text-[#010101] outline-none transition-colors"
                        >
                          {CUSTOM_CATEGORIES.map((cat) => (
                            <option key={cat.id} value={cat.name}>
                              {cat.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block font-sans-editorial text-[11px] uppercase tracking-wider text-[#010101] font-bold mb-1.5">
                          Occasion
                        </label>
                        <select
                          value={formData.occasion}
                          onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                          className="w-full bg-[#ffffff] border border-[#e8e8e8] focus:border-[#725b38] px-3.5 py-2.5 font-sans-editorial text-xs text-[#010101] outline-none transition-colors"
                        >
                          {occasionsList.map((occ) => (
                            <option key={occ} value={occ}>
                              {occ}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Budget Selection */}
                    <div>
                      <label className="block font-sans-editorial text-[11px] uppercase tracking-wider text-[#010101] font-bold mb-1.5">
                        Preferred Budget Range (Optional)
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {budgetRanges.map((b) => (
                          <button
                            type="button"
                            key={b}
                            onClick={() => setFormData({ ...formData, budget: b })}
                            className={`px-3 py-1.5 text-xs font-sans-editorial border transition-all ${
                              formData.budget === b
                                ? "border-[#010101] bg-[#010101] text-white font-semibold"
                                : "border-[#e8e8e8] bg-[#ffffff] text-[#444748] hover:border-[#725b38]"
                            }`}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block font-sans-editorial text-[11px] uppercase tracking-wider text-[#010101] font-bold mb-1.5">
                        Tell Us About Your Custom Idea <span className="text-[#6A3035]">*</span>
                      </label>
                      <textarea
                        rows={3}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Describe your design vision, specific dimensions, inscriptions (names/dates), or reference details..."
                        className="w-full bg-[#ffffff] border border-[#e8e8e8] focus:border-[#725b38] p-3.5 font-sans-editorial text-xs text-[#010101] outline-none transition-colors resize-none"
                      />
                      {errors.description && (
                        <p className="text-[11px] text-[#6A3035] mt-1 font-sans-editorial">{errors.description}</p>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-2 flex flex-col sm:flex-row gap-3">
                      <button
                        type="submit"
                        className="flex-1 bg-[#010101] hover:bg-[#725b38] text-white py-3 px-6 font-sans-editorial text-xs uppercase tracking-[0.18em] font-bold flex items-center justify-center gap-2 transition-all shadow-md group"
                      >
                        <Send className="w-4 h-4 text-[#c5a880] group-hover:translate-x-0.5 transition-transform" />
                        Submit Custom Enquiry
                      </button>

                      <button
                        type="button"
                        onClick={handleWhatsAppDirect}
                        className="bg-[#25D366] hover:bg-[#20ba59] text-white py-3 px-5 font-sans-editorial text-xs uppercase tracking-[0.15em] font-bold flex items-center justify-center gap-2 transition-all shadow-md shrink-0"
                      >
                        <MessageSquare className="w-4 h-4 fill-white" />
                        Chat on WhatsApp
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="py-8 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#725b38]/10 border border-[#725b38] flex items-center justify-center mx-auto text-[#725b38]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif-luxury text-2xl text-[#010101]">Enquiry Received</h3>
                  <p className="font-sans-editorial text-xs text-[#444748] max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-[#010101]">{formData.name}</strong>. Our senior silver artisan will review your design concept for <span className="text-[#725b38] font-semibold">{formData.category}</span> and contact you at <strong className="text-[#010101]">{formData.phone}</strong> within 24 hours.
                  </p>

                  <div className="pt-4 flex justify-center gap-3">
                    <button
                      onClick={handleWhatsAppDirect}
                      className="bg-[#25D366] text-white py-2.5 px-5 text-xs font-sans-editorial uppercase tracking-wider font-bold flex items-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" /> Open WhatsApp Now
                    </button>
                    <button
                      onClick={resetForm}
                      className="border border-[#e8e8e8] hover:border-[#010101] py-2.5 px-5 text-xs font-sans-editorial uppercase tracking-wider text-[#010101]"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
