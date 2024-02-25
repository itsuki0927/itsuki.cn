import clsx from 'clsx';
import Image from 'next/image';
import noData from '@/public/undraw_no_data_re_kwbl.svg';
import { ReactNode } from 'react';

interface EmptyProps {
  className?: string;
  children: ReactNode;
}

const Empty = ({ className, children }: EmptyProps) => {
  return (
    <div className={clsx('p-4 py-12', className)}>
      <div className="max-w-32 mx-auto">
        <Image priority src={noData} alt="Follow us on Twitter" />
      </div>
      <div className="max-w-sm text-center mx-auto mt-4 text-zinc-800 font-medium text-sm">
        {children}
      </div>
    </div>
  );
};

export default Empty;
