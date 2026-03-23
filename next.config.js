/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 1. Fix "Page with redirect" by forcing a consistent URL structure
  // This ensures every URL ends with a / (e.g. /about/)
  trailingSlash: true, 

  experimental: {
    // This helps with TBT by optimizing how icons and heavy libs are bundled
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "react-icons",
      "sonner",
      "vaul",
      "@radix-ui/react-icons",
    ],
  },
  // Ensure we don't accidentally include source maps in production which can bloat chunks
  productionBrowserSourceMaps: false,
};

export default nextConfig;