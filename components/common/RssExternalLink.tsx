import buildUrl from '@/utils/buildUrl';
import { Rss } from 'lucide-react';
import React from 'react';
import ExternalLink from './ExternalLink';

const RssExternalLink = () => {
  return (
    <ExternalLink
      className="rounded-md block relative p-2 text-center transition-colors hover:bg-gray-100"
      href={buildUrl('/rss').toString()}
    >
      <span className="flex absolute h-2 w-2 right-1 top-1">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-400" />
      </span>
      <Rss size={16} />
    </ExternalLink>
  );
};

export default RssExternalLink;
