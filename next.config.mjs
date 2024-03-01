/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "images.pexels.com",
      "jetcord-dev.s3.ap-south-1.amazonaws.com",
      "giphy.com",
    ],
  },
};

export default nextConfig;
