import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { ArticleArchiveMap, ArticleArchiveResponse } from '@/entities/article';

const getDay = (dateString: string) => `${dateString.slice(-2)}号`;

const ArticleList = ({ articles }: ArticleArchiveMap) => (
  <ul className='list-none pl-4'>
    {articles.map(article => (
      <li className='hover:bg-gray-50 rounded-sm p-3' key={article.id}>
        <p className='mb-3'>
          <span className='text-gray-300 mr-3 inline-block text-sm'>
            {getDay(article.createAtString)}
          </span>
          <Link href={`/article/${article.id}`}>
            <span className='hover:border-gray-700 cursor-pointer border-b border-solid border-transparent font-bold opacity-90 transition-all hover:opacity-100'>
              {article.title}
            </span>
          </Link>
        </p>
        <p className='text-gray-400 mb-0 pl-12 text-sm'>{article.description}</p>
      </li>
    ))}
  </ul>
);

const MonthList = ({ months }: { months: ArticleArchiveMap }) => (
  <>
    {Object.entries(months).map(([month, articles]) => (
      <ul className='list-square' key={month}>
        <li key={month}>
          <h3 className='my-4 text-lg'>{month}</h3>
          <ArticleList articles={articles} />
        </li>
      </ul>
    ))}
  </>
);

interface ArchivePageProps {
  archives?: ArticleArchiveResponse;
}

const ArchiveView = ({ archives = {} }: ArchivePageProps) => (
  <>
    <NextSeo title='归档' />
    <ul className='list-none pl-0'>
      {Object.entries(archives)
        .reverse()
        .map(([year, months]) => (
          <li key={year} className='mb-6 rounded-sm bg-white p-4'>
            <h2 className='mb-8 mt-0 text-3xl font-bold'>
              <span>{year}</span>
            </h2>
            <MonthList months={months} />
          </li>
        ))}
    </ul>
  </>
);

export default ArchiveView;
