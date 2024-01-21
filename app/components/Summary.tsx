import { getSummary } from '@/actions/home';
import React from 'react';
import HomeCard from './HomeCard';
import { PieChart } from 'lucide-react';
import { TOTAL_PAGEVIEWS_BASELINE } from '@/constants/app';

interface Summary {
  count: number;
  label: string;
}

const getSummaryForRender = async () => {
  const summary = await getSummary();

  return [
    {
      count: summary.onlineDays,
      label: '天前上线',
    },
    {
      count: (
        <>
          {summary.viewCount}
          <span className="text-sm">
            {summary.viewCount < TOTAL_PAGEVIEWS_BASELINE ? '😭' : '😄'}
          </span>
        </>
      ),
      label: '个浏览',
    },
    {
      count: summary.blogCount,
      label: '篇文章',
    },
    {
      count: summary.commentCount,
      label: '条评论',
    },
  ];
};

const Summary = async () => {
  const list = await getSummaryForRender();
  return (
    <HomeCard
      title={
        <>
          <PieChart size={20} />
          <span className="ml-2">关于本站</span>
        </>
      }
    >
      <ol className="gap-4 flex flex-wrap">
        {list.map((item) => (
          <li key={item.label} className="flex items-center">
            <strong className="text-4xl">{item.count}</strong>
            <span className="text-sm text-zinc-500 ml-2">{item.label}</span>
          </li>
        ))}
      </ol>
    </HomeCard>
  );
};

export default Summary;
