export const BlogSkeletonCard = () => (
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

interface BlogSkeletonListProps {
  count?: number;
}

export const BlogSkeletonList = ({ count = 6 }: BlogSkeletonListProps) => (
  <div className='space-y-6'>
    {Array.from({ length: count }, (_, i) => (
      <BlogSkeletonCard key={i} />
    ))}
  </div>
);

export const BlogSkeleton = () => (
  <div className='mx-auto w-full rounded-sm bg-white p-4'>
    <div className='flex animate-pulse flex-col items-center space-y-4'>
      <div className='my-1 h-6 w-[60%] rounded-sm bg-skeleton' />
      <div className='flex justify-center space-x-4'>
        <div className='h-3 w-10 rounded-sm bg-skeleton' />
        <div className='h-3 w-10 rounded-sm bg-skeleton' />
        <div className='h-3 w-10 rounded-sm bg-skeleton' />
      </div>
      <div className='h-3 w-[40%] rounded-sm bg-skeleton' />
      <div className='h-36 w-full rounded-sm bg-skeleton' />

      <div className='w-full space-y-4'>
        <div className='h-5 rounded-sm bg-skeleton' />
        <div className='ml-[10%] h-5 max-w-[80%] rounded-sm bg-skeleton' />
        <div className='ml-[10%] h-5 max-w-[70%] rounded-sm bg-skeleton' />
      </div>

      <div className='w-full space-y-4'>
        <div className='h-5 rounded-sm bg-skeleton' />
        <div className='ml-[10%] h-5 max-w-[80%] rounded-sm bg-skeleton' />
        <div className='ml-[10%] h-5 max-w-[70%] rounded-sm bg-skeleton' />
      </div>

      <div className='h-9 w-28 rounded-sm bg-skeleton' />
    </div>
  </div>
);
