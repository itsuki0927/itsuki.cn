import Link from 'next/link';
import { Share } from '@/components/common';

const Author = () => (
  <div className='uppercase leading-12 tracking-wider'>
    <span className='text-sm'>by</span>
    <Link href='/about'>
      <span className='ml-1 cursor-pointer font-bold transition-colors duration-500 hover:text-primary'>
        itsuki
      </span>
    </Link>
  </div>
);

const ArticleFooter = () => (
  <div className='absolute left-0 right-0 bottom-0 flex h-12 items-center justify-between bg-dark-1 px-4 text-white'>
    <Author />

    <Share />
  </div>
);

export default ArticleFooter;
