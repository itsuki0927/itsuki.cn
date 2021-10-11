import { FC } from 'react';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';

const Layout: FC = ({ children }) => (
  <div>
    <Header />
    <Main>{children}</Main>
    <Footer />
  </div>
);

export default Layout;
