import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { ArticleArchive, ArticleArchiveResponse } from '@/entities/article';

const getDay = (date: Date) =>
  `${String(new Date(date).getMonth() + 1).padStart(2, '0')}-${String(
    new Date(date).getDate()
  ).padStart(2, '0')}`;

const ArticleList = ({ articles }: { articles: ArticleArchive[] }) => (
  <ul className='relative list-none space-y-8'>
    {articles.map(article => (
      <li
        key={article.id}
        className='flex items-center rounded-sm p-4 transition-colors hover:bg-gray-100'
      >
        <p className='mb-0 w-32 text-sm text-gray-2 sm:text-base'>
          {getDay(article.createAt)}
        </p>
        <div className='flex w-full flex-col-reverse justify-between text-sm sm:flex-row sm:text-base'>
          <Link key={article.id} href={`/article/${article.id}`}>
            <h4 className='capsize cursor-pointer text-lg font-medium transition-colors hover:text-primary sm:text-xl'>
              {article.title}
            </h4>
          </Link>
          <p className='w-32 text-left text-gray-2 md:mb-0 md:text-right'>
            {`${
              article.reading ? Number(article.reading).toLocaleString() : '–––'
            } views`}
          </p>
        </div>
      </li>
    ))}
  </ul>
);

interface ArchivePageProps {
  archives?: ArticleArchiveResponse;
}

const ArchiveView = ({ archives = new Map() }: ArchivePageProps) => (
  <div className='px-4 tracking-wider'>
    <NextSeo title='归档' />

    <ul className='list-none pl-0'>
      {[...archives.entries()].reverse().map(([year, articles]) => (
        <li key={year} className='mb-6 rounded-sm'>
          <h3 className='mt-8 mb-4 text-2xl font-medium tracking-tight text-dark-3 md:text-4xl'>
            {year}
          </h3>
          <ArticleList articles={articles} />
        </li>
      ))}
    </ul>
  </div>
);

export default ArchiveView;
