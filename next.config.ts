import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/auth/register", destination: "/auth/signup", permanent: true },
      { source: "/contact", destination: "/company/contact", permanent: true },
      { source: "/company/why-dashcore", destination: "/company/why-corevia", permanent: true },
      { source: "/showcase", destination: "/showcase/typography", permanent: false },
      { source: "/workspace", destination: "/workspace/account/profile", permanent: false },
    ];
  },
};

export default nextConfig;
