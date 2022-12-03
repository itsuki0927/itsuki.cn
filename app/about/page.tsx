import { getHotBlogs } from '@/api/blog';
import AboutView from '@/components/about';
import Layout from '@/components/common/Layout';
import MyImage from '@/components/common/MyImage';
import FooterBanner from '@/components/ui/FooterBanner';
import { SocialButtons2 } from '@/components/ui/SocialButton';
import Hero from '@/components/ui/Hero';
import AboutClient from '@/components/about/AboutClient';

export const dynamic = 'force-static';

const getEmploymentDays = () => {
  const startTime = new Date('06/20/2022');
  const ile = Date.now() - startTime.getTime();
  const days = Math.floor(ile / (1000 * 60 * 60 * 24));
  return days + 1;
};

const fetchData = async () => {
  const hotBlogs = await getHotBlogs();
  return { hotBlogs };
};

const AboutPage = async () => {
  const { hotBlogs } = await fetchData();
  const days = getEmploymentDays();

  return (
    <Layout footerTheme='reverse'>
      <AboutClient />

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
        <h1 className='mb-2 text-3xl font-medium tracking-tight text-gray-900 md:text-5xl'>
          五块木头
        </h1>
        <h2 className='text-lg text-gray-500'>
          Hi
          <span className='origin-[70% 70%] mx-1 inline-block animate-wave'>👋</span>,
          喜欢 code 和 run 的前端dog <span className='mx-1 text-gray-300'> / </span>{' '}
          字节跳动前端工程师 <span className='mx-1 text-gray-300'> / </span> (alway{' '}
          <span className='font-semibold'>{days}</span> day)
        </h2>

        <SocialButtons2 />
      </div>

      <AboutView hotBlogs={hotBlogs} />

      <FooterBanner theme='reverse' />
    </Layout>
  );
};

export default AboutPage;
