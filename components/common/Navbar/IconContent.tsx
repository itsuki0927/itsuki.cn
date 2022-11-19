import RssIcon from './RssIcon';
import CommandIcon from './CommandIcon';

interface IconNavProps {
  className?: string;
}

const IconContent = ({ className = '' }: IconNavProps) => (
  <div className={`${className} space-x-6`}>
    <CommandIcon />
    <RssIcon />
  </div>
);

export default IconContent;
