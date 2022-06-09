import { useRouter } from 'next/router';
import { WEB_URL } from '@/configs/app';

const ArticleMeta = () => {
  const router = useRouter();
  return (
    <div className='my-4 flex flex-col text-sm text-gray-1 sm:flex-row sm:items-center sm:justify-center'>
      <div>
        <span>永久地址: </span>
        <span className='underline'>{WEB_URL + router.asPath}</span>
      </div>

      <div className='mt-2 sm:ml-2 sm:mt-0'>
        <span>版权声明: </span>
        <a
          className='hover: no-underline transition-colors hover:text-basic'
          href='https://creativecommons.org/licenses/by-nc/3.0/cn/deed.zh'
          target='_blank'
          rel='external nofollow noopener noreferrer'
        >
          自由转载 - 署名 - 非商业使用
        </a>
      </div>
    </div>
  );
};

export default ArticleMeta;
