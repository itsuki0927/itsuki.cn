// eslint-disable-next-line import/extensions
import 'styles/global.css';
import { IBM_Plex_Sans, Fira_Code } from '@next/font/google';
import { StandardProps } from '@/types/common';
import AppLayout from './AppLayout';
import { ICONFONT_URL, META } from '@/configs/app';

const ibm = IBM_Plex_Sans({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-ibm',
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira',
});

const Layout = ({ children }: Pick<StandardProps, 'children'>) => (
  <html lang='en'>
    <head>
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
    <body className={`${ibm.variable} font-sans ${firaCode.variable} font-sans`}>
      <AppLayout>{children}</AppLayout>
    </body>
  </html>
);

export default Layout;
