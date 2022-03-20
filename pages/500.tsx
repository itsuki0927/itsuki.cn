import BlackLayout from '@/components/common/BlankLayout';

export default function InternalServerError() {
  return (
    <div className='flex h-screen items-center justify-center'>
      <h1 className='text-6xl tracking-wide'>Internal Server Error</h1>
    </div>
  );
}

InternalServerError.Layout = BlackLayout;
