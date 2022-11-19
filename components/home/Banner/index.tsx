import Link from 'next/link';
import MyImage from '@/components/common/MyImage';
import HomeSlider from '../HomeSlider';
import Container from '@/components/ui/Container';
import PtnContainer from '@/components/ui/PtnContainer';
import { SocialButtons } from '@/components/ui/SocialButton';
import { HomePageProps } from '@/app/page';

/* console.log('defaultSocials:', defaultSocials); */
const HomeBanner = ({
  bannerBlogs,
  siteSummary,
}: Pick<HomePageProps, 'bannerBlogs' | 'siteSummary'>) => {
  return (
    <Container className='flex flex-col space-y-8 pt-8 sm:flex-row sm:space-y-0 sm:space-x-8'>
      <HomeSlider blogs={bannerBlogs?.data} />

      <div className='flex flex-col justify-between sm:mt-0 sm:w-1/3'>
        <div className='bg-gray-50 p-6'>
          <div className='flex justify-between pb-3'>
            <div>
              <div className='text-gray-500'>要做一个很酷的人</div>
              <div className='text-2xl text-gray-900'>
                你好, 我是
                <Link href='/about'>
                  <span className='ml-1 cursor-pointer font-semibold text-primary transition-colors hover:text-primary-hover'>
                    五块木头
                  </span>
                </Link>
              </div>
            </div>

            <MyImage alt='avatar' src='/avatar.jpeg' width={60} height={60} circle />
          </div>

          <SocialButtons />
        </div>

        <PtnContainer className='mt-8 p-6'>
          <div className='mb-2 text-gray-500'>博客概览</div>
          <div className='flex flex-wrap '>
            <span className='mr-4 items-center'>
              <strong className='text-2xl text-gray-900'>{siteSummary?.blog}</strong>
              <span className='ml-2 text-sm text-gray-500'>篇博客</span>
            </span>
            <span className='mr-4 items-center '>
              <strong className='text-2xl text-gray-900'>{siteSummary?.tag}</strong>
              <span className='ml-2 text-sm text-gray-500'>个标签</span>
            </span>
            <span className='mr-4 items-center '>
              <strong className='text-2xl text-gray-900'>{siteSummary?.comment}</strong>
              <span className='ml-2 text-sm text-gray-500'>条评论</span>
            </span>
            <span className='mr-4 items-center '>
              <strong className='text-2xl text-gray-900'>
                {((siteSummary?.reading ?? 0) / 1000).toFixed(1)}k
              </strong>
              <span className='ml-2 text-sm text-gray-500'>次阅读</span>
            </span>
            <span className='mr-4 items-center '>
              <strong className='text-2xl text-gray-900'>{siteSummary?.guestbook}</strong>
              <span className='ml-2 text-sm text-gray-500'>条留言</span>
            </span>
          </div>
        </PtnContainer>
      </div>
    </Container>
  );
};

export default HomeBanner;
