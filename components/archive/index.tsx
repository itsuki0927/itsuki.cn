import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { ArticleArchiveMap, ArticleArchiveResponse } from '@/entities/article';
import { Container } from '../ui';

const getDay = (dateString: string) => `${dateString.slice(-2)}号`;

const ArticleList = ({ articles }: ArticleArchiveMap) => (
  <ul className='list-none pl-4'>
    {articles.map(article => (
      <li className='rounded-sm p-3' key={article.id}>
        <p className='mb-2'>
          <span className='mr-3 inline-block text-sm text-gray-1 dark:text-gray-1--dark'>
            {getDay(article.createAtString)}
          </span>
          <Link href={`/article/${article.id}`}>
            <span className='cursor-pointer border-b border-solid border-transparent tracking-wider text-dark-2 transition-all hover:text-gray-3 dark:text-dark-2--dark'>
              {article.title}
            </span>
          </Link>
        </p>
        <p className='mb-0 pl-10 text-sm text-gray-2 dark:text-gray-2--dark'>
          {article.description}
        </p>
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
  <Container>
    <NextSeo title='归档' />
    <header className='mt-2 mb-7 text-center'>
      <h1 className='text-base tracking-widest'>归档</h1>
    </header>

    <ul className='list-none pl-0'>
      {Object.entries(archives)
        .reverse()
        .map(([year, months]) => (
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
