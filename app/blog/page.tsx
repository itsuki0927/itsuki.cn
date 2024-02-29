import { BlogCardSkeleton } from './components/BlogCard';
import Title from '@/layouts/AppLayout/components/Title';
import { Suspense } from 'react';
import BlogList from './components/BlogList';

export const metadata = {
  title: '文章',
  description:
    '以输出倒逼输入，通过写博客文章来分享技术知识，也希望能够帮助更多的人。主要写技术相关的话题，但也会涉及一些非技术的内容，比如跑步、工作、读书感悟和生活随笔等。',
};

const NotionPage = () => {
  return (
    <div className="container">
      <Title title="文章">
        以输出倒逼输入，通过写博客文章来分享技术知识，也希望能够帮助更多的人。主要写技术相关的话题，但也会涉及一些非技术的内容，比如跑步、工作、读书感悟和生活随笔等。
      </Title>

      <Suspense
        fallback={
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-7 mt-5 md:mt-7 ">
            <BlogCardSkeleton />
            <BlogCardSkeleton />
            <BlogCardSkeleton />
            <BlogCardSkeleton />
            <BlogCardSkeleton />
            <BlogCardSkeleton />
          </div>
        }
      >
        <BlogList />
      </Suspense>
    </div>
  );
};

export default NotionPage;
