import { VERCEL_ENV, VERCEL_URL } from './env';

export const BASE_URL =
  VERCEL_ENV === 'development'
    ? 'http://localhost:3000'
    : VERCEL_ENV === 'production'
    ? 'https://itsuki.cn'
    : `https://${VERCEL_URL}`;

export const RESEND_EMAIL = 'hi@itsuki.cn';

export const TOTAL_PAGEVIEWS_BASELINE = 10000;

export const SOCIAL = {
  github: 'https://github.com/itsuki0927',
  juejin: 'https://juejin.cn/user/2436173499466350',
  sifou: 'https://segmentfault.com/u/itsuki0927',
};
