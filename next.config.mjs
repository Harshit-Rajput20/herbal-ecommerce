/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // This is crucial for static export
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, // Required for static export
  },
  // Optional: Add if you're using dynamic routes
  
  trailingSlash: true, // Helps with static file routing
}

export default nextConfig