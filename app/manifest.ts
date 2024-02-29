import { META } from '@/constants/seo';
import { MetadataRoute } from 'next';

const manifest = (): MetadataRoute.Manifest => {
  return {
    name: META.title,
    short_name: META.title,
    description: META.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
};

export default manifest;
