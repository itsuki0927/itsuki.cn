import { useRouter } from 'next/router';
import classNames from 'classnames';

interface FooterBannerProps {
  theme?: 'normal' | 'reverse';
}

const FooterBanner = ({ theme = 'normal' }: FooterBannerProps) => {
  const router = useRouter();

  return (
    <div
      className={classNames(
        'py-10 px-4 sm:px-0 sm:py-12',
        theme === 'normal' ? 'bg-gray-50' : 'bg-white'
      )}
    >
      <div className='container flex flex-col items-start justify-between sm:flex-row'>
        <div>
          <p className='mb-2 text-lg font-semibold text-gray-900'>感谢你可以看到这里</p>
          <p className='text-base text-gray-600'>我们俩之间只差一条留言的距离</p>
        </div>
        <button
          type='button'
          className='mt-4 w-full rounded-sm bg-primary px-9 py-2 text-white opacity-80 transition-opacity hover:opacity-100 sm:mt-0 sm:w-auto'
          onClick={() => {
            router.push('/guestbook');
          }}
        >
          前往留言
        </button>
      </div>
    </div>
  );
};

export default FooterBanner;
