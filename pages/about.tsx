import { NextSeo } from 'next-seo';
import { dehydrate } from 'react-query';
import { getHotBlogs } from '@/api/blog';
import AboutView from '@/components/about';
import { Layout, MyImage } from '@/components/common';
import { createQueryClient } from '@/components/common/QueryClientContainer';
import FooterBanner from '@/components/ui/FooterBanner';
import SocialButton, { defaultSocials } from '@/components/ui/SocialButton';
import { GAEventCategories } from '@/constants/gtag';
import { blogKeys } from '@/constants/queryKeys';
import { TIMESTAMP } from '@/constants/value';
import { useMount } from '@/hooks';
import { gtag } from '@/utils/gtag';
import { Hero } from '@/components/ui';

const useEmploymentDays = () => {
  const startTime = new Date('06/20/2022');
  const ile = Date.now() - startTime.getTime();
  const days = Math.floor(ile / (1000 * 60 * 60 * 24));
  return days + 1;
};

export const getStaticProps = async () => {
  const queryClient = createQueryClient();

  await queryClient.prefetchQuery(blogKeys.hot(), () => getHotBlogs());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: TIMESTAMP.DAY / 1000,
  };
};

const AboutPage = () => {
  const days = useEmploymentDays();

  useMount(() => {
    gtag.event('about', {
      category: GAEventCategories.About,
    });
  });

  return (
    <Layout footerTheme='reverse'>
      <NextSeo title='关于' />

      <Hero>
        <Hero.BackgroundImage url='/about-banner.jpg' />
        <Hero.Container className='items-end'>
          <Hero.Title>关于</Hero.Title>
          <Hero.Description>
            我们不是平庸的在活着，我们从生下来的那一刻，就已经有了意义，而那意义就是，珍惜当下的每一刻
            <span className='mx-1'> - </span>
            <span className='text-lg text-gray-300'> 《心灵奇旅》</span>
          </Hero.Description>
        </Hero.Container>
      </Hero>

      <div className='container relative -mt-10 border-b border-dashed border-b-gray-300 pb-12 sm:-mt-16'>
        <div className='relative mb-8 w-[80px] rounded-full text-center sm:mb-2 sm:w-32'>
          <MyImage
            alt='itsuki0927'
            height={128}
            width={128}
            src='/avatar.jpeg'
            circle
            className='border-4 border-solid border-gray-100'
          />
        </div>
        <h1 className='mb-2 text-3xl font-medium tracking-tight text-dark-4 md:text-5xl'>
          五块木头
        </h1>
        <h2 className='text-lg text-gray-500'>
          Hi
          <span className='origin-[70% 70%] mx-1 inline-block animate-wave'>👋</span>,
          喜欢 code 和 run 的前端dog <span className='mx-1 text-gray-300'> / </span>{' '}
          字节跳动前端工程师 <span className='mx-1 text-gray-300'> / </span> (alway{' '}
          <span className='font-semibold'>{days}</span> day)
        </h2>

        <div className='flex flex-row flex-wrap '>
          {defaultSocials.map(social => (
            <SocialButton
              social={social}
              className='mr-4 mt-4 px-6 py-2'
              key={social.name}
            >
              {social.icon}
              <span className='capsize ml-2'>{social.name}</span>
            </SocialButton>
          ))}
        </div>
      </div>

      <AboutView />

      <FooterBanner theme='reverse' />
    </Layout>
  );
};

export default AboutPage;
