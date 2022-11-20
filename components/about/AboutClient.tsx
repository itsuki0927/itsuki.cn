'use client';

import { NextSeo } from 'next-seo';
import { GAEventCategories } from '@/constants/gtag';
import useMount from '@/hooks/useMount';
import { gtag } from '@/utils/gtag';

const AboutClient = () => {
  useMount(() => {
    gtag.event('about', {
      category: GAEventCategories.About,
    });
  });
  return (
    <>
      <NextSeo title='关于' />
    </>
  );
};

export default AboutClient;
