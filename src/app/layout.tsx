import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/site-config";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { IntroAnimation } from "@/components/IntroAnimation";
import { PageTransition } from "@/components/ui/PageTransition";
import { Analytics } from "@/components/Analytics";

// ═══════════════════════════════════════════════════════════════════════
// FONTS — editorial serif display + clean grotesque body, exposed as CSS
// variables consumed by tailwind.config.ts (font-serif / font-sans).
//
// TODO: If the brand uses licensed faces (Söhne / Canela), swap these
//       next/font/google calls for next/font/local with the licensed files.
//       The CSS variable names (--font-display / --font-body) can stay the
//       same so nothing downstream changes.
// ═══════════════════════════════════════════════════════════════════════
const display = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Cinematic Film Production`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    // TODO: add a real OG image at /public/og.jpg (1200×630).
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/icon.png" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen bg-base font-sans text-ink antialiased">
        {/* Skip link for keyboard / screen-reader users. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded focus:bg-base-elevated focus:px-4 focus:py-2 focus:text-sm focus:text-ink"
        >
          Skip to content
        </a>

        <Analytics />
        <IntroAnimation />
        <Header />
        <main id="main">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
