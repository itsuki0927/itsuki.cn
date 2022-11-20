import classNames from 'classnames';
import { RESOURCE_URL } from '@/configs/app';
import { MyImage } from '@/components/common';

interface CommentAvatarProps {
  avatar: string | null | undefined;
  className?: string;
}

const DEFAULT_AVATAR = `${RESOURCE_URL}/avatar.jpg`;

const CommentAvatar = ({ avatar, className = '' }: CommentAvatarProps) => (
  <div
    className={classNames('relative max-h-[40px] max-w-[40px] rounded-full', className)}
  >
    <MyImage src={avatar ?? DEFAULT_AVATAR} width={32} height={32} alt='cover' circle />
  </div>
);

export default CommentAvatar;
