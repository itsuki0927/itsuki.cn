import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { ArticleArchive, ArticleArchiveResponse } from '@/entities/article';

const getDay = (date: Date) =>
  `${String(new Date(date).getMonth() + 1).padStart(2, '0')}月${String(
    new Date(date).getDate()
  ).padStart(2, '0')}号`;

const ArticleList = ({ articles }: { articles: ArticleArchive[] }) => (
  <ul className='relative ml-9 list-none border-l-2 border-dashed border-l-gray-1 pl-8 '>
    {articles.map(article => (
      <div className='mb-8 w-full'>
        <p className='mb-4 w-32 text-right text-sm text-gray-2 md:mb-0 md:text-left'>
          {getDay(article.createAt)}
        </p>
        <div className='flex flex-col justify-between md:flex-row'>
          <Link key={article.id} href={`/article/${article.id}`}>
            <h4 className='mb-2 w-full cursor-pointer text-lg font-medium transition-colors hover:text-dark-2 md:text-xl'>
              {article.title}
            </h4>
          </Link>
          <p className='mb-4 w-32 text-left text-gray-2 md:mb-0 md:text-right'>
            {`${
              article.reading ? Number(article.reading).toLocaleString() : '–––'
            } views`}
          </p>
        </div>
        <p className='text-gray-3'>{article.description}</p>
      </div>
    ))}
  </ul>
);

interface ArchivePageProps {
  archives?: ArticleArchiveResponse;
}

const ArchiveView = ({ archives = new Map() }: ArchivePageProps) => (
  <div className='mx-auto w-3/4 tracking-wider'>
    <NextSeo title='归档' />
    <div className='p-6'>
      <h1 className='mb-4 text-3xl font-medium tracking-tight text-dark-3 md:text-5xl'>
        归档
      </h1>

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
  </div>
);

export default ArchiveView;
