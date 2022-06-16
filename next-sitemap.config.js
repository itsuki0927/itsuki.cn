/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.NEXT_PUBLIC_WEB_URL,
  generateRobotsTxt: true,
  sourceDir: 'build',
};

export default config;
