import { META } from './app';

const seoConfig = {
  title: META.title,
  defaultTitle: META.title,
  titleTemplate: '%s | 五木',
  description: META.description,
  keywords: META.keywords,
  openGraph: {
    title: META.title,
    description: META.description,
    type: 'website',
    locale: 'zh-cn',
    url: META.url,
    site_name: '五木',
    images: [
      {
        url: '/logo.png',
        width: 60,
        height: 60,
        alt: '五木',
      },
    ],
  },
  twitter: {
    handle: META.author,
    site: '五木',
    cardType: 'summary',
  },
};

export default seoConfig;
