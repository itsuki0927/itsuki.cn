import { MyImage } from '@/components/common';
import { GithubOutlined, Icon, QQOutlined } from '@/components/icons';
import { RESOURCE_URL } from '@/configs/app';

interface CommentAvatarProps {
  avatar: string | null | undefined;
  loginType?: string;
}

const DEFAULT_AVATAR = `${RESOURCE_URL}/avatar.jpg`;

const CommentAvatar = ({ avatar, loginType }: CommentAvatarProps) => (
  <div className='relative'>
    <MyImage
      className='rounded-md border-4 border-solid border-white-3'
      imgClassName='rounded-sm'
      src={avatar ?? DEFAULT_AVATAR}
      width={40}
      height={40}
      alt='cover'
    />
    <span className='capsize absolute right-1 bottom-1 w-[40%] rounded-sm bg-[#ffffff80] text-center'>
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
