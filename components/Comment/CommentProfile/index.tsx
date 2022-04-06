import { Input } from '@/components/ui';
import { NoReturnFunction } from '@/types/fn';

export type CommentProfileType = {
  nickname: string;
  email: string;
  website: string;
};

interface CommentProfileProps {
  onChange: NoReturnFunction<CommentProfileType>;
  value: CommentProfileType;
}

const CommentProfile = ({ onChange, value }: CommentProfileProps) => {
  const handleInput = (inputValue: any, e: any) => {
    const emitValue = {
      ...value,
      [e.target.name]: inputValue,
    };
    onChange(emitValue);
  };

  return (
    <div className='flex space-x-3'>
      <Input
        className='flex-grow'
        name='nickname'
        onChange={handleInput}
        value={value.nickname}
        placeholder='昵称'
      />
      <Input
        className='flex-grow'
        name='email'
        onChange={handleInput}
        value={value.email}
        placeholder='邮箱'
      />
      <Input
        className='flex-grow'
        name='website'
        onChange={handleInput}
        value={value.website}
        placeholder='网址'
      />
    </div>
  );
};

export default CommentProfile;
