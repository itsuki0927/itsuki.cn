'use client';

import { Rss } from 'react-feather';
import { GAEventCategories } from '@/constants/gtag';
import { gtag } from '@/utils/gtag';

const RssIcon = () => {
  const handleIconClick = (action: string, label: string) => {
    gtag.event(action, {
      category: GAEventCategories.Widget,
      label,
    });
  };
  return (
    <a
      tabIndex={0}
      role='button'
      key='rss'
      className='rounded-md p-2 text-center transition-colors hover:bg-gray-100'
      href='/rss.xml'
      onClick={() => handleIconClick('rss', 'rss')}
    >
      <Rss size={16} />
    </a>
  );
};

export default RssIcon;
