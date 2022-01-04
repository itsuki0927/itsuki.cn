import { useState } from 'react';
import { initialCommentProfile, USER_COMMENT_PROFILE } from '@/constants/comment';
import { CheckOutlined, ClearOutlined, EditOutlined } from '@/components/icons';
import { IconButton, Input } from '@/components/ui';
import { useLocalStorage, useMount } from '@/hooks';
import { NoReturnFunction } from '@/types/fn';
import styles from './style.module.scss';

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

  const handleInput = (inputValue: any, e: any) => {
    const emitValue = {
      ...value,
      [e.target.name]: inputValue,
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
            onChange={handleInput}
            value={value.nickname}
            placeholder='昵称'
          />
          <Input
            name='email'
            onChange={handleInput}
            value={value.email}
            placeholder='邮箱'
          />
          <Input
            name='website'
            onChange={handleInput}
            value={value.website}
            placeholder='网址'
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
