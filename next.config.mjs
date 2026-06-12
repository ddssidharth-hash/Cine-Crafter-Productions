/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  images: {
    unoptimized: true,
    // Modern formats first to keep payloads small and avoid layout shift.
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // TODO: Add the real CDN / asset host domains here once media is supplied.
      // Example placeholder hosts used by the seed data:
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "**.googleusercontent.com" },
    ],
  },
};

export default nextConfig;
