import type { Metadata } from 'next';
import { BASE_URL } from './app';
import { ADMIN_EMAIL1 } from './env';

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

const metadataConfig: Metadata = {
  metadataBase: new URL(META.url),
  title: {
    default: META.title,
    template: `%s | ${META.title}`,
  },
  authors: [{ url: META.url, name: META.title }],
  description: META.description,
  keywords: META.keywords,
  alternates: {
    canonical: META.url,
    types: {
      'application/rss+xml': [
        { title: 'RSS 订阅', url: `${META.url}/feed.xml` },
      ],
    },
  },
  icons: {
    shortcut: `${META.url}/favicon.ico`,
  },
  manifest: `${META.url}/site.webmanifest`,
  openGraph: {
    title: META.title,
    description: META.description,
    type: 'website',
    locale: 'zh',
    url: META.url,
    siteName: META.title,
  },
  twitter: {
    site: META.url,
    creator: META.twitterCreator,
    creatorId: META.twitterCreatorId,
    description: META.description,
    title: META.title,
    card: 'summary',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default metadataConfig;
