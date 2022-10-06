import { useRouter } from 'next/router';
import { ExternalLink } from '@/components/common';
import { WEB_URL } from '@/configs/app';
import { BlogDetailResponse } from '@/entities/blog';

interface BlogMetaProps {
  blog: BlogDetailResponse;
}

const BlogMeta = ({ blog }: BlogMetaProps) => {
  const router = useRouter();
  return (
    <div className='my-4 flex flex-col space-y-3 text-sm text-gray-2'>
      <div>
        <span>永久地址: </span>
        <span className='underline'>
          {WEB_URL + router.pathname.replace('[path]', `${blog.path}`)}
        </span>
      </div>

      <div>
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

export default BlogMeta;
