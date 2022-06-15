import Link from 'next/link';
import useTags from '@/hooks/tag';
import { getTagRoute } from '@/utils/url';
import ExternalLink from '../ExternalLink';

const Footer = () => {
  const { data } = useTags();
  return (
    <footer className='bg-white'>
      <div className='mx-auto flex w-full max-w-5xl flex-col items-start justify-center px-4 '>
        <div className='grid w-full max-w-5xl grid-cols-3 gap-2 py-8 sm:grid-cols-3 sm:gap-4'>
          <div className='flex flex-col space-y-2 sm:space-y-4'>
            <span className='font-medium'>标签</span>
            <div className='grid grid-cols-1 gap-2 sm:gap-4'>
              {data?.map(tag => (
                <Link key={tag.path} href={getTagRoute(tag.path)}>
                  <a className='text-gray-500 transition hover:text-gray-600'>
                    {tag.name}
                  </a>
                </Link>
              ))}
            </div>
          </div>
          <div className='flex flex-col space-y-2 sm:space-y-4'>
            <span className='font-medium'>链接</span>
            <Link href='/'>
              <a className='text-gray-500 transition hover:text-gray-600'>Home</a>
            </Link>
            <Link href='/blog'>
              <a className='text-gray-500 transition hover:text-gray-600'>Blog</a>
            </Link>
            <Link href='/guestbook'>
              <a className='text-gray-500 transition hover:text-gray-600'>Guestbook</a>
            </Link>
            <Link href='/archive'>
              <span className='cursor-pointer text-gray-500 transition hover:text-gray-600'>
                Archive
              </span>
            </Link>
            <Link href='/about'>
              <a className='text-gray-500 transition hover:text-gray-600'>About</a>
            </Link>
          </div>
          <div className='flex  flex-col space-y-2 sm:space-y-4'>
            <span className='font-medium'>社区</span>
            <ExternalLink
              className='text-gray-500 transition hover:text-gray-600'
              href='https://github.com/itsuki0927'
            >
              GitHub
            </ExternalLink>
            <ExternalLink
              className='text-gray-500 transition hover:text-gray-600'
              href='https://juejin.cn/user/2436173499466350'
            >
              Juejin
            </ExternalLink>
            <ExternalLink
              className='text-gray-500 transition hover:text-gray-600'
              href='https://segmentfault.com/u/itsuki0927'
            >
              Sifou
            </ExternalLink>
          </div>
        </div>

        <div className='flex w-full flex-col border-t border-t-gray-200 py-8 text-sm sm:flex-row sm:items-center sm:space-x-4'>
          <ExternalLink href='https://beian.miit.gov.cn'>
            湘ICP备2021020356号
          </ExternalLink>
          <span className='text-gray-500'>Copyright © Itsuki's Blog 2022</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
