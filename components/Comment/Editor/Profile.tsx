import {
  CheckOutlined,
  ClearOutlined,
  CloseOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { useContext, useState } from 'react';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { initialCommentProfile, USER_COMMENT_PROFILE } from '@/constants/comment';
import useLocalStorage from '@/hooks/useLocalStorage';
import markedToHtml from '@/utils/marked';
import { setJSON } from '@/utils/storage';
import CommentContext from '../context';
import styles from './style.module.scss';

export type CommentProfileType = {
  nickname: string;
  email: string;
  website: string;
};

const CommentProfile = () => {
  const [actionVisible, setActionVisible] = useState(false);
  const { reply, setReply } = useContext(CommentContext);
  const [value, onChange] = useLocalStorage(USER_COMMENT_PROFILE, initialCommentProfile);

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
    setJSON(USER_COMMENT_PROFILE, value);
  };

  const handleClear = () => {
    setActionVisible(false);
    setJSON(USER_COMMENT_PROFILE, initialCommentProfile);
    onChange({ ...initialCommentProfile });
  };

  return (
    <div className={styles.profile}>
      {reply?.id && (
        <div className={styles.reply}>
          <p className={styles.profile}>
            <span className={styles.nickname}>
              回复:
              <strong>{` #${reply.nickname}`}</strong>
            </span>
            <CloseOutlined className={styles.close} onClick={() => setReply(undefined)} />
          </p>
          <Card className={styles.content} bodyStyle={{ padding: '4px 11px' }}>
            <div
              className='markdown-html'
              dangerouslySetInnerHTML={{ __html: markedToHtml(reply.content) }}
            />
          </Card>
        </div>
      )}
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

          <Button icon={<CheckOutlined />} onClick={handleSave}>
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
