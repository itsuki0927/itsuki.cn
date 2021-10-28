import Head from 'next/head';
import { ICONFONT_URL } from '@/configs/app';

const Iconfont = () => (
  <Head>
    <link
      rel='preload'
      href={`${ICONFONT_URL}.woff2`}
      as='font'
      type='font/woff2'
      crossOrigin='anonymous'
    />
    <link rel='stylesheet' href={`${ICONFONT_URL}.css`} />
  </Head>
);

export default Iconfont;
