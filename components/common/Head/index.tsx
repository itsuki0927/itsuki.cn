import NextHead from 'next/head';
import { DefaultSeo } from 'next-seo';
import config from '@/configs/seo';
import { ICONFONT_URL, META } from '@/configs/app';

const Head = () => (
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
      <link
        rel='preload'
        href={`${ICONFONT_URL}.woff2`}
        as='font'
        type='font/woff2'
        crossOrigin='anonymous'
      />
      <link rel='stylesheet' href={`${ICONFONT_URL}.css`} />
    </NextHead>
  </>
);

export default Head;
