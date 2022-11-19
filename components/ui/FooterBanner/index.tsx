import Link from 'next/link';
import classNames from 'classnames';
import Container from '../Container';

interface FooterBannerProps {
  theme?: 'normal' | 'reverse';
}

const FooterBanner = ({ theme = 'normal' }: FooterBannerProps) => {
  return (
    <div
      className={classNames(
        'py-10 sm:py-12',
        theme === 'normal' ? 'bg-gray-50' : 'bg-white'
      )}
    >
      <Container className='flex flex-col items-start justify-between sm:flex-row'>
        <div>
          <p className='mb-2 text-lg font-semibold text-gray-900'>感谢你可以看到这里</p>
          <p className='text-base text-gray-600'>我们俩之间只差一条留言的距离</p>
        </div>
        <Link
          href='/guest'
          type='button'
          className='mt-4 rounded-sm bg-primary px-9 py-2 text-white opacity-80 transition-opacity hover:opacity-100 sm:mt-0'
        >
          前往留言
        </Link>
      </Container>
    </div>
  );
};

export default FooterBanner;
