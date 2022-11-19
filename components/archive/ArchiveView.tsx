import Link from 'next/link';
import { BlogArchive, BlogArchiveResponse } from '@/entities/blog';

const getDay = (date: Date) =>
  `${String(new Date(date).getMonth() + 1).padStart(2, '0')}-${String(
    new Date(date).getDate()
  ).padStart(2, '0')}`;

const ArchiveList = ({ articles }: { articles: BlogArchive[] }) => (
  <ul className='relative list-none space-y-6'>
    {articles.map(article => (
      <li
        key={article.id}
        className='flex rounded-sm p-4 transition-colors hover:bg-gray-100 sm:items-center'
      >
        <p className='mb-0 w-32 text-base text-gray-400'>{getDay(article.createAt)}</p>
        <div className='flex w-full flex-col justify-between text-base sm:flex-row'>
          <h4 className='capsize cursor-pointer text-xl font-medium text-gray-700 transition-colors hover:text-primary'>
            <Link key={article.id} href={`/blog/${article.path}`}>
              {article.title}
            </Link>
          </h4>
          <p className='mt-1 text-left text-sm text-gray-400 md:mt-0 md:text-right'>
            {`${article.reading ? Number(article.reading).toLocaleString() : '–––'} 浏览`}
          </p>
        </div>
      </li>
    ))}
  </ul>
);

interface ArchivePageProps {
  archives?: BlogArchiveResponse;
}

const ArchiveView = ({ archives = new Map() }: ArchivePageProps) => (
  <div className='mx-auto max-w-4xl pb-12 pt-4'>
    <ul className='list-none pl-0'>
      {[...archives.entries()].map(([year, articles]) => (
        <li key={year} className='mb-6 rounded-sm'>
          <h3 className='mt-8 mb-4 text-2xl font-medium text-gray-500 md:text-3xl'>
            {year}
          </h3>
          <ArchiveList articles={articles} />
        </li>
      ))}
    </ul>
  </div>
);

export default ArchiveView;