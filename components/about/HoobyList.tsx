import React, { ReactNode } from 'react';
import { Code, Headphones, Sun, Video } from 'react-feather';
import { Icon } from '../icons';

const hoobyList = [
  {
    title: '代码',
    description: '精通到入门, 入门到入坟',
    icon: <Code className='ml-2' size='16' />,
  },
  {
    title: '跑步',
    description: '纵使疾风起, 人生不言弃',
    icon: <Icon className='ml-2' name='run' />,
  },
  {
    title: '电影',
    description: '豆瓣TOP 125/250',
    icon: <Video className='ml-2' size='16' />,
  },
  {
    title: '音乐',
    description: '网抑云10级用户',
    icon: <Headphones className='ml-2' size='16' />,
  },
  {
    title: '奶茶',
    description: '古茗的杨枝甘露真好喝',
    icon: <Icon className='ml-2' name='rest' />,
  },
  {
    title: '爱好',
    description: '绞尽脑汁, 暂且这些',
    icon: <Sun className='ml-2' size='16' />,
  },
];

type HoobyProps = {
  title: string;
  description: string;
  icon: ReactNode;
  index: number;
};

const HoobyCard = ({ title, description, index, icon }: HoobyProps) => (
  <div className='transform border-b border-dashed border-gray-300 py-3 transition-all hover:scale-[1.01]'>
    <div className='flex flex-col justify-between sm:flex-row sm:items-center'>
      <div className='flex items-center'>
        <div className='mr-6 text-left text-gray-300'>{index}</div>
        <h4 className='my-0 w-full text-base font-normal text-basic'>{title}</h4>
      </div>
      <div className='mt-2 flex w-full items-center justify-between sm:mt-0 sm:w-auto'>
        <p className='my-0 mr-2 ml-9 w-64 text-sm text-gray-500 sm:ml-0 sm:text-right md:mb-0'>
          {description}
        </p>
        {icon}
      </div>
    </div>
  </div>
);

const HoobyList = () => (
  <div className='mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2'>
    {hoobyList.map((hooby, index) => (
      <HoobyCard key={hooby.title} {...hooby} index={index + 1} />
    ))}
  </div>
);

export default HoobyList;
