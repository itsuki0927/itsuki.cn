import { useRouter } from 'next/router';
import { WEB_URL } from '@/configs/app';
import { ExternalLink } from '@/components/common';

const ArticleMeta = () => {
  const router = useRouter();
  return (
    <div className='my-4 flex flex-col text-sm text-gray-2 sm:flex-row sm:items-center sm:justify-center'>
      <div>
        <span>永久地址: </span>
        <span className='underline'>{WEB_URL + router.asPath}</span>
      </div>

      <div className='mt-2 sm:ml-2 sm:mt-0'>
        <span>版权声明: </span>
        <ExternalLink
          className='no-underline transition-colors hover:text-basic hover:underline'
          href='https://creativecommons.org/licenses/by-nc/3.0/cn/deed.zh'
        >
          自由转载 - 署名 - 非商业使用
        </ExternalLink>
      </div>
    </div>
  );
};

export default ArticleMeta;
