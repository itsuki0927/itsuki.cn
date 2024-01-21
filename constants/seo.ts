import type { Metadata } from 'next';
import { META } from './app';

const metadataConfig: Metadata = {
  title: {
    default: '五块木头',
    template: `%s | ${META.title}`,
  },
  authors: [{ url: META.url, name: META.title }],
  description: META.description,
  keywords: META.keywords,
  archives: `${META.url}/archives`,
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
