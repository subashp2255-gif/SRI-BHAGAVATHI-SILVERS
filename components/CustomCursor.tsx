"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Enable only on desktop / non-touch devices
    const isPointerFine = window.matchMedia("(pointer: fine)").matches;
    if (!isPointerFine || window.innerWidth < 1024) {
      return;
    }

    setEnabled(true);
    document.body.classList.add("custom-cursor-active");

    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest("[data-cursor]") as HTMLElement | null;
      if (cursorTarget) {
        const text = cursorTarget.getAttribute("data-cursor") || "EXPLORE →";
        setCursorText(text);
        setIsHovered(true);
      } else if (target.closest("a, button, [role='button']")) {
        setCursorText("");
        setIsHovered(true);
      } else {
        setCursorText("");
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", moveMouse);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", moveMouse);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (!enabled) return null;

  return (
    <motion.div
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      className={`fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center transition-opacity duration-300 ${
        isHovered ? "opacity-100" : "opacity-75"
      }`}
    >
      {cursorText ? (
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.6, opacity: 0 }}
          className="bg-[#010101]/90 text-[#c5a880] border border-[#c5a880]/40 px-3.5 py-1.5 font-sans-editorial text-[10px] uppercase tracking-[0.2em] font-bold shadow-xl backdrop-blur-md whitespace-nowrap rounded-none"
        >
          {cursorText}
        </motion.div>
      ) : (
        <motion.div
          animate={{
            scale: isHovered ? 1.6 : 1,
            backgroundColor: isHovered ? "rgba(197, 168, 128, 0.25)" : "rgba(1, 1, 1, 0.4)",
            borderColor: isHovered ? "rgba(197, 168, 128, 0.8)" : "rgba(232, 232, 232, 0.6)",
          }}
          transition={{ duration: 0.2 }}
          className="w-4 h-4 rounded-full border border-[#c5a880] backdrop-blur-[2px]"
        />
      )}
    </motion.div>
  );
}
