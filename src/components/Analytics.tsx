"use client";

import { useEffect } from "react";
import { firebaseApp } from "@/lib/firebase";

// ═══════════════════════════════════════════════════════════════════════
// FIREBASE ANALYTICS (browser-only).
// Analytics can only run in the browser and only where supported (it's gated
// behind isSupported() to avoid errors in unsupported contexts / SSR). Mounted
// once from the root layout. Page views are tracked automatically.
// ═══════════════════════════════════════════════════════════════════════

export function Analytics() {
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { getAnalytics, isSupported } = await import("firebase/analytics");
        if (!cancelled && (await isSupported())) {
          getAnalytics(firebaseApp);
        }
      } catch {
        // Analytics is non-critical; ignore failures (e.g. blocked by a client).
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
