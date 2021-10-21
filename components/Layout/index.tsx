import dynamic from 'next/dynamic';
import { FC } from 'react';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';

const DynamicBackTop = dynamic(() => import('@/components/BackTop'));

const Layout: FC = ({ children }) => (
  <>
    <Header />
    <Main>{children}</Main>
    <Footer />

    <DynamicBackTop />
  </>
);

export default Layout;
