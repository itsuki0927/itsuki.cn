import { Suspense } from 'react';
import GuestbookForm from './components/GuestbookForm';
import GuestbookList from './components/GuestbookList';
import Title from '@/layouts/AppLayout/components/Title';
import { MessageSquareHeart } from 'lucide-react';

export const metadata = {
  title: '与你一句',
  description:
    '留下你的想法，我热衷于听到你的声音，并与你进行深入交流，不论是技术还是生活又或是其他事情都可以。',
};

const CommentCardSkeleton = () => (
  <div className="flex space-x-4">
    <div className="rounded-full bg-zinc-200 h-10 w-10"></div>
    <div className="flex-1 space-y-6 py-1">
      <div className="h-4 bg-zinc-200 rounded"></div>
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-4">
          <div className="h-4 bg-zinc-200 rounded col-span-2"></div>
          <div className="h-4 bg-zinc-200 rounded col-span-1"></div>
        </div>
        <div className="h-4 bg-zinc-200 rounded"></div>
      </div>
    </div>
  </div>
);

const GuestbookPage = () => {
  return (
    <section className="container">
      <Title
        title={
          <span className="flex items-center">
            <MessageSquareHeart size={40} className="mr-2" />
            与你一句
          </span>
        }
      >
        留下你的想法，我热衷于听到你的声音，并与你进行深入交流，不论是技术还是生活又或是其他事情都可以。
      </Title>

      <div className="max-w-3xl gap-8 flex flex-col">
        <Suspense
          fallback={
            <div className="mb-10 animate-pulse max-w-3xl">
              <div className="flex-1 h-24 mb-4 bg-zinc-200 rounded"></div>
              <div className="w-20 h-10 bg-zinc-200 rounded ml-auto"></div>
            </div>
          }
        >
          <GuestbookForm />
        </Suspense>
        <Suspense
          fallback={
            <div className="animate-pulse max-w-3xl flex-col space-y-4">
              <CommentCardSkeleton />
              <CommentCardSkeleton />
              <CommentCardSkeleton />
            </div>
          }
        >
          <GuestbookList />
        </Suspense>
      </div>
    </section>
  );
};

export default GuestbookPage;
