'use client';

import { NextSeo } from 'next-seo';
import { GAEventCategories } from '@/constants/gtag';
import { useMount } from '@/hooks';
import { gtag } from '@/utils/gtag';

const ArchiveClient = () => {
  useMount(() => {
    gtag.event('archive', {
      category: GAEventCategories.Archive,
    });
  });
  return (
    <>
      <NextSeo title='归档' />
    </>
  );
};

export default ArchiveClient;
