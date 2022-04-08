import { NextSeo } from 'next-seo';
import Image from 'next/image';
import React, { ReactNode } from 'react';
import imageTransformer from '@/utils/image';
import {
  CodeSvg,
  Css3Svg,
  GithubSvg,
  HeadsetSvg,
  Html5Svg,
  JsSvg,
  JuejinSvg,
  MilkteaSvg,
  MovieSvg,
  ReactSvg,
  ReloadSvg,
  RunSvg,
  SifouSvg,
  VimSvg,
  VueSvg,
} from '@/components/svgs';

const list = [
  <JsSvg width={50} height={50} />,
  <Css3Svg width={50} height={50} />,
  <Html5Svg width={50} height={50} />,
  <ReactSvg width={50} height={50} />,
  <VueSvg width={50} height={50} />,
  <VimSvg width={50} height={50} />,
];

const personProfile = [
  {
    label: 'Github',
    value: (
      <a
        rel='external nofollow noopener noreferrer'
        target='_blank'
        href='https://github.com/itsuki0927'
        className='inline-block rounded-sm bg-[#262626] py-1 px-3 text-sm text-white opacity-80 transition-all hover:opacity-100'
      >
        <GithubSvg className='mr-1 inline align-text-top' width={16} height={16} />
        Github
      </a>
    ),
  },
  {
    label: '掘金',
    value: (
      <a
        rel='external nofollow noopener noreferrer'
        target='_blank'
        href='https://juejin.cn/user/2436173499466350'
        className='inline-block rounded-sm bg-[#1e80ff] py-1 px-3 text-sm text-white opacity-80 transition-all hover:opacity-100'
      >
        <JuejinSvg className='mr-1 inline align-text-top' width={16} height={16} />
        掘金
      </a>
    ),
  },
  {
    label: '思否',
    value: (
      <a
        rel='external nofollow noopener noreferrer'
        target='_blank'
        href='https://segmentfault.com/u/itsuki0927'
        className='inline-block rounded-sm bg-[#00975e] py-1 px-3 text-sm text-white opacity-80 transition-all hover:opacity-100'
      >
        <SifouSvg className='mr-1 inline align-text-top' width={16} height={16} />
        思否
      </a>
    ),
  },
];

type HoobyProps = {
  title: string;
  description: string;
  icon: ReactNode;
};

const HoobyCard = ({ title, description, icon }: HoobyProps) => (
  <div className='bg-white p-6'>
    {icon}
    <h3 className='mt-3 mb-2 text-lg font-bold'>{title}</h3>

    <span>{description}</span>
  </div>
);

const hoobyList = [
  {
    title: '代码',
    icon: <CodeSvg width={36} height={36} />,
    description: '从精通到入门: Code 👨‍💻',
  },
  {
    title: '跑步',
    icon: <RunSvg width={36} height={36} />,
    description: '《强风吹拂》: 纵使疾风起, 人生不言弃 🏃',
  },
  {
    title: '电影',
    icon: <MovieSvg width={36} height={36} />,
    description: '豆瓣 Top250 部看了一半了, 继续加油 🎬',
  },
  {
    title: '音乐',
    icon: <HeadsetSvg width={36} height={36} />,
    description: '网抑云10级, 音乐是我的另一个世界 🎧',
  },
  {
    title: '奶茶',
    icon: <MilkteaSvg width={36} height={36} />,
    description: '嘿, 你要不要喝奶茶?🥤',
  },
  {
    title: '爱好',
    icon: <ReloadSvg width={36} height={36} />,
    description: '绞尽脑汁, 发现只有这么几个爱好, 后面想起来再补, 🔚',
  },
];

const AboutView = () => (
  <div className='space-y-12'>
    <NextSeo title='关于' />
    <div className='my-12 flex items-center justify-around'>
      <h1 className='text-gray-600 text-3xl'>
        Hi, 我是<strong className='text-blue-500'>五木</strong>, 英文名: itsuki,
        一名大四学生
        <p>准网易雷火前端工程师</p>
      </h1>

      <div className='rounded-sm bg-white p-4 opacity-80 transition-opacity hover:opacity-100'>
        <Image
          loader={imageTransformer}
          src='https://static.itsuki.cn/avatar1.jpg'
          width={280}
          height={280}
        />
      </div>
    </div>

    <section>
      <h2 className='mb-4 text-2xl'>Why</h2>
      <div className='bg-white p-6'>
        <div className='mb-6'>
          <h3 className='text-gray-700 text-lg'>为什么是五木?</h3>
          <p>
            真名是 *森林 , 其实叫木木木木木好像更贴切一点, 但是两个字比五个字
            <strong className='text-gray-700'>简短</strong>多了.
          </p>
        </div>
        <h3 className='text-gray-700 text-lg'>为什么英文名是 itsuki ?</h3>
        <p>
          之前一直叫 fivewoods , 中文式英语, 懂得都懂, 有一次在大学计算机英语课上,
          老师要我们做一个英文的自我介绍,
          当时借用了一下同学的手机用谷歌翻译了一下五木的英文, 翻译过来就是 itsuki ,
          然后就从 fivewoods -{`>`} itsuki, 一直用到了现在.
        </p>
      </div>
    </section>

    <section>
      <h2 className='mb-4 text-2xl'>简介</h2>
      <div className='flex space-x-4'>
        <div className='flex-shrink bg-white p-6'>
          <p>
            一名<strong>爱写代码</strong>和<strong>跑步</strong>的大四学生.
            大学生活有五年, 大专生三年+本科两年, 在大专生时加入了学校打比赛的协会,
            参加了"蓝桥杯"比赛, 在那里锻炼了算法以及学习能力, 后面因个人原因没有留在协会,
            在协会时知道自己算法能力不是很强, 选择了对算法要求没那么高的前端,
            那个时候Vue比较火, 就开始前端之路.
          </p>

          <p className='mb-0'>
            跑步是在无意之间接触到的, 当时想着跑步可以提升精气神,
            每天学累了就去跑跑步放松一下, 结果没想到上瘾了, 从三公里-{'>'}五公里-{'>'}
            十公里-{'>'}半马-{'>'}全马. 到本科学院因为跑步结识了现在的朋友,
            现在每天5.20公里, 不管刮风还是下雨 , 或许这就是跑步人的浪漫吧❤️❤️ .
          </p>
        </div>

        <div className='flex-shrink-0 bg-white p-4'>
          <Image
            loader={imageTransformer}
            src='https://static.itsuki.cn/app/wechat.jpeg'
            width={180}
            height={180}
            objectFit='cover'
          />
        </div>
      </div>
    </section>

    <section>
      <h2 className='mb-4 text-2xl'>其他</h2>
      <div className='flex space-x-6'>
        <div className='flex w-[450px] items-center justify-around bg-white p-3'>
          <h3 className='flex-shrink'>社区</h3>
          {personProfile.map(item => (
            <div>{item.value}</div>
          ))}
        </div>

        <div className='flex flex-1 items-center justify-around bg-white p-3'>
          <h3>技能</h3>
          {list.map(item => (
            <>{item}</>
          ))}
        </div>
      </div>
    </section>
    <section>
      <h2 className='mb-4 text-2xl'>爱好</h2>
      <div className='grid grid-cols-2 gap-6 overflow-hidden'>
        {hoobyList.map(hooby => (
          <HoobyCard key={hooby.title} {...hooby} />
        ))}
      </div>
    </section>

    <section>
      <h2 className='mb-4 text-2xl'>感慨</h2>
      <div className='bg-white p-6 '>
        <strong>一个应用要写好太难了, 即使是博客!!!</strong>
      </div>
    </section>
  </div>
);

export default AboutView;
