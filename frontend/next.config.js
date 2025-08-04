/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://ai-chat-backend-1mz4ltyia-renard-futes-projects.vercel.app/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig; 