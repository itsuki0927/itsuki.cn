import classNames from 'classnames';
import Link from 'next/link';
import { useHotBlogs } from '@/hooks/blog';
import { getBlogDetailRoute } from '@/utils/url';
import { MyImage } from '../common';
import ExperienceList from './ExperienceList';
import HoobyList from './HoobyList';
import ProjectList from './ProjectList';
import ToolList from './ToolList';
import { StandardProps } from '@/types/common';
import { Container } from '@/components/ui';

const Title = ({ children, className = '', style }: StandardProps) => (
  <h2 className={classNames('text-4xl text-gray-900', className)} style={style}>
    {children}
  </h2>
);

const Description = ({ children, className = '', style }: StandardProps) => (
  <p className={classNames('mt-5 text-xl text-gray-600', className)} style={style}>
    {children}
  </p>
);

const AboutCard = ({ children, className, style }: StandardProps) => (
  <section className={className} style={style}>
    <Container className='py-12'>{children}</Container>
  </section>
);

const AboutView = () => {
  const { data } = useHotBlogs();

  return (
    <div className='mx-auto max-w-full tracking-wider'>
      <section className='container py-12'>
        <h2 className='text-4xl text-gray-900'>一段简介</h2>
        <p className='mt-5 text-xl text-gray-600'>慢慢来, 给自己一点时间成长</p>
        <div className='mt-8 flex flex-col space-y-4 sm:flex-row sm:space-y-0'>
          <p>
            <strong className='mr-1'>Code: </strong> 大学生活有五年, 大专三年+本科两年,
            在大专生时加入了学校打比赛的协会, 参加了"蓝桥杯"比赛,
            在那里锻炼了算法以及学习能力, 后面因个人原因没有留在协会,
            在协会时知道自己算法能力不是很强, 选择了对算法要求没那么高的前端, 那个时候 Vue
            比较火, 就开始前端之路.
          </p>

          <p>
            <strong className='mr-1'>Run: </strong> 跑步是在无意之间接触到的,
            当时想着跑步可以提升精气神, 每天学累了就去跑跑步放松一下, 结果没想到上瘾了,
            从三公里-{'>'}五公里-{'>'}
            十公里-{'>'}半马-{'>'}全马. 到本科学院因为跑步结识了现在的朋友, 现在每天 5.20
            公里, 不管刮风还是下雨 , 或许这就是跑步人的浪漫吧❤️❤️ .
          </p>
        </div>
      </section>

      <AboutCard className='bg-gray-50'>
        <Title>几个爱好</Title>
        <Description>没有销声匿迹, 我在热爱生活</Description>
        <HoobyList />
      </AboutCard>

      <AboutCard>
        <Title>几段经历</Title>
        <Description>要相信, 一切都会越来越好</Description>
        <ExperienceList />
      </AboutCard>

      <AboutCard className='bg-gray-50'>
        <Title>二三项目</Title>
        <Description>再小的努力, 坚持都会变得很伟大</Description>
        <ProjectList />
      </AboutCard>

      <AboutCard>
        <Title>几个工具</Title>
        <Description>工欲善其事, 必先利其器</Description>
        <ToolList />
      </AboutCard>

      <AboutCard className='bg-gray-50'>
        <div className='flex items-start justify-between'>
          <div>
            <Title>初来博客?</Title>
            <Description>如果可以, 请好好拥抱这个世界</Description>
            <img
              src='/love.jpg'
              className='mt-4 block object-cover sm:hidden'
              alt='mobile love img'
            />
            <div className='mt-8 flex flex-col space-y-2'>
              {data?.data.map((blog, index) => (
                <Link href={getBlogDetailRoute(blog.path)}>
                  <span className='cursor-pointer transition-colors hover:text-primary'>
                    {index + 1}. {blog.title}
                  </span>
                </Link>
              ))}
            </div>

            <button
              type='button'
              className='mt-4 rounded-sm bg-primary px-9 py-2 text-white opacity-80 transition-opacity hover:opacity-100'
            >
              <Link href='/blog'>查看更多</Link>
            </button>
          </div>

          <div className='hidden sm:block'>
            <MyImage
              src='/love.jpg'
              width={392}
              height={262}
              className='max-h-[262px] max-w-[601px] object-cover'
              alt='pc love img'
            />
          </div>
        </div>
      </AboutCard>
    </div>
  );
};

export default AboutView;
