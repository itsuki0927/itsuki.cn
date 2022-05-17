import classNames from 'classnames';
import { useRouter } from 'next/router';
import { Icon, LinkOutlined } from '@/components/icons';
import s from './style.module.css';
import { getPageUrl, stringifyParams } from '@/utils/url';
import { META } from '@/configs/app';
import copyTextToClipboard from '@/utils/copy';
import { renderTextToQRCodeDataURL } from '@/utils/qrcode';
import { CustomWindow } from '@/types/window';

declare let window: CustomWindow;

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
  handler?(share: ShareParams): void;
  url?(share: ShareParams): string;
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
    handler: async params => {
      const dataUrl = await renderTextToQRCodeDataURL(params.url);
      window.$popup?.open(dataUrl);
    },
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
    // TODO: gtag.event
  };

  const handleShare = (social: SocialItem) => {
    const shareParams: ShareParams = {
      url: getURL(),
      title: getTitle(),
      description: getDescription(),
      cover: getCover(),
    };
    if (social.handler) {
      social.handler(shareParams);
    } else {
      window.open(social.url!(shareParams), `分享到${social.name}`);
    }
    // TODO: gtag.event
  };

  return (
    <div className='items-center space-x-3'>
      {socials.map(social => (
        <button
          type='button'
          key={social.id}
          className={classNames(s.ejector, s[social.id])}
          title={`分享到${social.name}`}
          onClick={() => handleShare(social)}
        >
          <Icon className='text-lg leading-8' name={social.id} />
        </button>
      ))}
      <button
        type='button'
        className={classNames(s.ejector, s.link)}
        onClick={copyPageURL}
      >
        <LinkOutlined className='text-lg leading-8' />
      </button>
    </div>
  );
};

export default Share;
