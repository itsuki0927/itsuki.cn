import { BlankLayout, ErrorHandler } from '@/components/common';

const InternalServerError = () => (
  <div className='flex h-screen items-center justify-center'>
    <ErrorHandler title='500' message='服务器出了点小故障~' img='/500.jpg' />
  </div>
);

InternalServerError.Layout = BlankLayout;

export default InternalServerError;
