import { NextSeo } from 'next-seo';
import Link from 'next/link';
import {
  ArticleArchive,
  ArticleArchiveMap,
  ArticleArchiveResponse,
} from '@/entities/article';
import { Container } from '../ui';

const getDay = (date: Date) => `${String(new Date(date).getDate()).padStart(2, '0')}号`;

const ArticleList = ({ articles }: { articles: ArticleArchive[] }) => (
  <ul className='list-none pl-4'>
    {articles.map(article => (
      <li className='rounded-sm p-3' key={article.id}>
        <p className='mb-2'>
          <span className='mr-3 inline-block text-sm text-gray-1'>
            {getDay(article.createAt)}
          </span>
          <Link href={`/article/${article.id}`}>
            <span className='cursor-pointer border-b border-solid border-transparent tracking-wider text-dark-2 transition-all hover:text-gray-3 '>
              {article.title}
            </span>
          </Link>
        </p>
        <p className='mb-0 pl-10 text-sm text-gray-2'>{article.description}</p>
      </li>
    ))}
  </ul>
);

const MonthList = ({ months }: { months: ArticleArchiveMap }) => (
  <>
    {[...months.entries()].map(([month, articles]) => (
      <ul className='list-square' key={month}>
        <li key={month} className='ml-16'>
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

const ArchiveView = ({ archives = new Map() }: ArchivePageProps) => (
  <Container>
    <NextSeo title='归档' />
    <header className='mt-2 mb-7 text-center'>
      <h1 className='tracking-widest'>归档</h1>
    </header>

    <ul className='list-none pl-0'>
      {[...archives.entries()].reverse().map(([year, months]) => (
        <li key={year} className='mb-6 rounded-sm'>
          <h2 className='mb-8 mt-0 text-2xl font-medium'>
            <span>{year}</span>
          </h2>
          <MonthList months={months} />
        </li>
      ))}
    </ul>
  </Container>
);

export default ArchiveView;
