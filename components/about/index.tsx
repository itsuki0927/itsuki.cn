import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { GAEventCategories } from '@/constants/gtag';
import { gtag } from '@/utils/gtag';
import { useUI } from '../ui/context';
import Description from './Description';
import ExperienceList from './ExperienceList';
import HoobyList from './HoobyList';
import { ExternalLink } from '../common';

interface BlogEntryProps {
  body: string;
  url: string;
  author: string;
}

function BlogEntry({ body, url, author }: BlogEntryProps) {
  return (
    <div className='flex flex-col'>
      <div className='w-full'>{body}</div>
      <div className='flex items-center space-x-3'>
        <p className='my-0 text-sm'>{author}</p>
        <span className='text-gray-1'>/</span>
        <ExternalLink
          href={url}
          className='text-sm text-gray-3 transition-colors hover:text-dark-2'
        >
          Github
        </ExternalLink>
      </div>
    </div>
  );
}

const AboutView = () => {
  const { openPopup, setPopupView } = useUI();
  return (
    <div className='mx-auto tracking-wider'>
      <NextSeo title='关于' />

      <div className='prose max-w-full px-4'>
        <section className='space-y-4'>
          <h2>一堆链接</h2>
          <ul>
            <li>
              GitHub:{' '}
              <ExternalLink href='https://github.com/itsuki0927'>
                @itsuki0927
              </ExternalLink>
            </li>
            <li>
              Website: <Link href='https://itsuki.cn'>https://itsuki.cn</Link>
            </li>
            <li>
              Wechat:
              <a
                tabIndex={0}
                role='button'
                onClick={e => {
                  e.preventDefault();
                  setPopupView('WECHAT_VIEW');
                  openPopup();
                  gtag.event('wechat_popup', {
                    category: GAEventCategories.Widget,
                  });
                }}
              >
                @点击有惊喜
              </a>
            </li>
            <li>
              Sifou:{' '}
              <ExternalLink href='https://segmentfault.com/u/itsuki0927'>
                @你要不要喝奶茶
              </ExternalLink>
            </li>
            <li>
              Juejin:{' '}
              <ExternalLink href='https://juejin.cn/user/2436173499466350'>
                @你要不要喝奶茶
              </ExternalLink>
            </li>
          </ul>
        </section>

        <h2>关于我的</h2>

        <section className='space-y-4'>
          <h3>一段简介</h3>
          <Description />
        </section>

        <section className='space-y-4'>
          <h3>几个爱好</h3>
          <HoobyList />
        </section>

        <section className='space-y-4'>
          <h3>一些经历</h3>
          <ExperienceList />
        </section>

        <section className='space-y-4'>
          <h3>一个博客</h3>
          <div className='space-y-6'>
            <BlogEntry
              body='前端: 基于 Next.js、React-Query、TailwindCss、Graphql 的 ISR 应用'
              url='https://github.com/itsuki0927/itsuki.cn'
              author='itsuki'
            />
            <BlogEntry
              body='后端: 基于 SpringBoot、SpringBootJPA、Mysql、Graphql 的后端应用'
              url='https://github.com/itsuki0927/itsuki-server.cn'
              author='itsuki'
            />
            <BlogEntry
              body='管理: 基本 React.js、Ant-Design-Pro、Pro-Components、Graphql 的 Web 应用'
              url='https://github.com/itsuki0927/itsuki-admin.cn'
              author='itsuki'
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutView;
