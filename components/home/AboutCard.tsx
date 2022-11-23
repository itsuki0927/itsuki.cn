import Link from 'next/link';
import MyImage from '@/components/common/MyImage';
import { SocialButtons } from '@/components/ui/SocialButton';

const AboutCard = () => (
  <div className='bg-gray-50 p-6'>
    <div className='flex justify-between pb-3'>
      <div>
        <div className='text-gray-500'>要做一个很酷的人</div>
        <div className='text-2xl text-gray-900'>
          你好, 我是
          <Link href='/about'>
            <span className='ml-1 cursor-pointer font-semibold text-primary transition-colors hover:text-primary-hover'>
              五块木头
            </span>
          </Link>
        </div>
      </div>

      <MyImage alt='avatar' src='/avatar.jpeg' width={60} height={60} circle />
    </div>

    <SocialButtons />
  </div>
);

export default AboutCard;
