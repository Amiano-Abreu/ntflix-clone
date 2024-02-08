/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: 'images.unsplash.com'
      },
      {
        hostname: "i.ytimg.com"
      },
      {
        hostname: "yt3.ggpht.com"
      },
    ],
  },
};

export default nextConfig;
