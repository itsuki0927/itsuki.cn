import { MouseEvent } from 'react';
import toast from 'react-hot-toast';
import { Link2 } from 'react-feather';
import classNames from 'classnames';
import { dehydrate, QueryClient } from 'react-query';
import { NextSeo } from 'next-seo';
import AboutView from '@/components/about';
import { Layout, MyImage } from '@/components/common';
import { GAEventCategories } from '@/constants/gtag';
import { useMount } from '@/hooks';
import { gtag } from '@/utils/gtag';
import { GithubOutlined, WechatOutlined } from '@/components/icons';
import { useUI } from '@/components/ui/context';
import { articleKeys } from '@/constants/queryKeys';
import { getHotArticles } from '@/api/article';
import { copyTextToClipboard } from '@/hooks/useCopyToClipboard';

const useEmploymentDays = () => {
  const startTime = new Date('06/20/2022');
  const ile = Date.now() - startTime.getTime();
  const days = Math.floor(ile / (1000 * 60 * 60 * 24));
  return days + 1;
};

interface SocialItem {
  name: string;
  class: string;
  icon: JSX.Element | null;
  color: string;
  url?: string;
}
const socials: SocialItem[] = [
  {
    name: 'Website',
    class: 'website',
    icon: <Link2 size={16} className='mr-2' />,
    color: 'rgba(0, 136, 245, 0.8)',
  },
  {
    name: 'Github',
    class: 'github',
    icon: <GithubOutlined size={16} className='mr-2' />,
    color: 'rgba(39, 39, 42, 1)',
    url: 'https://github.com/itsuki0927',
  },
  {
    name: 'Wechat',
    class: 'wechat',
    icon: <WechatOutlined size={16} className='mr-2' />,
    color: 'rgba(85, 190, 105, 1)',
  },
  {
    name: 'Juejin',
    class: 'juejin',
    icon: null,
    color: 'rgba(31, 127, 255, 1)',
    url: 'https://juejin.cn/user/2436173499466350',
  },
  {
    name: 'Sifou',
    class: 'sifou',
    icon: null,
    color: 'rgba(0, 150, 94, 1)',
    url: 'https://segmentfault.com/u/itsuki0927',
  },
];

export const getStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(articleKeys.hot(), () => getHotArticles());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const AboutPage = () => {
  const days = useEmploymentDays();
  const { openPopup, setPopupView } = useUI();

  useMount(() => {
    gtag.event('about', {
      category: GAEventCategories.About,
    });
  });

  const handleSocialClick = (e: MouseEvent, social: SocialItem) => {
    if (social.name === 'Wechat') {
      e.preventDefault();
      setPopupView('WECHAT_VIEW');
      openPopup();
      gtag.event('wechat_popup', {
        category: GAEventCategories.Widget,
      });
    } else if (social.name === 'Website') {
      copyTextToClipboard('https://itsuki.cn');
      toast.success('🔗 链接复制成功, 快去分享给其他小伙伴吧~');
    } else {
      window.open(social.url);
    }
  };

  return (
    <Layout>
      <NextSeo title='关于' />

      <div className='relative max-h-72 overflow-hidden bg-gray-50 sm:max-h-[402px]'>
        <img
          src='/about-banner.jpg'
          className='max-h-[402px] w-full object-cover'
          alt='about banner'
        />
        <div className='container absolute top-0 bottom-0 right-0 left-0 flex h-[402px] w-full flex-col items-end justify-center'>
          <h1 className='mb-6 text-3xl font-medium tracking-tight text-gray-100 sm:text-5xl'>
            关于
          </h1>
          <p className='text-xl text-gray-200'>
            有时候幸福需要等一等
            <span className='mx-1'> - </span>
            <span className='text-lg text-gray-300'> 《幸福终点站》</span>
          </p>
        </div>
      </div>

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

        <div className='flex flex-row flex-wrap'>
          {socials.map(social => (
            <button
              aria-label={`share to ${social.name}`}
              type='button'
              className={classNames(
                'mr-4 mt-4 flex items-center rounded-sm px-6 py-[6px] text-sm text-white opacity-90 hover:opacity-100'
              )}
              style={{
                backgroundColor: social.color,
              }}
              onClick={e => handleSocialClick(e, social)}
            >
              {social.icon}
              {social.name}
            </button>
          ))}
        </div>
      </div>

      <AboutView />
    </Layout>
  );
};

export default AboutPage;
