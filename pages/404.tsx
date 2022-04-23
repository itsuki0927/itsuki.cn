import { ReactNode } from 'react';
import { ErrorHandler, Layout } from '@/components/common';

const NotFound = () => (
  <div className='flex h-screen items-center justify-center'>
    <ErrorHandler
      title='404'
      message='如果时光倒流， 我们又能抓得住什么 ？'
      img='/404.jpg'
    />
  </div>
);

NotFound.getLayout = (page: ReactNode) => (
  <Layout showSidebar={false} showFooter={false} showNavbar={false}>
    {page}
  </Layout>
);

export default NotFound;
