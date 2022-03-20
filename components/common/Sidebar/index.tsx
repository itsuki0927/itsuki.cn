import Link from 'next/link';
import { ArticleTag } from '@/components/article';
import { SnippetExpertise } from '@/components/snippet';
import { SiteInfo } from '@/entities/siteInfo';
import { getArticleDetailUrl } from '@/utils/url';

interface SidebarProps {
  className?: string;
  tags: SiteInfo['tags'];
  hotArticles: SiteInfo['hotArticles'];
}

// .leaderboard {
//   counter-reset: section;
// }

// .leaderboardItem {
//   &::before {
//     counter-increment: section;
//     content: '' counter(section) ' .    ';
//     color: $text-color-secondary;
//   }
//
const Sidebar = ({ tags = [], hotArticles = [], className }: SidebarProps) => (
  <aside className={className}>
    <div className='flex justify-between items-center bg-white p-4'>
      <Link href='https://itsuki.cn/snippet/js/s/35'>
        <span className='transition-all hover:text-primary'>unzipWith</span>
      </Link>
      <SnippetExpertise ranks={2} />
    </div>

    <div className='bg-white p-4'>
      <p>
        <strong>热门文章</strong>
      </p>
      {hotArticles.map((article, index) => (
        <div
          className='p-2 transition-colors cursor-pointer flex items-center rounded-sm hover:bg-gray-100 group'
          key={article.id}
        >
          <Link href={getArticleDetailUrl(article.id)}>
            <span className='align-middle ml-1 flex-1 text-sm transition-colors group-hover:text-primary'>
              {index + 1}. {article.title}
            </span>
          </Link>
        </div>
      ))}
    </div>

    <div className='bg-white p-4 pb-2 rounded-sm'>
      {tags?.map(item => (
        <ArticleTag key={item.id} className='mr-2 mb-2' tag={item} />
      ))}
    </div>
  </aside>
);

export default Sidebar;
