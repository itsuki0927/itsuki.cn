'use client';

import classNames from 'classnames';
import { PropsWithChildren, FC } from 'react';
import BackTop from '@/components/ui/BackTop';
import Popup from '@/components/ui/Popup';
import { PopupViews, UIParams, useUI } from '@/components/ui/context';
import ImagePopup from '@/components/ui/Popup/ImagePopup';
import SponsorPopup from '@/components/ui/Popup/SponsorPopup';
import WechatPopup from '@/components/ui/Popup/WechatPopup';
import Footer from '../Footer';
import Navbar from '../Navbar';

const PopupView: FC<{
  popupView: PopupViews;
  popupParams?: UIParams;
}> = ({ popupView, popupParams }) => (
  <Popup>
    {popupView === 'IMAGE_VIEW' && <ImagePopup src={popupParams?.src} />}
    {popupView === 'SPONSOR_VIEW' && <SponsorPopup />}
    {popupView === 'WECHAT_VIEW' && <WechatPopup />}
  </Popup>
);

const PopupUI = () => {
  const { popupView, popupParams } = useUI();
  return <PopupView popupView={popupView} popupParams={popupParams} />;
};

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
  <div className='app'>
    <Navbar theme={headerTheme} />

    <main className={classNames(className)}>{children}</main>

    <Footer theme={footerTheme} />

    <PopupUI />
    <BackTop />
  </div>
);

export default Layout;
