import ExternalLink from './ExternalLink';
import { Activity } from 'lucide-react';

const ActivityExternalLink = () => {
  return (
    <ExternalLink
      className="rounded-md block relative p-2 text-center transition-colors hover:bg-gray-100"
      href="https://itsuki.onlineornot.com"
    >
      <span className="flex absolute h-2 w-2 right-1 top-1">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
      </span>
      <Activity size={16} />
    </ExternalLink>
  );
};

export default ActivityExternalLink;
