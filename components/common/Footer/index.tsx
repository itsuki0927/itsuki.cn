import Link from 'next/link';
import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import useTags from '@/hooks/tag';
import { getTagRoute } from '@/utils/url';
import ExternalLink from '../ExternalLink';
import Logo from '../Logo';

interface CommonProps {
  children?: ReactNode;
}

type InternalLinkProps = CommonProps & {
  href: string;
};
const InternalLink = ({ children, href }: InternalLinkProps) => (
  <Link href={href}>
    <a className='cursor-pointer text-gray-600 transition hover:text-gray-700'>
      {children}
    </a>
  </Link>
);

const Title = ({ children }: CommonProps) => (
  <span className='font-medium text-gray-500'>{children}</span>
);

const Banner = ({ theme }: FooterProps) => {
  const router = useRouter();

  const renderButton = () => {
    if (router.pathname === '/guestbook') return null;

    return (
      <button
        type='button'
        className='mt-4 w-full rounded-sm bg-primary px-9 py-2 text-white opacity-80 transition-opacity hover:opacity-100 sm:mt-0 sm:w-auto'
        onClick={() => {
          router.push('/guestbook');
        }}
      >
        前往留言
      </button>
    );
  };

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
        {renderButton()}
      </div>
    </div>
  );
};

interface FooterProps {
  theme: 'normal' | 'reverse';
}

const Footer = ({ theme = 'normal' }: FooterProps) => {
  const { data } = useTags();
  return (
    <footer className=''>
      <Banner theme={theme} />

      <div className={classNames(theme === 'normal' ? 'bg-white' : 'bg-gray-50')}>
        <div className='container flex w-full flex-col items-start justify-center'>
          <div className='flex w-full flex-col py-12 sm:flex-row'>
            <div className='flex w-full flex-col sm:mr-16 sm:w-80'>
              <Logo />
              <span className='mt-6 text-gray-600 sm:mt-8'>欢迎来到五块木头的博客</span>
            </div>
            <div className='mt-12 grid grid-cols-2 sm:mt-0 sm:grid-cols-3'>
              <div className='flex flex-col space-y-2 sm:mr-8 sm:space-y-4 md:w-36'>
                <Title>标签</Title>
                <div className='flex flex-col space-y-2 sm:space-y-4'>
                  {data?.map(tag => (
                    <InternalLink href={getTagRoute(tag.path)} key={tag.path}>
                      {tag.name}
                    </InternalLink>
                  ))}
                </div>
              </div>
              <div className='flex flex-col space-y-2 sm:mr-8 sm:space-y-4 md:w-36'>
                <Title>导航</Title>
                <InternalLink href='/'>Home</InternalLink>
                <InternalLink href='/blog'>Blog</InternalLink>
                <InternalLink href='/guestbook'>Guestbook</InternalLink>
                <InternalLink href='/archive'>Archive</InternalLink>
                <InternalLink href='/about'>About</InternalLink>
              </div>
              <div className='mt-8 flex flex-col space-y-2 sm:mt-0 sm:space-y-4 md:w-36'>
                <Title>社区</Title>
                <ExternalLink
                  className='text-gray-600 transition hover:text-gray-700'
                  href='https://github.com/itsuki0927'
                >
                  GitHub
                </ExternalLink>
                <ExternalLink
                  className='text-gray-600 transition hover:text-gray-700'
                  href='https://juejin.cn/user/2436173499466350'
                >
                  Juejin
                </ExternalLink>
                <ExternalLink
                  className='text-gray-600 transition hover:text-gray-700'
                  href='https://segmentfault.com/u/itsuki0927'
                >
                  Sifou
                </ExternalLink>
              </div>
            </div>
          </div>

          <div className='flex w-full flex-col border-t border-t-gray-200 pt-8 pb-12 text-sm sm:flex-row sm:items-center sm:justify-between sm:space-x-4'>
            <ExternalLink href='https://beian.miit.gov.cn'>
              湘ICP备2021020356号
            </ExternalLink>
            <span className='text-gray-500'>Copyright © 五块木头 Blog 2022</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
