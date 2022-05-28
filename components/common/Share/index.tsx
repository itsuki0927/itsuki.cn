import classNames from 'classnames';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { Icon, LinkOutlined } from '@/components/icons';
import s from './style.module.scss';
import { getPageUrl, stringifyParams } from '@/utils/url';
import { META } from '@/configs/app';
import { renderTextToQRCodeDataURL } from '@/libs/qrcode';
import { useUI } from '@/components/ui/context';
import { copyTextToClipboard } from '@/hooks/useCopyToClipboard';

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
  const { openPopup } = useUI();
  const router = useRouter();
  const getURL = () => getPageUrl(router.asPath);
  const getTitle = () => document.title || META.title;
  const getDescription = () =>
    document.getElementsByName('description')?.[0].getAttribute('content') || '';
  const getCover = () =>
    document.getElementsByName('cover')?.[0].getAttribute('content') || '';

  const copyPageURL = () => {
    const content = `${getTitle()} - ${getURL()}`;
    copyTextToClipboard(content);
    toast.success('🔗 链接复制成功');
    // TODO: gtag.event
  };

  const handleShare = async (social: SocialItem) => {
    const shareParams: ShareParams = {
      url: getURL(),
      title: getTitle(),
      description: getDescription(),
      cover: getCover(),
    };
    if (social.asyncUrl) {
      const src = await social.asyncUrl(shareParams);
      openPopup({ src });
    } else {
      window.open(social.url!(shareParams), `分享到${social.name}`);
    }
    // TODO: gtag.event
  };

  return (
    <div className='flex items-center space-x-3'>
      {socials.map(social => (
        <button
          type='button'
          key={social.id}
          className={classNames(s.ejector, s[social.id])}
          title={`分享到${social.name}`}
          onClick={() => handleShare(social)}
        >
          <Icon className='capsize text-lg' name={social.id} />
        </button>
      ))}
      <button
        type='button'
        className={classNames(s.ejector, s.link)}
        onClick={copyPageURL}
      >
        <LinkOutlined className='capsize text-lg' />
      </button>
    </div>
  );
};

export default Share;
