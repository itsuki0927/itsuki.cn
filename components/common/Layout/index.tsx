import classNames from 'classnames';
import { PropsWithChildren } from 'react';
import BackTop from '@/components/ui/BackTop';
import Footer from '../Footer';
import PopupUI from '@/components/ui/PopupUI';
import Header from '../Navbar';

export interface PageProps {
  className?: string;
  headerTheme?: 'white' | 'gray';
  footerTheme?: 'normal' | 'reverse';
}

const Layout = ({
  children,
  className = '',
  headerTheme = 'white',
  footerTheme = 'normal',
}: PropsWithChildren<PageProps>) => (
  <>
    <Header theme={headerTheme} />

    <main className={classNames(className)}>{children}</main>

    <Footer theme={footerTheme} />

    <PopupUI />
    <BackTop />
  </>
);

export default Layout;
