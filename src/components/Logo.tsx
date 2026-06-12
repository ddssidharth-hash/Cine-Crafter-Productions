import Image from "next/image";
import { siteConfig } from "@/site-config";

// ═══════════════════════════════════════════════════════════════════════
// LOGO COMPONENT
// Renders the brand logo from processed, theme-ready PNG assets (off-white
// art on transparent — sits cleanly on the near-black theme).
//
//   • variant "mark"   → /logo-mark.png   (director icon only; square)
//   • variant "lockup" → /logo-lockup.png (icon + full wordmark)
//
// Assets are generated from /public/logo.jpg by scripts/process-logo.mjs.
// To swap the brand logo: replace public/logo.jpg and re-run
//   node scripts/process-logo.mjs
// (adjust the crop ratios in that script if the new art is composed
// differently).
// ═══════════════════════════════════════════════════════════════════════

// Intrinsic aspect ratios of the generated assets (width / height).
const ASSETS = {
  mark: { src: "/logo-mark.png", ratio: 640 / 640 },
  lockup: { src: "/logo-lockup.png", ratio: 1800 / 779 },
} as const;

interface LogoProps {
  /** Rendered pixel height; width scales to preserve aspect ratio. */
  height?: number;
  className?: string;
  variant?: keyof typeof ASSETS;
  /** Show the "CineCrafter" wordmark beside the icon (mark variant only). */
  withWordmark?: boolean;
}

export function Logo({
  height = 28,
  className,
  variant = "mark",
  withWordmark = false,
}: LogoProps) {
  const asset = ASSETS[variant];
  const width = Math.round(height * asset.ratio);

  const img = (
    <Image
      src={asset.src}
      alt={withWordmark || variant === "lockup" ? siteConfig.name : ""}
      width={width}
      height={height}
      priority
      className={className}
    />
  );

  if (variant === "mark" && withWordmark) {
    return (
      <span className="inline-flex items-center gap-3">
        {img}
        <span
          className="font-sans uppercase leading-none tracking-[0.2em] text-ink"
          style={{ fontSize: Math.max(11, height * 0.42) }}
        >
          CineCrafter
        </span>
      </span>
    );
  }

  return img;
}
