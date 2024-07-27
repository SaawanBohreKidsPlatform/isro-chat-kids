/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "https://backend.isrospaceagent.com/",
      },
    ];
  },
};

export default nextConfig;
