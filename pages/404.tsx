import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowLeft, ArrowRight, Edit2, MessageSquare } from 'react-feather';
import { Layout } from '@/components/common';
import { Container } from '@/components/ui';
import { GAEventCategories } from '@/constants/gtag';
import { useMount } from '@/hooks';
import { gtag } from '@/utils/gtag';

const NotFound = () => {
  const router = useRouter();
  useMount(() => {
    gtag.event('404', {
      category: GAEventCategories.NotFound,
    });
  });

  return (
    <Layout>
      <Container className='py-24'>
        <p className='mb-3 text-primary'>404 错误</p>
        <h1 className='mb-6 text-3xl font-medium tracking-tight text-gray-900 md:text-5xl'>
          找不到了
        </h1>
        <p className='mb-8 text-xl sm:max-w-3xl'>
          我也想找到这个路径的资源, 奈何它找不到呀~
        </p>
        <div className='flex items-center space-x-3'>
          <button
            type='button'
            onClick={() => {
              router.back();
            }}
            className='inline-flex cursor-pointer items-center rounded-md border border-solid border-gray-300 bg-white py-4 px-9 text-center text-lg font-bold tracking-widest text-gray-900 transition-all hover:bg-gray-50'
          >
            <ArrowLeft size={20} />
            <span>上一页</span>
          </button>
          <Link href='/'>
            <button
              type='button'
              className='inline-block cursor-pointer rounded-md border border-solid border-primary bg-primary py-4 px-9 text-center  text-lg font-bold tracking-widest text-white transition-all hover:bg-primary-hover dark:text-white'
            >
              回到首页
            </button>
          </Link>
        </div>
      </Container>

      <Container className='flex flex-col space-y-8 sm:flex-row sm:space-y-0 sm:space-x-8'>
        <div className='flex-grow bg-gray-50 p-6 sm:max-w-sm'>
          <div className='inline-block rounded-sm bg-primary p-2 text-white'>
            <Edit2 size={18} />
          </div>
          <div className='mt-12 text-xl text-gray-900'>文章</div>
          <div className='mt-2'>这里的每一篇文章, 都是我走过的路</div>
          <Link href='/blog'>
            <button
              type='button'
              className='mt-4 flex cursor-pointer items-center text-primary hover:text-primary-hover'
            >
              <span className='mr-2'>查看更多</span>
              <ArrowRight size={14} />
            </button>
          </Link>
        </div>

        <div className='flex-grow bg-gray-50 p-6 sm:max-w-sm'>
          <div className='inline-block rounded-sm bg-primary p-2 text-white'>
            <MessageSquare size={18} />
          </div>
          <div className='mt-12 text-xl text-gray-900'>留言</div>
          <div className='mt-2'>感谢你的留言</div>
          <Link href='/guestbook'>
            <button
              type='button'
              className='mt-4 flex cursor-pointer items-center text-primary hover:text-primary-hover'
            >
              <span className='mr-2'>查看更多</span>
              <ArrowRight size={14} />
            </button>
          </Link>
        </div>

        <div className='flex-grow bg-gray-50 p-6 sm:max-w-sm'>
          <div className='inline-block rounded-sm bg-primary p-2 text-white'>
            <Edit2 size={18} />
          </div>
          <div className='mt-12 text-xl text-gray-900'>关于</div>
          <div className='mt-2'>关于我, 关于你, 关于我们</div>
          <Link href='/about'>
            <button
              type='button'
              className='mt-4 flex cursor-pointer items-center text-primary hover:text-primary-hover'
            >
              <span className='mr-2'>查看更多</span>
              <ArrowRight size={14} />
            </button>
          </Link>
        </div>
      </Container>

      <div className='mt-24 bg-gray-50 p-6'>
        <Container>小装饰品</Container>
      </div>
    </Layout>
  );
};

export default NotFound;
