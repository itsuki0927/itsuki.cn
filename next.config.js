const RESOURCE_HOST = 'static.itsuki.cn';

const RESOURCE_URL = `https://${RESOURCE_HOST}`;

const isProd = process.env.NODE_ENV === 'production';
console.log(`[ mode: ${process.env.NODE_ENV} ]`);

const domains = ['s.gravatar.com', RESOURCE_HOST];

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: isProd,
});

/** @type {import('next').NextConfig} */
module.exports = withBundleAnalyzer({
  assetPrefix: isProd ? RESOURCE_URL : '',
  reactStrictMode: true,
  async rewrites() {
    return [{ source: '/rss.xml', destination: '/api/rss' }];
  },
  images: {
    domains: isProd ? domains.slice(-1) : domains,
  },
  compiler: {
    // 生产环境清楚console.log
    removeConsole: isProd ? { exclude: ['error'] } : false,
  },

  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Find the base rule that contains nested rules (which contains css-loader)
    const rules = config.module.rules.find(r => !!r.oneOf);

    // Interate over the found rules
    rules.oneOf.forEach(loaders => {
      // Focus on the the loaders that have an array of `use` statements
      if (Array.isArray(loaders.use)) {
        // Iterate over each of the loaders
        loaders.use.forEach(l => {
          // Only focus on loaders that are an object and have a `loader` property set to `css-loader`
          if (
            typeof l !== 'string' &&
            typeof l.loader === 'string' &&
            /(?<!post)css-loader/.test(l.loader)
          ) {
            // If there are no module options originally set, skip this loader
            if (!l.options.modules) return;
            const { getLocalIdent, ...others } = l.options.modules;

            // Create a new options object with the `getLocalIdent` property set to a function
            l.options = {
              ...l.options,
              modules: {
                ...others,
                getLocalIdent: (ctx, localIdentName, localName) => {
                  // If the class name is `dark`, return it instead of hashing it
                  if (localName === 'dark') return localName;
                  // Otherwise, call the original function and return the value
                  return getLocalIdent(ctx, localIdentName, localName);
                },
              },
            };
          }
        });
      }
    });

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
        },
      },
    };
    return config;
  },
});
