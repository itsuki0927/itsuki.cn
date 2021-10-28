import React, { FC } from 'react';
import { BlankLayout, Header } from '..';
import { PageProps } from '../Layout';

const HeaderLayout: FC<PageProps> = ({ pageProps, children }) => (
  <BlankLayout>
    <Header search={false} links={pageProps.categories} />
    {children}
  </BlankLayout>
);

export default HeaderLayout;
