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

    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
    {/* @ts-ignore */}
    <Footer theme={footerTheme} />

    <PopupUI />
    <BackTop />
  </>
);

export default Layout;
