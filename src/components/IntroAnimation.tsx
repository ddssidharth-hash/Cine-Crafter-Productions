"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Logo } from "@/components/Logo";
import { easeCine } from "@/lib/motion";

// ═══════════════════════════════════════════════════════════════════════
// INTRO ANIMATION
// A brief, tasteful brand moment on first load (~1.6s): the logo fades and
// scales in over a near-black field, a hairline draws beneath it, then the
// whole overlay lifts away to reveal the page.
//
// • Shown once per browser session (sessionStorage) so navigating around the
//   site doesn't replay it. Clear the key to test, or set ALWAYS_SHOW = true.
// • Fully skipped for users who prefer reduced motion.
// ═══════════════════════════════════════════════════════════════════════

const SESSION_KEY = "cc_intro_seen";
const ALWAYS_SHOW = false; // set true while designing the intro

export function IntroAnimation() {
  const reduceMotion = useReducedMotion();
  // Start hidden; we decide on mount to avoid a server/client flash.
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (reduceMotion) return; // honor reduced motion: no intro at all
    if (!ALWAYS_SHOW && sessionStorage.getItem(SESSION_KEY)) return;

    setShow(true);
    // Lock scroll while the intro plays.
    document.body.style.overflow = "hidden";

    const t = setTimeout(() => {
      // Mark as seen only once the intro has actually completed. Setting this
      // upfront breaks under React Strict Mode's dev double-invoke (the second
      // pass would see the flag and never schedule the hide timer).
      sessionStorage.setItem(SESSION_KEY, "1");
      setShow(false);
      document.body.style.overflow = "";
    }, 1700);

    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-base"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.9, ease: easeCine }}
        >
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, filter: "blur(6px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1, ease: easeCine }}
            >
              <Logo variant="lockup" height={90} />
            </motion.div>
            {/* Hairline draw-in beneath the logo. */}
            <motion.span
              className="mt-6 block h-px bg-accent"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 120, opacity: 1 }}
              transition={{ duration: 1.1, ease: easeCine, delay: 0.25 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
