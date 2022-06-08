import React, { PropsWithChildren, ReactNode } from 'react';
import { BackTop, Popup } from '@/components/ui';
import { PopupViews, UIParams, useUI } from '@/components/ui/context';
import ImagePopup from '@/components/ui/Popup/ImagePopup';
import SponsorPopup from '@/components/ui/Popup/SponsorPopup';
import WechatPopup from '@/components/ui/Popup/WechatPopup';
import Footer from '../Footer';

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
}

const Layout = ({ children, hero }: PropsWithChildren<PageProps>) => (
  <div className='app'>
    {hero}

    <main className='container mx-auto mb-6 space-y-6 py-10'>{children}</main>

    <Footer />

    <PopupUI />
    <BackTop />
  </div>
);

export default Layout;
