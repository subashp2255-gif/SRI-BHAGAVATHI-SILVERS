"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, ArrowRight, ShieldCheck } from "lucide-react";
import { PRODUCTS } from "@/data/products";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  if (!isOpen) return null;

  // Sample cart item
  const cartItems = [PRODUCTS[0]];
  const total = cartItems.reduce((acc, p) => acc + p.price, 0);

  const handleCheckout = () => {
    const itemNames = cartItems.map((i) => `${i.name} (${i.formattedPrice})`).join(", ");
    const text = encodeURIComponent(
      `Hello Sri Bhagavathi Silvers, I would like to proceed with purchasing: ${itemNames}. Total: ₹${total.toLocaleString('en-IN')}. Please share payment and delivery instructions.`
    );
    window.open(`https://wa.me/919876543210?text=${text}`, "_blank");
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#010101]/60 backdrop-blur-sm"
        />

        {/* Sliding Tray */}
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="relative w-full max-w-md bg-[#ffffff] h-full shadow-2xl z-10 flex flex-col justify-between border-l border-[#e8e8e8]"
        >
          {/* Header */}
          <div className="p-6 border-b border-[#e8e8e8] flex items-center justify-between bg-[#fbf9f4]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#725b38]" />
              <h3 className="font-serif-luxury text-xl text-[#010101] font-semibold">
                Your Shopping Bag ({cartItems.length})
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#444748] hover:text-[#010101] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Content */}
          <div className="p-6 flex-grow overflow-y-auto space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-3 bg-[#f5f3ee] border border-[#e8e8e8]"
              >
                <div className="w-16 h-20 relative bg-[#eae8e3] shrink-0 border border-[#e8e8e8]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <span className="font-sans-editorial text-[10px] uppercase text-[#725b38] font-bold">
                    Net Wt: {item.netWeight}
                  </span>
                  <h4 className="font-serif-luxury text-sm text-[#010101] font-medium leading-tight mb-1">
                    {item.name}
                  </h4>
                  <p className="font-serif-luxury text-sm text-[#010101] font-semibold">
                    {item.formattedPrice}
                  </p>
                </div>
              </div>
            ))}

            <div className="bg-[#f5f3ee] p-4 border border-[#e8e8e8] space-y-2 text-xs font-sans-editorial text-[#444748]">
              <div className="flex items-center gap-1.5 text-[#725b38] font-semibold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" /> Hallmark & Transit Assurance
              </div>
              <p>• Certified 925 Hallmark Stamped by Government Assaying Center</p>
              <p>• Tamper-Evident Insured Doorstep Packaging Included</p>
            </div>
          </div>

          {/* Footer Checkout */}
          <div className="p-6 border-t border-[#e8e8e8] bg-[#fbf9f4] space-y-4">
            <div className="flex items-center justify-between font-serif-luxury text-lg text-[#010101]">
              <span>Subtotal:</span>
              <span className="font-semibold">₹{total.toLocaleString('en-IN')}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-[#010101] text-[#ffffff] font-sans-editorial text-xs uppercase tracking-[0.18em] py-4 shadow hover:bg-[#333333] transition-colors font-semibold flex items-center justify-center gap-2"
            >
              <span>COMPLETE BOUTIQUE ORDER</span>
              <ArrowRight className="w-4 h-4 text-[#c5a880]" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
