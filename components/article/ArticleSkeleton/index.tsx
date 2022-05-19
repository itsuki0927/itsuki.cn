export const ArticleSkeletonCard = () => (
  <div className='mx-auto w-full rounded-sm bg-white p-4'>
    <div className='flex animate-pulse space-x-4'>
      <div className='h-[200px] w-[286px] rounded-sm bg-skeleton' />
      <div className='flex flex-1 flex-col py-1'>
        <div className='my-1 h-4 max-w-[20%] rounded-sm bg-skeleton' />
        <div className='my-2 h-6 rounded-sm bg-skeleton' />
        <div className='flex-grow'>
          <div className='my-2 h-5 max-w-[60%] rounded-sm bg-skeleton' />
        </div>
        <div className='my-2 h-8 w-32 rounded-sm bg-skeleton' />
        <div className='h-3 max-w-[45%] rounded-sm bg-skeleton' />
      </div>
    </div>
  </div>
);

const ArticleSkeletonList = () => (
  <div className='space-y-6'>
    {Array.from({ length: 6 }, (_, i) => (
      <ArticleSkeletonCard key={i} />
    ))}
  </div>
);

export default ArticleSkeletonList;
