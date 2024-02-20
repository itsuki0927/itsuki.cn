import { EMAIL, NEXT_PUBLIC_VERCEL_URL } from './env';

export const BASE_URL = NEXT_PUBLIC_VERCEL_URL
  ? `https://${NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000';

export const TOTAL_PAGEVIEWS_BASELINE = 10000;

// blog meta
export const META = {
  title: '五块木头',
  keywords:
    '五块木头,itsuki.cn,itsuki,itsuki blog,SkCode,NeoVim,前端技术博客,React,Next.js,JavaScript,TypeScript',
  description: '一个喜欢 code 和 run 的前端 dog',
  url: BASE_URL,
  author: '五块木头',
  twitterCreator: 'itsuki',
  twitterCreatorId: '6tEYlbBq544k4nu',
  email: EMAIL,
};
