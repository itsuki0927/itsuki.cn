// web url
export const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL ?? '';

// ga id
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID ?? '';

// api url
export const API_URL = process.env.NEXT_PUBLIC_API_BASE_PATH ?? '';

// api version
export const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION ?? '';

// iconfont url
export const ICONFONT_URL = '//at.alicdn.com/t/font_2836612_fmqifultb3r';

// resource 主机
export const RESOURCE_HOST = 'static.itsuki.cn';

// resource 路径
export const RESOURCE_URL = `https://${RESOURCE_HOST}`;

// next-auth 密钥
export const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET ?? '';

export const NEXTAUTH_URL = process.env.NEXTAUTH_URL ?? '';

export const NEXTAUTH_GITHUB_CLIENT_ID = process.env.NEXTAUTH_GITHUB_CLIENT_ID ?? '';

export const NEXTAUTH_GITHUB_CLIENT_SECRET =
  process.env.NEXTAUTH_GITHUB_CLIENT_SECRET ?? '';

// blog meta
export const META = {
  title: 'Itsuki Blog | 五木',
  keywords:
    'Itsuki 博客, Itsuki Blog, 五木, React, Next.js 博客,前端技术博客, JavaScript 技术',
  description: 'Itsuki Blog - 五木 博客 - 心之所向,行之所往 - https://itsuki.cn',
  url: WEB_URL,
  author: 'itsuki',
  email: '2309899048@qq.com',
};
