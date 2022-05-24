export const CommentCardSkeleton = () => (
  <div className='flex animate-pulse space-x-6'>
    <div className='h-14 w-14 rounded-full bg-skeleton' />
    <div className='flex-1 space-y-2'>
      <div className='h-4 rounded-sm bg-skeleton' />
      <div className='ml-[5%] h-4 max-w-[90%] rounded-sm bg-skeleton' />
      <div className='ml-[5%] h-4 max-w-[90%] rounded-sm bg-skeleton' />
      <div className='h-4 rounded-sm bg-skeleton' />
    </div>
  </div>
);

interface CommentSkeletonListProps {
  count?: number;
}

export const CommentListSkeleton = ({ count = 4 }: CommentSkeletonListProps) => (
  <div className='space-y-8 bg-white p-6'>
    {Array.from({ length: count }, (_, i) => (
      <CommentCardSkeleton key={i} />
    ))}
  </div>
);

export const CommentFormSkeletion = () => (
  <div className='m-full rounded-sm bg-white p-6'>
    <div className='flex animate-pulse space-x-6 '>
      <div className='h-14 w-14 rounded-full bg-skeleton' />
      <div className='flex-grow flex-col space-y-4'>
        <div className='flex flex-grow space-x-4'>
          <div className='h-8 flex-grow rounded-sm bg-skeleton' />
          <div className='h-8 flex-grow rounded-sm bg-skeleton' />
          <div className='h-8 flex-grow rounded-sm bg-skeleton' />
        </div>
        <div className='h-24 rounded-sm bg-skeleton' />
        <div className='float-right h-8 w-[20%] rounded-sm bg-skeleton' />
      </div>
    </div>
  </div>
);
