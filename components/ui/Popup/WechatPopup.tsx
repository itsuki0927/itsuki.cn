import { MyImage } from '@/components/common';
import Container from '../Container';

const WechatPopup = () => (
  <Container className='min-w-[24rem] max-w-[90%] border-8 border-white-3 bg-white-1'>
    <div className='my-8 text-center'>
      <MyImage
        alt='wechat popup'
        src='/wechat.png'
        className='rounded-sm opacity-80'
        width={150}
        height={150}
      />
      <p className='mt-4 text-sm'>请使用微信扫码</p>
    </div>
    <p className='text-center text-sm text-gray-2'>
      很高兴在这里和你相遇, 我们一起结伴前行
    </p>
  </Container>
);

export default WechatPopup;
