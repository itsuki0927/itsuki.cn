import { MyImage } from '@/components/common';
import { GithubOutlined, QQOutlined, WechatOutlined } from '@/components/icons';

interface CommentAvatarProps {
  avatar: string | null | undefined;
  loginType?: string;
}

const CommentAvatar = ({ avatar, loginType }: CommentAvatarProps) => (
  <div className='relative'>
    <MyImage
      className='rounded-md border-4 border-solid border-white-3'
      imgClassName='rounded-sm'
      src={avatar ?? 'https://static.itsuki.cn/avatar.jpg'}
      width={55}
      height={55}
      alt='cover'
    />
    <span className='absolute right-1 bottom-1 w-[40%] rounded-sm bg-[#ffffff80] text-center'>
      {loginType === 'github' && <GithubOutlined className='leading-5 text-github' />}
      {loginType === 'qq' && <QQOutlined className='leading-5 text-qq' />}
      {loginType === 'wechat' && <WechatOutlined className='leading-5 text-wechat' />}
    </span>
  </div>
);

export default CommentAvatar;