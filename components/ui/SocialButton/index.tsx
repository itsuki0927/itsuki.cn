import { usePathname, useRouter } from 'next/navigation';
import { MouseEvent } from 'react';
import toast from 'react-hot-toast';
import classNames from 'classnames';
import { Link2 } from 'react-feather';
import {
  GithubOutlined,
  WechatOutlined,
  SifouOutlined,
  JuejinOutlined,
} from '@/components/icons';
import { useCopyToClipboard } from '@/hooks';
import { useUI } from '../context';
import { GAEventCategories } from '@/constants/gtag';
import { gtag } from '@/utils/gtag';
import { StandardProps } from '@/types/common';

interface SocialItem {
  name: string;
  class: string;
  icon: JSX.Element | null;
  color: string;
  url?: string;
}

export const defaultSocials: SocialItem[] = [
  {
    name: 'Website',
    class: 'website',
    icon: <Link2 size={16} />,
    color: 'rgba(0, 136, 245, 0.8)',
  },
  {
    name: 'Github',
    class: 'github',
    icon: <GithubOutlined size={16} />,
    color: 'rgba(39, 39, 42, 1)',
    url: 'https://github.com/itsuki0927',
  },
  {
    name: 'Wechat',
    class: 'wechat',
    icon: <WechatOutlined size={16} />,
    color: 'rgba(85, 190, 105, 1)',
  },
  {
    name: 'Juejin',
    class: 'juejin',
    icon: <JuejinOutlined size={16} />,
    color: 'rgba(31, 127, 255, 1)',
    url: 'https://juejin.cn/user/2436173499466350',
  },
  {
    name: 'Sifou',
    class: 'sifou',
    icon: <SifouOutlined size={16} />,
    color: 'rgba(0, 150, 94, 1)',
    url: 'https://segmentfault.com/u/itsuki0927',
  },
];

export interface SocialButtonsProps {
  socials: SocialItem[];
}

interface SocialButtonProps extends StandardProps {
  social: SocialItem;
  onClick?: (e: MouseEvent, socials: SocialItem) => void;
}

const SocialButton = ({
  social,
  onClick,
  className,
  style,
  children,
}: SocialButtonProps) => {
  const { openPopup, setPopupView } = useUI();
  const pathname = usePathname();
  const router = useRouter();
  const [, copyTextToClipboard] = useCopyToClipboard();

  const clickWechat = (e: MouseEvent) => {
    e.preventDefault();
    setPopupView('WECHAT_VIEW');
    openPopup();
    gtag.event('wechat_popup', {
      category: GAEventCategories.Widget,
    });
  };

  const clickWebsite = () => {
    if (pathname === '/about') {
      copyTextToClipboard('https://itsuki.cn');
      toast.success('🔗 链接复制成功, 快去分享给其他小伙伴吧~');
    } else {
      router.push('/about');
    }
  };

  const handleSocialClick = (e: MouseEvent) => {
    if (social.name === 'Wechat') {
      clickWechat(e);
    } else if (social.name === 'Website') {
      clickWebsite();
    } else {
      window.open(social.url);
    }
    onClick?.(e, social);
  };

  return (
    <button
      aria-label={`share to ${social.name}`}
      type='button'
      className={classNames(
        'flex items-center rounded-sm text-sm text-white opacity-90 hover:opacity-100',
        className
      )}
      style={{
        ...style,
        backgroundColor: social.color,
      }}
      onClick={handleSocialClick}
    >
      {children}
    </button>
  );
};

export default SocialButton;
