import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { Button } from '@/components/ui';
import MyImage from '../MyImage';

interface ErrorProps {
  title: ReactNode;
  message: ReactNode;
  img: string;
  showBackButton?: boolean;
  className?: string;
}

const ErrorHandler = ({
  title,
  message,
  img,
  className = '',
  showBackButton = true,
}: ErrorProps) => {
  const router = useRouter();
  return (
    <div
      className={`flex flex-col items-center justify-center space-y-6 rounded-sm bg-white p-10 shadow-sm dark:bg-white--dark ${className}`}
    >
      <MyImage src={img} width={670} height={407} />
      <h1 className='text-center text-3xl tracking-wide text-dark-2 dark:text-dark-2--dark'>
        {title}
      </h1>
      <h2 className='text-xl text-gray-3'>{message}</h2>
      {showBackButton && (
        <Button type='ghost' className='px-16 py-3' onClick={() => router.push('/')}>
          起点
        </Button>
      )}
    </div>
  );
};
export default ErrorHandler;
