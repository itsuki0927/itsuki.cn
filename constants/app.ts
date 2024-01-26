import { ADMIN_EMAIL1, VERCEL_ENV, VERCEL_URL } from './env';

export const BASE_URL =
  VERCEL_ENV === 'development'
    ? 'http://localhost:3000'
    : `https://${VERCEL_URL}`;

export const RESEND_EMAIL = 'hi@itsuki.cn';

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
  email: ADMIN_EMAIL1,
};

export const SOCIAL = {
  github: 'https://github.com/itsuki0927',
  juejin: 'https://juejin.cn/user/2436173499466350',
  sifou: 'https://segmentfault.com/u/itsuki0927',
};
