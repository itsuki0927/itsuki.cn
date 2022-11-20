import { ReactNode } from 'react';
import classNames from 'classnames';
import { getTagRoute } from '@/utils/url';
import ExternalLink from '../ExternalLink';
import Logo from '../Logo';
import InternalLink from '../InternalLink';
import { DEFAULT_ROUTE_LIST_WITH_HOME } from '@/constants/value';
import { getAllTags } from '@/api/tag';

interface CommonProps {
  children?: ReactNode;
}

const Title = ({ children }: CommonProps) => (
  <span className='font-medium text-gray-500'>{children}</span>
);

interface FooterProps {
  theme: 'normal' | 'reverse';
}

const Footer = async ({ theme = 'normal' }: FooterProps) => {
  const tags = await getAllTags();
  return (
    <footer className={classNames(theme === 'normal' ? 'bg-white' : 'bg-gray-50')}>
      <div className='container flex w-full flex-col items-start justify-center'>
        <div className='flex w-full flex-col py-12 sm:flex-row sm:justify-between'>
          <div className='flex w-full flex-col sm:mr-16 sm:w-80'>
            <Logo />
            <p className='mt-6 text-gray-600 sm:mt-8'>欢迎来到五块木头的博客</p>
            <p className='mt-3 text-gray-600 sm:mt-4'>要做一个很酷的人</p>
          </div>
          <div className='mt-12 grid grid-cols-2 sm:mt-0 sm:grid-cols-3'>
            <div className='flex flex-col space-y-2 sm:mr-8 sm:space-y-4 md:w-36'>
              <Title>标签</Title>
              <div className='flex flex-col space-y-2 sm:space-y-4'>
                {tags?.map(tag => (
                  <InternalLink href={getTagRoute(tag.path)} key={tag.path}>
                    {tag.name}
                  </InternalLink>
                ))}
              </div>
            </div>
            <div className='flex flex-col space-y-2 sm:mr-8 sm:space-y-4 md:w-36'>
              <Title>导航</Title>
              {DEFAULT_ROUTE_LIST_WITH_HOME.map(route => (
                <InternalLink href={route.path} key={route.path}>
                  {route.en}
                </InternalLink>
              ))}
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
    </footer>
  );
};

export default Footer;
