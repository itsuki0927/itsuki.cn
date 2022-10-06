import classNames from 'classnames';
import Link from 'next/link';
import { BlogArchive, BlogArchiveResponse, BlogCardStyle } from '@/entities/blog';
import { getBlogDetailRoute } from '@/utils/url';
import styles from './index.module.scss';

interface ArchivePageProps {
  archives?: BlogArchiveResponse;
}

interface ArchiveCardProps {
  blog: BlogArchive;
  index: number;
}

const ArchiveCard = ({ blog, index }: ArchiveCardProps) => {
  const hasCover = blog.cardStyle !== BlogCardStyle.Image;
  return (
    <div
      className={classNames(styles.card, hasCover && styles.hasCover)}
      style={{
        backgroundImage: `url(${hasCover ? blog.cover : ''})`,
      }}
    >
      <div className={classNames(styles.inner)}>
        <div className={styles.singleNum}>
          <i>#</i>
          {index}
        </div>
        <Link href={getBlogDetailRoute(blog.path)}>
          <span className={classNames(styles.link)}>{blog.title}</span>
        </Link>
      </div>
    </div>
  );
};

const ArchiveView = ({ archives = new Map() }: ArchivePageProps) => (
  <ul className='container space-y-12 py-8 md:py-16'>
    {[...archives.entries()].map(([year, blogs]) => (
      <li key={year} className='flex flex-col rounded-sm md:flex-row md:items-start'>
        <h3 className={classNames(styles.year)}>
          {year}
          <span className={classNames(styles.count)}>{blogs.length} 篇文章</span>
        </h3>

        <div className='flex flex-grow flex-wrap'>
          {blogs.map((blog, index) => (
            <ArchiveCard blog={blog} index={index + 1} />
          ))}
        </div>
      </li>
    ))}
  </ul>
);

export default ArchiveView;
