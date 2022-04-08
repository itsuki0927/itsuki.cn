import { NextSeo } from 'next-seo';
import Image from 'next/image';
import React, { cloneElement, ReactNode } from 'react';
import {
  CodeSvg,
  HeadsetSvg,
  MilkteaSvg,
  MovieSvg,
  ReloadSvg,
  RunSvg,
} from '@/components/svgs';
import styles from './style.module.scss';

type HoobyProps = {
  title: string;
  description: string;
  icon: ReactNode;
};

const HoobyCard = ({ title, description, icon }: HoobyProps) => (
  <div className='bg-white p-3 tracking-wider'>
    <div className='my-2'>
      {cloneElement(icon as any, {
        className: 'inline-block align-top mr-1',
      })}
      <h5 className='inline-block text-base font-medium'>{title}</h5>
    </div>

    <span className='text-gray-3'>{description}</span>
  </div>
);

const hoobyList = [
  {
    title: '代码',
    icon: <CodeSvg width={24} height={24} />,
    description: '从精通到入门: Code 👨‍💻',
  },
  {
    title: '跑步',
    icon: <RunSvg width={24} height={24} />,
    description: '纵使疾风起, 人生不言弃 🏃',
  },
  {
    title: '电影',
    icon: <MovieSvg width={24} height={24} />,
    description: '豆瓣TOP125, 继续加油 🎬',
  },
  {
    title: '音乐',
    icon: <HeadsetSvg width={24} height={24} />,
    description: '网抑云10级, 音乐是另一个世界 🎧',
  },
  {
    title: '奶茶',
    icon: <MilkteaSvg width={24} height={24} />,
    description: '嘿, 你要不要喝奶茶?🥤',
  },
  {
    title: '爱好',
    icon: <ReloadSvg width={24} height={24} />,
    description: '绞尽脑汁, 后面再补 🔚',
  },
];

const AboutView = () => (
  <div>
    <div className='bg-white p-6'>
      <NextSeo title='关于' />
      <header className='mt-2 mb-7 text-center'>
        <h1 className='text-base tracking-widest'>关于</h1>
      </header>

      <div className='text-center'>
        <Image src='/about.png' width={670} height={407} />
        <p className='text-xs text-gray-3'>(一张装饰图)</p>
        <h1 className='my-12 text-3xl text-dark-2'>
          Hi<span className={`${styles.wave} mx-1`}>👋</span>, 我是
          <strong>五木</strong>, 英文名: itsuki, 喜欢 👨‍💻 和 🏃 的前端 🐶
          {/* <p>准网易雷火前端工程师</p> */}
        </h1>
      </div>

      <section className='tracking-wider'>
        <h3 className='mt-10 mb-4 text-center text-xl font-medium tracking-wider'>
          一段简介
        </h3>
        <p className='px-4'>
          <strong>代码:</strong> 大学生活有五年, 大专生三年+本科两年,
          在大专生时加入了学校打比赛的协会, 参加了"蓝桥杯"比赛,
          在那里锻炼了算法以及学习能力, 后面因个人原因没有留在协会,
          在协会时知道自己算法能力不是很强, 选择了对算法要求没那么高的前端,
          那个时候Vue比较火, 就开始前端之路.
        </p>

        <p className='px-4'>
          <strong>跑步:</strong> 跑步是在无意之间接触到的, 当时想着跑步可以提升精气神,
          每天学累了就去跑跑步放松一下, 结果没想到上瘾了, 从三公里-{'>'}五公里-{'>'}
          十公里-{'>'}半马-{'>'}全马. 到本科学院因为跑步结识了现在的朋友,
          现在每天5.20公里, 不管刮风还是下雨 , 或许这就是跑步人的浪漫吧❤️❤️ .
        </p>
      </section>

      <section>
        <h3 className='mt-10 mb-4 text-center text-xl font-medium tracking-wider'>
          一些爱好
        </h3>
        <div className='grid grid-cols-3 gap-4 overflow-hidden'>
          {hoobyList.map(hooby => (
            <HoobyCard key={hooby.title} {...hooby} />
          ))}
        </div>
      </section>
    </div>

    <div className='mt-6 bg-white p-5 tracking-widest'>
      <strong className='font-light text-gray-2'>
        一个应用要写好太难了, 即使是博客!!!
      </strong>
    </div>
  </div>
);

export default AboutView;
