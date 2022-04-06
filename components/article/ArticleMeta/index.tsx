import Link from 'next/link';
import router from 'next/router';
import { WEB_URL } from '@/configs/app';
import { ArticleDetailResponse } from '@/entities/article';

interface ArticleMetaProps {
  article: ArticleDetailResponse;
}

const ArticleMeta = ({ article }: ArticleMetaProps) => (
  <div className='mb-16'>
    <div className='mb-2 text-center text-xs tracking-wider text-[#b6b6b6]'>
      一堆标签:
      {article.tags.map(item => (
        <Link key={item.path} href={`/tag/${item.path}`}>
          <span className='ml-2 cursor-pointer transition-colors duration-500 hover:text-[#2d2d2d]'>
            {item.name}
          </span>
        </Link>
      ))}
    </div>

    <div className='mb-2 text-center text-xs tracking-wider text-[#b6b6b6]'>
      一个分类:
      {article.categories.map(item => (
        <Link key={item.path} href={`/tag/${item.path}`}>
          <span className='ml-2 cursor-pointer transition-colors duration-500 hover:text-[#2d2d2d]'>
            {item.name}
          </span>
        </Link>
      ))}
    </div>

    <div className='flex items-center justify-center text-xs text-[#b6b6b6]'>
      <div>
        <span>永久地址: </span>
        <span className='underline'>{WEB_URL + router.asPath}</span>
      </div>

      <span className='mx-2'>|</span>

      <div>
        <span>版权声明: </span>
        <a
          className='no-underline transition-colors hover:text-[#444]'
          href='https://creativecommons.org/licenses/by-nc/3.0/cn/deed.zh'
          target='_blank'
          rel='external nofollow noopener noreferrer'
        >
          自由转载 - 署名 - 非商业使用
        </a>
      </div>
    </div>
  </div>
);

export default ArticleMeta;
