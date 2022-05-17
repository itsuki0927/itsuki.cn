import Link from 'next/link';
import { Share } from '@/components/common';

const Author = () => (
  <div className='leading-12 tracking-wider'>
    <span className='text-xs'>BY</span>
    <Link href='/about'>
      <span className='ml-1 cursor-pointer text-sm font-bold transition-colors duration-500 hover:text-primary'>
        ITSUKI
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
