import Link from 'next/link';
import { ReactNode } from 'react';
import { Layout } from '@/components/common';

const NotFound = () => (
  <div className='flex h-screen items-center justify-center'>
    <div className='flex flex-col items-center justify-center'>
      <div className='mx-auto flex max-w-2xl flex-col items-start justify-center'>
        <h1 className='mb-4 text-3xl font-medium tracking-tight md:text-5xl'>
          404 – Not Found
        </h1>
        <p className='mb-8'>
          它看起来很神秘，为什么还要展示一个通用的404呢？
          看来你找到了以前存在的东西，或者你拼写错了什么。
          我猜你拼写错了什么。你能再检查一下那个URL吗？
        </p>
        <Link href='/'>
          <span className='mx-auto w-64 cursor-pointer rounded-sm bg-gray-1 p-1 text-center font-bold opacity-70 transition-opacity hover:opacity-100 dark:text-white sm:p-4'>
            回到首页
          </span>
        </Link>
      </div>
    </div>
  </div>
);

NotFound.getLayout = (page: ReactNode) => (
  <Layout showSidebar={false} showFooter={false} showNavbar={false}>
    {page}
  </Layout>
);

export default NotFound;
