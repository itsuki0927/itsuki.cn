const RESOURCE_HOST = 'resources.fivewoods.xyz';

const RESOURCE_URL = `https://${RESOURCE_HOST}`;

const isProd = process.env.NODE_ENV === 'production';
console.log(`[ mode: ${process.env.NODE_ENV} ]`);

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: isProd,
});

// const withPreact = require('next-plugin-preact');

/** @type {import('next').NextConfig} */
module.exports = withBundleAnalyzer(
  // withPreact(
  {
    assetPrefix: isProd ? RESOURCE_URL : '',
    reactStrictMode: true,
    images: {
      domains: [RESOURCE_HOST],
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      // config.externals.push({
      //   'hightlight.js': 'hightlight.js',
      //   marked: 'marked',
      //   dompurify: 'dompurify',
      // });

      // config.performance = {
      //   hints: 'error',
      //   maxAssetSize: 500 * 1024, // 100 KiB
      //   maxEntrypointSize: 500 * 1024, // 100 KiB
      // };

      config.optimization = {
        ...config.optimization,
        splitChunks: {
          ...config.optimization.splitChunks,
          cacheGroups: {
            vendor: {
              name: 'node_vendors', // part of the bundle name and
              test: /[\\/]node_modules[\\/]/,
              chunks: 'all',
            },
            components: {
              name: 'component_vendors',
              test: /[\\/]components[\\/]/,
              chunks: 'all',
              minSize: 0,
            },
            framework: {
              name: 'framework_vendors',
              test: /[\\/]framework[\\/]/,
              chunks: 'all',
              minSize: 0,
            },
          },
        },
      };
      return config;
    },
  }
  // )
);
