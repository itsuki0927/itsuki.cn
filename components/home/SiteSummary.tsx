import { getSiteSummary } from '@/api/summary';
import PtnContainer from '@/components/ui/PtnContainer';

const SiteSummary = async () => {
  const siteSummary = await getSiteSummary();
  return (
    <PtnContainer className='mt-8 p-6'>
      <div className='mb-2 text-gray-500'>博客概览</div>
      <div className='flex flex-wrap '>
        <span className='mr-4 items-center'>
          <strong className='text-2xl text-gray-900'>{siteSummary?.blog}</strong>
          <span className='ml-2 text-sm text-gray-500'>篇博客</span>
        </span>
        <span className='mr-4 items-center '>
          <strong className='text-2xl text-gray-900'>{siteSummary?.tag}</strong>
          <span className='ml-2 text-sm text-gray-500'>个标签</span>
        </span>
        <span className='mr-4 items-center '>
          <strong className='text-2xl text-gray-900'>{siteSummary?.comment}</strong>
          <span className='ml-2 text-sm text-gray-500'>条评论</span>
        </span>
        <span className='mr-4 items-center '>
          <strong className='text-2xl text-gray-900'>
            {((siteSummary?.reading ?? 0) / 1000).toFixed(1)}k
          </strong>
          <span className='ml-2 text-sm text-gray-500'>次阅读</span>
        </span>
        <span className='mr-4 items-center '>
          <strong className='text-2xl text-gray-900'>{siteSummary?.guestbook}</strong>
          <span className='ml-2 text-sm text-gray-500'>条留言</span>
        </span>
      </div>
    </PtnContainer>
  );
};

export default SiteSummary;
