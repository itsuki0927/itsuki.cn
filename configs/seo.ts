import { META } from './app';

const seoConfig = {
  title: META.title,
  defaultTitle: META.title,
  titleTemplate: '%s - Itsuki Blog',
  description: META.description,
  keywords: META.keywords,
  openGraph: {
    title: META.title,
    description: META.description,
    type: 'website',
    locale: 'zh-cn',
    url: META.url,
    site_name: 'Itsuki Blog',
    images: [
      {
        url: '/card.png',
        width: 800,
        height: 600,
        alt: 'Itsuki Blog',
      },
    ],
  },
  twitter: {
    handle: META.author,
    site: 'Itsuki Blog',
    cardType: 'summary',
  },
};

export default seoConfig;
