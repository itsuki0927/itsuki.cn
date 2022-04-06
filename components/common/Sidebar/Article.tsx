import { useRouter } from 'next/router';
import { EyeOutlined, HeartOutlined, MessageOutlined } from '@/components/icons';
import { useArticle } from '@/hooks/article';

const SidebarArticle = () => {
  const { query } = useRouter();
  const articleId = query.id;
  const { data } = useArticle(Number(articleId));

  return (
    <div className='flex justify-evenly bg-white p-4 text-[#777]'>
      <div className='hover:bg-red-400 cursor-pointer rounded-sm p-2 text-center text-sm tracking-wider transition-colors duration-300 hover:text-white'>
        <HeartOutlined className='block text-2xl' />
        <strong>{data?.liking}</strong> 人喜欢
      </div>
      <div className='hover:bg-blue-400 cursor-pointer rounded-sm p-2 text-center text-sm tracking-wider transition-colors duration-300 hover:text-white'>
        <MessageOutlined className='block text-2xl' />
        <strong>{data?.commenting}</strong> 人评论
      </div>
      <div className='hover:bg-green-400 cursor-pointer rounded-sm p-2 text-center text-sm tracking-wider transition-colors duration-300 hover:text-white'>
        <EyeOutlined className='block text-2xl' />
        <strong>{data?.reading}</strong> 人阅读
      </div>
    </div>
  );
};

export default SidebarArticle;
