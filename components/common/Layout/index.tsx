import classNames from 'classnames';
import React, { PropsWithChildren, ReactNode } from 'react';
import { BackTop, Popup } from '@/components/ui';
import { PopupViews, UIParams, useUI } from '@/components/ui/context';
import ImagePopup from '@/components/ui/Popup/ImagePopup';
import SponsorPopup from '@/components/ui/Popup/SponsorPopup';
import WechatPopup from '@/components/ui/Popup/WechatPopup';
import Footer from '../Footer';
import Navbar from '../Navbar';

const PopupView: React.FC<{
  popupView: PopupViews;
  popupParams?: UIParams;
}> = ({ popupView, popupParams }) => (
  <Popup>
    {popupView === 'IMAGE_VIEW' && <ImagePopup src={popupParams?.src} />}
    {popupView === 'SPONSOR_VIEW' && <SponsorPopup />}
    {popupView === 'WECHAT_VIEW' && <WechatPopup />}
  </Popup>
);

const PopupUI: React.FC = () => {
  const { popupView, popupParams } = useUI();
  return <PopupView popupView={popupView} popupParams={popupParams} />;
};

export interface PageProps {
  hero?: ReactNode;
  banner?: ReactNode;
  className?: string;
  headerTheme?: 'white' | 'gray';
}

const Layout = ({
  children,
  hero,
  banner,
  className = '',
  headerTheme = 'white',
}: PropsWithChildren<PageProps>) => (
  <div className='app'>
    {hero}
    <Navbar theme={headerTheme} />
    {banner}

    {/* <main className={classNames('container mb-6 space-y-6 py-10', className)}> */}
    <main className={classNames('container', className)}>{children}</main>

    <Footer />

    <PopupUI />
    <BackTop />
  </div>
);

export default Layout;
