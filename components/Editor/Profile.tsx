import { COMMENT_STORAGE_KEY, initialCommentProfile } from '@/constants/comment';
import { getJSON, remove, setJSON } from '@/utils/storage';
import { CheckOutlined, ClearOutlined, EditOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import Button from '../Button';
import styles from './style.module.scss';

export type CommentProfileType = {
  nickname: string;
  email: string;
  website: string;
};
type CommentProfileProps = {
  value: CommentProfileType;
  onChange: (value: CommentProfileType) => void;
};

const CommentProfile = ({ value, onChange }: CommentProfileProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const initialValue = getJSON(COMMENT_STORAGE_KEY);
    if (initialValue) {
      onChange(initialValue);
      setVisible(true);
    }
  }, [onChange]);

  const handleInput = (e: any) => {
    const emitValue = {
      ...value,
      [e.target.name]: e.target.value,
    };
    onChange(emitValue);
  };

  const handleSave = () => {
    if (Object.values(value).some(v => !v)) {
      alert(`请输入必填字段`);
      return;
    }
    setVisible(true);
    setJSON(COMMENT_STORAGE_KEY, value);
  };

  const handleClear = () => {
    setVisible(false);
    remove(COMMENT_STORAGE_KEY);
    onChange({ ...initialCommentProfile });
  };

  return (
    <div className={styles.profile}>
      {!visible && (
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

          <Button icon={<CheckOutlined />} onClick={handleSave}>
            保存
          </Button>
        </div>
      )}

      {visible && (
        <p className={styles.nickname}>
          <span>{value.nickname}</span>
          <Button
            type='text'
            icon={<EditOutlined />}
            onClick={() => {
              setVisible(false);
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