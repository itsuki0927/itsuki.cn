import { FC } from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';

const Layout: FC = ({ children }) => {
  return (
    <div>
      <Head>
        <link
          href='https://at.alicdn.com/t/font_2836612_r142759jz8.css?spm=a313x.7781069.1998910419.39&file=font_2836612_r142759jz8.css'
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
