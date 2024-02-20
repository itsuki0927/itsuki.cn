import Image from 'next/image';
import bytedacne from '@/public/home/bytedance.png';
import netease from '@/public/home/netease.png';
import tencent from '@/public/home/tencent.png';
import React from 'react';
import HomeCard from './HomeCard';
import { Briefcase } from 'lucide-react';
import MyImage from '@/components/common/MyImage';

const EXPERIENCE_LIST = [
  {
    logo: bytedacne,
    post: '前端工程师',
    level: '正职',
    company: '字节跳动',
    startTime: '22/06',
    endTime: '至今',
    description: 'Creative Center: 关于创意的全站式服务...',
    techStack: ['React', 'Next.js', 'Typescript'],
  },
  {
    logo: netease,
    post: '前端工程师',
    level: '实习',
    company: '杭州网易',
    startTime: '22/03',
    endTime: '22/05',
    description: '永劫无间官网的双端项目以及游戏内嵌网页.',
    techStack: ['Vue2.0', 'Jquery', 'Css'],
  },
  {
    logo: tencent,
    post: '前端工程师',
    level: '实习',
    company: '长沙腾讯',
    startTime: '21/07',
    endTime: '21/09',
    description: '完成了一个简单的 crud 的后台管理系统.',
    techStack: ['Vue2.0', 'Vue-Element-Admin'],
  },
  {
    logo: 'https://spotlight.tailwindui.com/_next/static/media/planetaria.ecd81ade.svg',
    post: '前端工程师',
    level: '正职',
    company: '湖南中一网络',
    startTime: '20/06',
    endTime: '20/08',
    description: '实现了一个 Ant-Design3 的 ProTable .',
    techStack: ['React', 'Ant-Design3'],
  },
];

const Work = () => {
  return (
    <HomeCard
      title={
        <>
          <Briefcase size={20} />
          <span className="ml-2">走过的路</span>
        </>
      }
    >
      <ol className="space-y-4">
        {EXPERIENCE_LIST.map((experience) => (
          <li key={experience.company} className="flex gap-4">
            <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
              <MyImage
                alt={experience.company}
                width={32}
                height={32}
                className="h-8 w-8 rounded-full"
                src={experience.logo}
              />
            </div>
            <dl className="flex flex-auto flex-wrap gap-x-2">
              <dt className="sr-only">公司</dt>
              <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {experience.company}
              </dd>
              <dt className="sr-only">职位</dt>
              <dd className="text-xs text-zinc-500 dark:text-zinc-400">
                {experience.post} - {experience.level}
              </dd>
              <dt className="sr-only">日期</dt>
              <dd
                className="ml-auto text-xs text-zinc-500/80 dark:text-zinc-400/80"
                aria-label={`${experience.startTime} 到 ${experience.endTime}`}
              >
                <time dateTime={experience.startTime}>
                  {experience.startTime}
                </time>{' '}
                <span aria-hidden="true">—</span>{' '}
                <time dateTime={experience.endTime}>{experience.endTime}</time>
              </dd>
            </dl>
          </li>
        ))}
      </ol>
    </HomeCard>
  );
};

export default Work;
