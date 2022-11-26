const RESOURCE_HOST = 'static.itsuki.cn';

// const RESOURCE_URL = `https://${RESOURCE_HOST}`;

const isProd = process.env.NODE_ENV === 'production';
console.log(`[ mode: ${process.env.NODE_ENV} ]`);

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: isProd,
});

/** @type {import('next').NextConfig} */
module.exports = withBundleAnalyzer({
  distDir: 'build',
  // assetPrefix: isProd ? RESOURCE_URL : '',
  reactStrictMode: true,
  async rewrites() {
    return [{ source: '/rss.xml', destination: '/api/rss' }];
  },
  images: {
    domains: [RESOURCE_HOST],
  },
  compiler: {
    // 生产环境清除console.log
    removeConsole: isProd ? { exclude: ['error', 'debug'] } : false,
  },
  experimental: {
    appDir: true,
    enableUndici: true,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    /* config.optimization = { */
    /*   ...config.optimization, */
    /*   splitChunks: { */
    /*     ...config.optimization.splitChunks, */
    /*     cacheGroups: { */
    /*       vendor: { */
    /*         name(module) { */
    /*           const packageInformation = module.context.match( */
    /*             /[\\/]node_modules[\\/](.*?)([\\/]|$)/ */
    /*           ); */
    /**/
    /*           const packageName = packageInformation */
    /*             ? packageInformation[1] */
    /*             : 'node_vendors'; */
    /**/
    /*           const requestVendorsList = [ */
    /*             'graphql', */
    /*             'graphql-request', */
    /*             '@tanstack/react-query', */
    /*           ]; */
    /*           if (requestVendorsList.includes(packageName)) { */
    /*             return `request_vendors`; */
    /*           } */
    /**/
    /*           const markdownVendorsList = ['marked', 'highlight.js', 'dompurify']; */
    /**/
    /*           if (markdownVendorsList.includes(packageName)) { */
    /*             return `markdown_vendors`; */
    /*           } */
    /**/
    /*           const restVendorsList = [ */
    /*             'classnames', */
    /*             'feed', */
    /*             'gravatar', */
    /*             'nprogress', */
    /*             'qrcode', */
    /*             'react-hot-toast', */
    /*             'react-toggle-dark-mode', */
    /*             'react-transition-group', */
    /*             'ua-parser-js', */
    /*           ]; */
    /*           if (restVendorsList.includes(packageName)) { */
    /*             return 'rest_vendors'; */
    /*           } */
    /**/
    /*           return 'node_vendors'; */
    /*         }, */
    /*         test: /[\\/]node_modules[\\/]/, */
    /*         chunks: 'all', */
    /*       }, */
    /*       components: { */
    /*         name: 'component_vendors', */
    /*         test: /[\\/]components[\\/]/, */
    /*         chunks: 'all', */
    /*         minSize: 1, */
    /*       }, */
    /*     }, */
    /*   }, */
    /* }; */
    return config;
  },
});
