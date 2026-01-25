/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // For static export compatibility if needed
  },
  // Preserve file structure for assets
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname),
    };
    
    // Add rule for .jfif files - must be before Next.js default rules
    config.module.rules.unshift({
      test: /\.jfif$/i,
      type: 'asset/resource',
    });
    
    return config;
  },
};

module.exports = nextConfig;
