import { getJSON, setJSON } from '@/utils/storage';
import { useEffect } from 'react';
import Button from '../Button';
import styles from './style.module.scss';

export type CommentInfoType = {
  nickname: string;
  email: string;
  website: string;
};
type CommentInfoProps = {
  value: CommentInfoType;
  onChange: (value: CommentInfoType) => void;
};

const CommentInfo = ({ value, onChange }: CommentInfoProps) => {
  useEffect(() => {
    const initialValue = getJSON('commentInfo');
    if (initialValue) {
      onChange(initialValue);
    }
  }, [onChange]);

  const handleInput = (e: any) => {
    const emitValue = {
      ...value,
      [e.target.name]: e.target.value,
    };
    onChange(emitValue);
  };

  return (
    <div style={{ display: 'flex', marginBottom: 12 }}>
      <input
        name='nickname'
        onChange={e => handleInput(e)}
        value={value.nickname}
        className={styles.input}
        placeholder='昵称'
      />
      <input
        name='email'
        onChange={e => handleInput(e)}
        value={value.email}
        className={styles.input}
        placeholder='邮箱'
        style={{ margin: '0 12px' }}
      />
      <input
        name='website'
        onChange={e => handleInput(e)}
        value={value.website}
        className={styles.input}
        placeholder='网址'
        style={{ marginRight: 12 }}
      />

      <Button
        onClick={() => {
          if (Object.keys(value).some(v => value[v] === '')) {
            alert(`请输入必填字段`);
            return;
          }
          setJSON('commentInfo', value);
        }}
      >
        保存
      </Button>
    </div>
  );
};

export default CommentInfo;
