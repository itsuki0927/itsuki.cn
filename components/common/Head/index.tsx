import { FC } from 'react';
import NextHead from 'next/head';
import { DefaultSeo } from 'next-seo';
import config from '@/configs/seo';
import { META } from '@/configs/app';
import Iconfont from '../Iconfont';

const Head: FC = () => (
  <>
    <DefaultSeo
      {...config}
      additionalMetaTags={[
        {
          name: 'keywords',
          content: META.keywords,
        },
      ]}
    />
    <NextHead>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <link rel='icon' href='/favicon.ico' />
      <link rel='manifest' href='/site.webmanifest' key='site-manifest' />
      <link
        rel='alternate'
        type='application/rss+xml'
        title={`${META.author}'s blog feed`}
        href='/rss.xml'
      />
      <Iconfont />
    </NextHead>
  </>
);

export default Head;
