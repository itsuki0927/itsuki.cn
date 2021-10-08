import Head from 'next/head';
import { FC } from 'react';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';

const Layout: FC = ({ children }) => {
  return (
    <div>
      <Head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=Fira+Code&display=swap'
          rel='stylesheet'
        />
      </Head>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </div>
  );
};

export default Layout;
