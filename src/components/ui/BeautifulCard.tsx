// src/components/ui/BeautifulCard.tsx
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
  gradient?: boolean;
  glass?: boolean;
  neon?: boolean;
  onClick?: () => void;
}

export default function BeautifulCard({ 
  children, 
  className, 
  gradient = false,
  glass = false,
  neon = false,
  onClick 
}: Props) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={cn(
        "relative overflow-hidden rounded-2xl p-6",
        gradient && "bg-gradient-to-br from-blue-600 to-purple-600 text-white",
        glass && "glass-card",
        neon && "neon-border",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000" />
      <div className="absolute inset-0 shimmer" />
      {children}
    </motion.div>
  );
}