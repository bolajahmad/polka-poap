/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    // Fix for warnings about cjs/esm package duplication
    // See: https://github.com/polkadot-js/api/issues/5636
    transpilePackages: ['@polkadot/.*'],
    // Standalone builds for Dockerfiles
    output: process.env.NEXT_BUILD_STANDALONE === 'true' ? 'standalone' : undefined,
};

export default nextConfig;
