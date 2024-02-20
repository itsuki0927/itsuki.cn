import { StandardProps } from '@/types/common';
import clsx from 'clsx';

const ContentLayout = ({ children, style, className }: StandardProps) => {
  return (
    <div className={clsx('sm:px-8 my-16 sm:my-24', className)} style={style}>
      {children}
    </div>
  );
};

export default ContentLayout;
