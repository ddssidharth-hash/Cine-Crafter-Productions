"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { easeCine } from "@/lib/motion";

// ═══════════════════════════════════════════════════════════════════════
// PAGE TRANSITION — a soft fade/rise on route change, keyed by pathname.
// Wraps page content in the root layout. Reduced-motion users get no motion.
// ═══════════════════════════════════════════════════════════════════════

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  if (reduce) return <>{children}</>;

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: easeCine }}
    >
      {children}
    </motion.div>
  );
}
