import React, { PropsWithChildren } from 'react';
import classNames from 'classnames';
import { Footer, HomeSlider, Navbar, StandardSidebar } from '@/components/common';
import { BackTop, Container, Popup } from '@/components/ui';
import { useGlobalData } from '@/hooks/globalData';
import { useTheme } from '@/hooks';
import { PopupViews, SidebarViews, UIParams, useUI } from '@/components/ui/context';
import { SiteInfo } from '@/entities/siteInfo';
import ImagePopup from '@/components/ui/Popup/ImagePopup';
import SponsorPopup from '@/components/ui/Popup/SponsorPopup';
import WechatPopup from '@/components/ui/Popup/WechatPopup';

const SidebarView: React.FC<{
  sidebarView: SidebarViews;
  toggleSidebar: () => void;
  tags: SiteInfo['tags'];
  hotArticles: SiteInfo['hotArticles'];
}> = ({ sidebarView, toggleSidebar, tags, hotArticles }) => (
  <>
    {sidebarView === 'STANDARD_VIEW' && (
      <StandardSidebar
        onToggle={toggleSidebar}
        className='max-w-[333px] space-y-6'
        tags={tags}
        hotArticles={hotArticles}
      />
    )}
    {sidebarView === 'COMMENT_LEADERBOARD_VIEW' && <div>not implement</div>}
  </>
);

const SidebarUI: React.FC<{
  showSidebar?: boolean;
  tags: SiteInfo['tags'];
  hotArticles: SiteInfo['hotArticles'];
}> = ({ tags, hotArticles, showSidebar }) => {
  const { displaySidebar, toggleSidebar, sidebarView } = useUI();
  // 因为 displaySidebar 和 showSidebar 都可以控制 sidebar 的显示与隐藏, 所以当两个值只有有一个满足条件就放行
  if (!displaySidebar || !showSidebar) return null;
  return (
    <SidebarView
      tags={tags}
      hotArticles={hotArticles}
      sidebarView={sidebarView}
      toggleSidebar={toggleSidebar}
    />
  );
};

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
  showFooter?: boolean;
  showNavbar?: boolean;
  showSidebar?: boolean;
  showSlider?: boolean;
}

const Layout = ({
  children,
  showFooter = true,
  showNavbar = true,
  showSidebar = true,
  showSlider = false,
}: PropsWithChildren<PageProps>) => {
  const { data } = useGlobalData();
  const [theme, setTheme] = useTheme();

  return (
    <div className='app'>
      {showNavbar && (
        <Navbar theme={theme} onThemeChange={setTheme} links={data?.categories || []} />
      )}

      <main
        className={classNames('container mx-auto mb-6 min-h-screen flex-grow space-y-6', {
          'pt-[104px]': showNavbar,
        })}
      >
        {showSlider && (
          <Container>
            <HomeSlider articles={data?.bannerArticles ?? []} />
          </Container>
        )}

        <div className='flex space-x-6'>
          <section
            className={classNames('flex-grow', {
              'max-w-[693px]': showSidebar,
            })}
          >
            {children}
          </section>

          <SidebarUI
            showSidebar={showSidebar}
            tags={data?.tags ?? []}
            hotArticles={data?.hotArticles ?? []}
          />
        </div>
      </main>
      {showFooter && <Footer />}

      <PopupUI />
      <BackTop />
    </div>
  );
};

export default Layout;
