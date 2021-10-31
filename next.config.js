const RESOURCE_HOST = 'resources.fivewoods.xyz';

const RESOURCE_URL = `https://${RESOURCE_HOST}`;

const isProd = process.env.NODE_ENV === 'production';
console.log(`[ mode: ${process.env.NODE_ENV} ]`);

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: isProd,
});

const withPreact = require('next-plugin-preact');

/** @type {import('next').NextConfig} */
module.exports = withBundleAnalyzer(
  withPreact({
    assetPrefix: isProd ? RESOURCE_URL : '',
    reactStrictMode: true,
    images: {
      domains: [RESOURCE_HOST],
    },
  })
);
