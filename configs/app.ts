// web url
export const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL ?? '';

// ga id
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID ?? '';

// api url
export const API_URL = process.env.NEXT_PUBLIC_API_BASE_PATH ?? '';

// api version
export const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION ?? '';

// iconfont url
export const ICONFONT_URL = '//at.alicdn.com/t/font_2836612_p216jd1hf5';

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

export const EMAIL = process.env.NEXT_PUBLIC_EMAIL ?? '';

// blog meta
export const META = {
  title: '五块木头',
  keywords: '五块木头,前端技术博客,React,Next.js,JavaScript,TypeScript',
  description: '有关于前端和个人思考的文章: TypeScript、JavaScript、React、Nextjs等等!',
  url: WEB_URL,
  author: '五块木头',
  email: EMAIL,
};
