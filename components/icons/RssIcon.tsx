import React from 'react';
import Link from 'next/link';
import { WEB_URL } from '@/configs/app';

const RSSIcon = () => (
  <Link href={`${WEB_URL}/rss.xml`}>
    <span style={{ cursor: 'pointer' }}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        className='feather feather-rss'
      >
        <path d='M4 11a9 9 0 0 1 9 9' />
        <path d='M4 4a16 16 0 0 1 16 16' />
        <circle cx='5' cy='19' r='1' />
      </svg>
    </span>
  </Link>
);
export default RSSIcon;
