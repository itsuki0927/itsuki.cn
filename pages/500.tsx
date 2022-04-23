import { ReactNode } from 'react';
import { ErrorHandler, Layout } from '@/components/common';

const InternalServerError = () => (
  <div className='flex h-screen items-center justify-center'>
    <ErrorHandler title='500' message='服务器出了点小故障~' img='/500.jpg' />
  </div>
);

InternalServerError.getLayout = (page: ReactNode) => (
  <Layout showSidebar={false} showNavbar={false} showFooter={false}>
    {page}
  </Layout>
);

export default InternalServerError;
