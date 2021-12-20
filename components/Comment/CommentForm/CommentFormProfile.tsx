import { useState } from 'react';
import { CheckOutlined, ClearOutlined, EditOutlined } from '@/components/icons';
import { IconButton, Input } from '@/components/ui';
import { initialCommentProfile, USER_COMMENT_PROFILE } from '@/constants/comment';
import { useLocalStorage, useMount } from '@/hooks';
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
    <div className={styles.commentProfile}>
      {!actionVisible && (
        <div className={styles.edit}>
          <Input
            name='nickname'
            onChange={e => handleInput(e)}
            value={value.nickname}
            placeholder='昵称'
          />
          <Input
            name='email'
            onChange={e => handleInput(e)}
            value={value.email}
            placeholder='邮箱'
            style={{ margin: '0 12px' }}
          />
          <Input
            name='website'
            onChange={e => handleInput(e)}
            value={value.website}
            placeholder='网址'
            style={{ marginRight: 12 }}
          />

          <IconButton type='ghost' icon={<CheckOutlined />} onClick={handleSave}>
            保存
          </IconButton>
        </div>
      )}

      {actionVisible && (
        <p className={styles.nickname}>
          <span>{value.nickname}</span>
          <IconButton
            type='text'
            icon={<EditOutlined />}
            onClick={() => {
              setActionVisible(false);
            }}
          >
            编辑
          </IconButton>
          <IconButton
            style={{ marginLeft: 6 }}
            type='text'
            icon={<ClearOutlined />}
            onClick={handleClear}
          >
            清空
          </IconButton>
        </p>
      )}
    </div>
  );
};

export default CommentProfile;
