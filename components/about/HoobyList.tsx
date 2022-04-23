import React, { cloneElement, ReactNode } from 'react';
import {
  CodeSvg,
  HeadsetSvg,
  MilkteaSvg,
  MovieSvg,
  ReloadSvg,
  RunSvg,
} from '@/components/svgs';

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
    description: '网抑云10级用户 🎧',
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

type HoobyProps = {
  title: string;
  description: string;
  icon: ReactNode;
};

const HoobyCard = ({ title, description, icon }: HoobyProps) => (
  <div className='bg-transparent tracking-wider'>
    <div className='my-2'>
      {cloneElement(icon as any, {
        className: 'inline-block align-top mr-1',
      })}
      <h5 className='inline-block text-base font-medium'>{title}</h5>
    </div>

    <span className='text-gray-3 dark:text-gray-3--dark'>{description}</span>
  </div>
);

const HoobyList = () => (
  <div className='grid grid-cols-3 gap-4 overflow-hidden'>
    {hoobyList.map(hooby => (
      <HoobyCard key={hooby.title} {...hooby} />
    ))}
  </div>
);

export default HoobyList;
