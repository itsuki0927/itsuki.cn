import React, { ReactNode } from 'react';
import { Icon, SyncOutlined } from '../icons';

const hoobyList = [
  {
    title: '代码',
    description: (
      <>
        精通到入门, 入门到入坟
        <Icon className='ml-2' name='code' />
      </>
    ),
  },
  {
    title: '跑步',
    description: (
      <>
        纵使疾风起, 人生不言弃
        <Icon className='ml-2' name='run' />
      </>
    ),
  },
  {
    title: '电影',
    description: (
      <>
        豆瓣TOP 125/250
        <Icon className='ml-2' name='video' />
      </>
    ),
  },
  {
    title: '音乐',
    description: (
      <>
        网抑云10级用户
        <Icon className='ml-2' name='headset' />
      </>
    ),
  },
  {
    title: '奶茶',
    description: (
      <>
        古茗的杨枝甘露真好喝
        <Icon className='ml-2' name='rest' />
      </>
    ),
  },
  {
    title: '爱好',
    description: (
      <>
        绞尽脑汁, 暂且这些
        <SyncOutlined className='ml-2' />
      </>
    ),
  },
];

type HoobyProps = {
  title: string;
  description: ReactNode;
  index: number;
};

const HoobyCard = ({ title, description, index }: HoobyProps) => (
  <div className='w-full transform border-b border-dashed border-gray-1 py-3 transition-all hover:scale-[1.01]'>
    <div className='flex flex-col items-baseline justify-between sm:flex-row'>
      <div className='flex items-center'>
        <div className='mr-6 text-left text-gray-1'>{index}</div>
        <h4 className='my-0 w-full text-base font-normal text-basic'>{title}</h4>
      </div>
      <div className='mt-2 flex w-full items-center justify-between sm:mt-0 sm:w-auto'>
        <p className='my-0 mr-2 ml-9 w-64 text-sm text-gray-3 sm:ml-0 sm:text-right md:mb-0'>
          {description}
        </p>
      </div>
    </div>
  </div>
);

const HoobyList = () => (
  <div className=''>
    {hoobyList.map((hooby, index) => (
      <HoobyCard key={hooby.title} {...hooby} index={index + 1} />
    ))}
  </div>
);

export default HoobyList;
