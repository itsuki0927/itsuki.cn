import { MessageCircle } from 'react-feather';
import { ReactNode } from 'react';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { DoubanOutlined, QQOutlined, WechatOutlined } from '@/components/icons';
import { useUI } from '@/components/ui/context';
import { META } from '@/configs/app';
import { GAEventCategories } from '@/constants/gtag';
import { renderTextToQRCodeDataURL } from '@/libs/qrcode';
import { gtag } from '@/utils/gtag';
import { getPageUrl, stringifyParams } from '@/utils/url';
import s from './style.module.scss';
import { ArticleDetailResponse } from '@/entities/article';
import FavoriteButton from '../FavoriteButton';
import { useScrollTo } from '@/hooks';
import { COMMENT_VIEW_ELEMENT_ID } from '@/constants/anchor';

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
  icon?: ReactNode;
  url?: (share: ShareParams) => string;
  asyncUrl?: (share: ShareParams) => Promise<string>;
}

const socials: SocialItem[] = [
  {
    id: SocialMedia.QQ,
    name: 'QQ',
    class: 'qq',
    icon: <QQOutlined size={24} />,
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
    icon: <WechatOutlined size={24} />,
    asyncUrl: params => renderTextToQRCodeDataURL(params.url),
  },
  {
    id: SocialMedia.Douban,
    name: '豆瓣',
    class: 'douban',
    icon: <DoubanOutlined size={24} />,
    url: params =>
      `https://www.douban.com/recommend/?${stringifyParams({
        url: params.url,
        title: params.title,
        image: params.cover,
        v: 1,
      })}`,
  },
];

interface SocialButtonProps {
  social: SocialItem;
  onClick?: (social: SocialItem) => void;
}

const SocialButton = ({ social, onClick }: SocialButtonProps) => (
  <button
    aria-label={`share to ${social.name}`}
    type='button'
    key={social.id}
    className={classNames(s.ejector, s[social.id])}
    title={`分享到${social.name}`}
    onClick={() => onClick?.(social)}
  >
    {social.icon}
  </button>
);

interface ArticleActionProps {
  article: ArticleDetailResponse;
}
const ArticleAction = ({ article }: ArticleActionProps) => {
  const { openPopup, setPopupView } = useUI();
  const router = useRouter();
  const { scrollTo } = useScrollTo();

  const handleShare = async (social: SocialItem) => {
    const getURL = () => getPageUrl(router.asPath);
    const getTitle = () => document.title || META.title;
    const getDescription = () =>
      document.getElementsByName('description')?.[0].getAttribute('content') || '';
    const getCover = () =>
      document.getElementsByName('cover')?.[0].getAttribute('content') || '';

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
    <div
      className={`flex flex-col justify-center space-y-4 bg-white py-4 px-2 ${s.share}`}
    >
      <FavoriteButton article={article} />
      <span className='border-b border-solid border-gray-200'> </span>
      <span className='flex flex-col justify-center'>
        <button
          aria-label='article comments'
          type='button'
          className='flex items-center justify-center font-medium text-gray-400 outline-none'
          onClick={() => scrollTo(COMMENT_VIEW_ELEMENT_ID)}
        >
          <MessageCircle className='fill-primary stroke-transparent' />
        </button>
        <strong className='capsize text-center text-xs font-medium text-gray-500'>
          {article.commenting}
        </strong>
      </span>
      <span className='border-b border-solid border-gray-200'> </span>
      {socials.map(social => (
        <SocialButton social={social} onClick={handleShare} />
      ))}
    </div>
  );
};

export default ArticleAction;
