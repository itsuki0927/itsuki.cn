import { ICONFONT_URL } from '@/configs/app';

const Iconfont = () => (
  <>
    <link
      rel='preload'
      href={`${ICONFONT_URL}.woff2`}
      as='font'
      type='font/woff2'
      crossOrigin='anonymous'
    />
    <link rel='stylesheet' href={`${ICONFONT_URL}.css`} />
  </>
);

export default Iconfont;
