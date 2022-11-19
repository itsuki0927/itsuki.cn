'use client';

import { FC } from 'react';
import Popup from '../Popup';
import { PopupViews, UIParams, useUI } from '../context';
import ImagePopup from '../Popup/ImagePopup';
import SponsorPopup from '../Popup/SponsorPopup';
import WechatPopup from '../Popup/WechatPopup';

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

export default PopupUI;
