/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://ai-chat-backend-3k7m.onrender.com/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig; 