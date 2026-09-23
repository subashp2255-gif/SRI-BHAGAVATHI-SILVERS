import { Variants } from "framer-motion";

// Custom luxury easing curves
export const EASE_LUXURY = [0.16, 1, 0.3, 1] as const;
export const EASE_CINEMATIC = [0.25, 1, 0.5, 1] as const;

// Standard Motion system variants

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_LUXURY },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: EASE_LUXURY },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_LUXURY },
  },
};

export const scaleReveal: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: EASE_LUXURY },
  },
};

export const slideReveal: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: EASE_LUXURY },
  },
};

export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE_LUXURY },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.3 },
  },
};

export const megaMenuReveal: Variants = {
  hidden: { opacity: 0, y: -10, scale: 0.99 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: EASE_LUXURY },
  },
  exit: {
    opacity: 0,
    y: -8,
    scale: 0.99,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

export const filterDrawer: Variants = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: EASE_LUXURY },
  },
  exit: {
    y: "100%",
    opacity: 0,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

export const carouselEntrance: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE_LUXURY },
  },
};

export const modalReveal: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.35, ease: EASE_LUXURY },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 12,
    transition: { duration: 0.25 },
  },
};

// LIVE SILVER RATE ANIMATION VARIANTS (Prompt Section 19)

export const rateStripEnter: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: EASE_LUXURY },
  },
};

export const ratePanelOpen: Variants = {
  hidden: { opacity: 0, y: -8, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.3, ease: EASE_LUXURY },
  },
  exit: {
    opacity: 0,
    y: -6,
    scale: 0.98,
    transition: { duration: 0.2 },
  },
};

export const ratePanelClose: Variants = {
  hidden: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export const numberChange: Variants = {
  hidden: { opacity: 0, y: -6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: EASE_LUXURY },
  },
};

export const statusPulse: Variants = {
  initial: { opacity: 0.5, scale: 0.95 },
  animate: {
    opacity: [0.5, 1, 0.5],
    scale: [0.95, 1.05, 0.95],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const silverSweep: Variants = {
  hidden: { x: "-100%" },
  visible: {
    x: "200%",
    transition: { duration: 1.2, ease: EASE_LUXURY },
  },
};

export const rateUpdate: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: EASE_LUXURY },
  },
};

// Aliases
export const fadeInUp = fadeUp;
export const fadeInScale = scaleReveal;
export const maskedImageReveal = imageReveal;
