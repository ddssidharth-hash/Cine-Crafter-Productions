// ═══════════════════════════════════════════════════════════════════════
// LOGO PROCESSOR (build-time utility — not shipped to the client).
//
// Source: public/logo.jpg — black artwork on a white background, a square
// full lockup (director icon + "CINE CRAFTER PRODUCTIONS" wordmark).
//
// Produces two theme-ready assets used by <Logo>:
//   • public/logo-mark.png    — the director icon only (square), for the
//                                header / footer where the wordmark would be
//                                illegible at small sizes.
//   • public/logo-lockup.png  — the full trimmed lockup, for the intro
//                                animation.
//
// Both are recolored to the off-white ink (#F5F5F2) on a TRANSPARENT
// background, so they sit cleanly on the near-black theme with no CSS hacks.
//
// Re-run after replacing logo.jpg:  node scripts/process-logo.mjs
// ═══════════════════════════════════════════════════════════════════════
import sharp from "sharp";

const SRC = "public/logo.jpg";
// Off-white ink — keep in sync with --color-ink in globals.css.
const INK = { r: 245, g: 245, b: 242 };

/**
 * Recolor black-on-white art to INK-on-transparent.
 * Alpha = darkness of the source (black art → opaque, white bg → transparent).
 */
async function inkOnTransparent(pipeline) {
  const { data, info } = await pipeline
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const alpha = Buffer.alloc(data.length);
  for (let i = 0; i < data.length; i++) alpha[i] = 255 - data[i];

  return sharp({
    create: {
      width: info.width,
      height: info.height,
      channels: 3,
      background: INK,
    },
  })
    .joinChannel(alpha, { raw: { width: info.width, height: info.height, channels: 1 } })
    .png();
}

async function run() {
  const { width: W, height: H } = await sharp(SRC).metadata();

  const transparentBg = { r: 0, g: 0, b: 0, alpha: 0 };

  // ── Icon mark ──────────────────────────────────────────────────────
  const mark = sharp(SRC).extract({
    left: Math.round(0.34 * W),
    top: Math.round(0.25 * H),
    width: Math.round(0.33 * W),
    height: Math.round(0.34 * H),
  });
  // Bake the ink/alpha treatment + trim into a buffer, then derive sizes.
  const markBuf = await (await inkOnTransparent(mark)).trim().toBuffer();

  await sharp(markBuf)
    .resize(640, 640, { fit: "contain", background: transparentBg })
    .png({ compressionLevel: 9 })
    .toFile("public/logo-mark.png");
  console.log("✓ public/logo-mark.png");

  await sharp(markBuf)
    .resize(64, 64, { fit: "contain", background: transparentBg })
    .png({ compressionLevel: 9 })
    .toFile("public/icon.png");
  console.log("✓ public/icon.png");

  // ── Full lockup ────────────────────────────────────────────────────
  // Trim the white border first (top-left pixel is white) for tight bounds.
  const lockup = sharp(SRC).flatten({ background: "#ffffff" }).trim({ threshold: 10 });
  const lockupBuf = await (await inkOnTransparent(lockup)).trim().toBuffer();

  await sharp(lockupBuf)
    .resize(1800, null, { withoutEnlargement: true })
    .png({ compressionLevel: 9 })
    .toFile("public/logo-lockup.png");
  console.log("✓ public/logo-lockup.png");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
