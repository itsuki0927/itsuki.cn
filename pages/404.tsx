import BlackLayout from '@/components/common/BlankLayout';

export default function NotFound() {
  return (
    <div className='flex h-screen items-center justify-center'>
      <h1 className='text-6xl tracking-wide'>Not Found</h1>
    </div>
  );
}

NotFound.Layout = BlackLayout;
