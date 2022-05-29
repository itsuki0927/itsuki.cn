import classNames from 'classnames';
import { useState } from 'react';
import { MyImage } from '@/components/common';
import Container from '../Container';
import { AlipayOutlined, WechatOutlined } from '@/components/icons';
import s from './style.module.scss';

const SponsorPopup = () => {
  const [type, setType] = useState<'wechatpay' | 'alipay'>('wechatpay');
  return (
    <Container className='min-w-[24rem] max-w-[90%] border-8 border-white-3 bg-white-1'>
      <div className='my-16 text-center'>
        <MyImage
          src={`/${type}.png`}
          className={classNames(
            s.sponsor,
            type === 'wechatpay' ? 'text-wechat' : 'text-primary'
          )}
          imgClassName='rounded-sm opacity-80'
          width={150}
          height={150}
        />
        <p className='mt-4 text-sm'>
          请使用{type === 'wechatpay' ? '微信' : '支付宝'}扫码
        </p>
      </div>
      <ul className='my-4 flex justify-center space-x-6 text-center'>
        <li
          className='cursor-pointer text-center'
          onClick={() => {
            setType('wechatpay');
          }}
        >
          <WechatOutlined
            className={classNames(
              'capsize text-3xl transition-colors hover:text-wechat',
              type === 'wechatpay' ? 'text-wechat' : ''
            )}
          />
        </li>
        <li
          className='cursor-pointer text-center'
          onClick={() => {
            setType('alipay');
          }}
        >
          <AlipayOutlined
            className={classNames(
              'capsize text-3xl transition-colors hover:text-primary',
              type === 'alipay' ? 'text-primary' : ''
            )}
          />
        </li>
      </ul>
      <p className='text-center text-sm text-gray-2'>
        感谢对我的肯定, 你可以选择以上两种方式进行支持.
      </p>
    </Container>
  );
};

export default SponsorPopup;
