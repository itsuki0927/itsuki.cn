import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { GAEventCategories } from '@/constants/gtag';
import { gtag } from '@/utils/gtag';
import { MyImage } from '../common';
import { useUI } from '../ui/context';
import Description from './Description';
import ExperienceList from './ExperienceList';
import HoobyList from './HoobyList';

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
        <a
          href={url}
          className='text-sm text-gray-3 transition-colors hover:text-dark-2'
          target='_blank'
          rel='noreferrer'
        >
          Github
        </a>
      </div>
    </div>
  );
}

const AboutView = () => {
  const { openPopup, setPopupView } = useUI();
  return (
    <div className='mx-auto w-3/4 tracking-wider'>
      <div className='p-6'>
        <NextSeo title='关于' />

        <section className='mt-16 flex flex-col-reverse items-start px-4 sm:flex-row'>
          <div className='flex flex-col pr-8'>
            <h1 className='mb-1 text-3xl font-medium tracking-tight text-dark-4 md:text-5xl'>
              五木 - Itsuki
            </h1>
            <h2 className='mb-4'>
              字节跳动前端工程师
              <span className='font-semibold'>(待入职)</span>
            </h2>
            <p className='mb-16 text-lg'>
              Hi
              <span className='origin-[70% 70%] mx-1 inline-block animate-wave'>👋</span>,
              我是 五木, 喜欢 code 和 run 的前端dog
            </p>
          </div>
          <div className='relative mb-8 w-[80px] text-center sm:mb-0 sm:w-[176px]'>
            <MyImage
              alt='itsuki0927'
              height={121}
              width={121}
              src='/avatar.jpeg'
              circle
            />
          </div>
        </section>

        <div className='prose max-w-full px-4'>
          <section className='space-y-4'>
            <h2>一堆链接</h2>
            <ul>
              <li>
                GitHub:{' '}
                <a href='https://github.com/itsuki0927' target='_blank' rel='noreferrer'>
                  @itsuki0927
                </a>
              </li>
              <li>
                Website: <Link href='https://itsuki.cn'>https://itsuki.cn</Link>
              </li>
              <li>
                Wechat: {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a
                  href='#'
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
                <a
                  href='https://segmentfault.com/u/itsuki0927'
                  target='_blank'
                  rel='noreferrer'
                >
                  @你要不要喝奶茶
                </a>
              </li>
              <li>
                Juejin:{' '}
                <a
                  href='https://juejin.cn/user/2436173499466350'
                  target='_blank'
                  rel='noreferrer'
                >
                  @你要不要喝奶茶
                </a>
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
    </div>
  );
};

export default AboutView;
