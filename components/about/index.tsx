import { NextSeo } from 'next-seo';
import { PropsWithChildren } from 'react';
import { MyImage } from '../common';
import Description from './Description';
import ExperienceList from './ExperienceList';
import HoobyList from './HoobyList';

const Title = ({ children }: PropsWithChildren<unknown>) => (
  <h3 className='text-2xl font-medium tracking-tight md:text-2xl'>{children}</h3>
);

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
        <p className='text-sm'>{author}</p>
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

const AboutView = () => (
  <div className='mx-auto w-3/4 tracking-wider'>
    <div className='space-y-16 p-6'>
      <NextSeo title='关于' />

      <section className='mt-16 flex flex-col-reverse items-start px-4 sm:flex-row'>
        <div className='flex flex-col pr-8'>
          <h1 className='mb-1 text-3xl font-medium tracking-tight dark:text-white md:text-5xl'>
            五木 - Itsuki
          </h1>
          <h2 className='mb-4'>
            字节跳动前端工程师
            <span className='font-semibold'>(待入职)</span>
          </h2>
          <p className='mb-16 text-lg'>
            Hi<span className='origin-[70% 70%] mx-1 inline-block animate-wave'>👋</span>,
            我是 五木, 英文名: itsuki, 喜欢 👨‍💻 和 🏃 的前端 🐶
          </p>
        </div>
        <div className='relative mb-8 w-[80px] text-center sm:mb-0 sm:w-[176px]'>
          <MyImage alt='itsuki0927' height={121} width={121} src='/avatar.jpeg' circle />
        </div>
      </section>

      <section className='space-y-4 px-4'>
        <Title>一段简介</Title>
        <Description />
      </section>

      <section className='space-y-4 px-4'>
        <Title>几个爱好</Title>
        <HoobyList />
      </section>

      <section className='space-y-4 px-4'>
        <Title>一些经历</Title>
        <ExperienceList />
      </section>

      <section className='space-y-4 px-4'>
        <Title>一个博客</Title>
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

export default AboutView;
