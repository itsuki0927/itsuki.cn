import { CheckOutlined, ClearOutlined, EditOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Button } from '@/components/ui';
import { initialCommentProfile, USER_COMMENT_PROFILE } from '@/constants/comment';
import useLocalStorage from '@/hooks/useLocalStorage';
import useMount from '@/hooks/useMount';
import styles from './style.module.scss';

export type CommentProfileType = {
  nickname: string;
  email: string;
  website: string;
};

interface CommentProfileProps {
  onChange: (value: CommentProfileType) => void;
  value: CommentProfileType;
}

const CommentProfile = ({ onChange, value }: CommentProfileProps) => {
  const [actionVisible, setActionVisible] = useState(false);
  const [storageValue, setStorageValue] = useLocalStorage(
    USER_COMMENT_PROFILE,
    initialCommentProfile
  );

  useMount(() => {
    if (storageValue !== value && Object.values(storageValue).every(Boolean)) {
      onChange(storageValue);
      setActionVisible(true);
    }
  });

  const handleInput = (e: any) => {
    const emitValue = {
      ...value,
      [e.target.name]: e.target.value,
    };
    onChange(emitValue);
  };

  const handleSave = () => {
    if (Object.values(value).some(v => !v)) {
      alert('请输入必填字段');
      return;
    }
    setActionVisible(true);
    setStorageValue(value);
  };

  const handleClear = () => {
    setActionVisible(false);
    onChange(initialCommentProfile);
    setStorageValue(initialCommentProfile);
  };

  return (
    <div className={styles.profile}>
      {!actionVisible && (
        <div className={styles.edit}>
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

          <Button type='dashed' icon={<CheckOutlined />} onClick={handleSave}>
            保存
          </Button>
        </div>
      )}

      {actionVisible && (
        <p className={styles.nickname}>
          <span>{value.nickname}</span>
          <Button
            type='text'
            icon={<EditOutlined />}
            onClick={() => {
              setActionVisible(false);
            }}
          >
            编辑
          </Button>
          <Button
            style={{ marginLeft: 6 }}
            type='text'
            icon={<ClearOutlined />}
            onClick={handleClear}
          >
            清空
          </Button>
        </p>
      )}
    </div>
  );
};

export default CommentProfile;