import React, { ReactNode } from 'react';
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
    description: '精通到入门, 入门到入坟 👨‍💻',
  },
  {
    title: '跑步',
    icon: <RunSvg width={24} height={24} />,
    description: '纵使疾风起, 人生不言弃 🏃',
  },
  {
    title: '电影',
    icon: <MovieSvg width={24} height={24} />,
    description: '豆瓣TOP 125/250 🎬',
  },
  {
    title: '音乐',
    icon: <HeadsetSvg width={24} height={24} />,
    description: '网抑云10级用户 🎧',
  },
  {
    title: '奶茶',
    icon: <MilkteaSvg width={24} height={24} />,
    description: '古茗的杨枝甘露真好喝 🥤',
  },
  {
    title: '爱好',
    icon: <ReloadSvg width={24} height={24} />,
    description: '绞尽脑汁, 暂且这些 🔚',
  },
];

type HoobyProps = {
  title: string;
  description: string;
  icon: ReactNode;
};

const HoobyCard = ({ title, description, icon }: HoobyProps) => (
  <div>
    <div className='my-2 flex items-center space-x-2'>
      {icon}
      <h5 className='capsize font-medium'>{title}</h5>
    </div>

    <span className='text-sm text-gray-3'>{description}</span>
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
