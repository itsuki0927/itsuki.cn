import classNames from 'classnames';
import { MyImage } from '@/components/common';
import { GithubOutlined, Icon, QQOutlined } from '@/components/icons';
import { RESOURCE_URL } from '@/configs/app';

interface CommentAvatarProps {
  avatar: string | null | undefined;
  loginType?: string;
  className?: string;
}

const DEFAULT_AVATAR = `${RESOURCE_URL}/avatar.jpg`;

const CommentAvatar = ({ avatar, loginType, className = '' }: CommentAvatarProps) => (
  <div
    className={classNames(
      'relative max-h-[60px] max-w-[60px] rounded-sm border-4 border-solid border-white-3',
      className
    )}
  >
    <MyImage src={avatar ?? DEFAULT_AVATAR} width={52} height={52} alt='cover' />

    <span className='capsize absolute right-0 bottom-0 w-[40%] rounded-sm bg-[#ffffff80] text-center'>
      {loginType === 'github' && (
        <GithubOutlined className='capsize leading-5 text-github' />
      )}
      {loginType === 'qq' && <QQOutlined className='capsize leading-5 text-qq' />}
      {!loginType ||
        (loginType === 'anonymous' && (
          <Icon name='user-fill' className='capsize leading-5 text-white' />
        ))}
    </span>
  </div>
);

export default CommentAvatar;
