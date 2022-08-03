import classNames from 'classnames';
import { useRouter } from 'next/router';
import { Icon } from '@/components/icons';
import { useUI } from '@/components/ui/context';
import { META } from '@/configs/app';
import { GAEventCategories } from '@/constants/gtag';
import { renderTextToQRCodeDataURL } from '@/libs/qrcode';
import { gtag } from '@/utils/gtag';
import { getPageUrl, stringifyParams } from '@/utils/url';
import s from './style.module.scss';

enum SocialMedia {
  QQ = 'qq',
  Wechat = 'wechat',
  Douban = 'douban',
}
interface ShareParams {
  url: string;
  title: string;
  description: string;
  cover?: string;
}

interface SocialItem {
  id: SocialMedia;
  name: string;
  class: string;
  url?: (share: ShareParams) => string;
  asyncUrl?: (share: ShareParams) => Promise<string>;
}

const socials: SocialItem[] = [
  {
    id: SocialMedia.QQ,
    name: 'QQ',
    class: 'qq',
    url: ({ url, description, title, cover }) =>
      `https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?${stringifyParams({
        url,
        title,
        pics: cover,
        summary: description,
        sharesource: 'qzone',
      })}`,
  },
  {
    id: SocialMedia.Wechat,
    name: '微信',
    class: 'wechat',
    asyncUrl: params => renderTextToQRCodeDataURL(params.url),
  },
  {
    id: SocialMedia.Douban,
    name: '豆瓣',
    class: 'douban',
    url: params =>
      `https://www.douban.com/recommend/?${stringifyParams({
        url: params.url,
        title: params.title,
        image: params.cover,
        v: 1,
      })}`,
  },
];

const Share = () => {
  const { openPopup, setPopupView } = useUI();
  const router = useRouter();
  const getURL = () => getPageUrl(router.asPath);
  const getTitle = () => document.title || META.title;
  const getDescription = () =>
    document.getElementsByName('description')?.[0].getAttribute('content') || '';
  const getCover = () =>
    document.getElementsByName('cover')?.[0].getAttribute('content') || '';

  const handleShare = async (social: SocialItem) => {
    const shareParams: ShareParams = {
      url: getURL(),
      title: getTitle(),
      description: getDescription(),
      cover: getCover(),
    };
    gtag.event('share_social', {
      category: GAEventCategories.Widget,
      label: social.name,
    });
    if (social.asyncUrl) {
      const src = await social.asyncUrl(shareParams);
      setPopupView('IMAGE_VIEW');
      openPopup({ src });
    } else {
      window.open(social.url!(shareParams), `分享到${social.name}`);
    }
  };

  return (
    <div className='flex flex-col justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4'>
      {socials.map(social => (
        <button
          aria-label={`share to ${social.name}`}
          type='button'
          key={social.id}
          className={classNames(s.ejector, s[social.id])}
          title={`分享到${social.name}`}
          onClick={() => handleShare(social)}
        >
          <Icon className='capsize text-lg' name={social.id} />
        </button>
      ))}
    </div>
  );
};

export default Share;
