// eslint-disable-next-line import/extensions
import 'styles/global.css';
import { StandardProps } from '@/types/common';
import AppLayout from './AppLayout';
import { ICONFONT_URL, META } from '@/configs/app';

const Layout = ({ children }: Pick<StandardProps, 'children'>) => (
  <html lang='en'>
    <head>
      <link
        rel='preload'
        href='/fonts/ibm-plex-sans-var.woff2'
        as='font'
        type='font/woff2'
        crossOrigin='anonymous'
      />
      <link
        rel='preload'
        href='/fonts/FiraCode.ttf'
        as='font'
        type='font/ttf'
        crossOrigin='anonymous'
      />
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
    </head>
    <body>
      <AppLayout>{children}</AppLayout>
    </body>
  </html>
);

export default Layout;
