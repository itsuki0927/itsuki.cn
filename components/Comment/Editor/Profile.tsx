import Button from '@/components/Button';
import Card from '@/components/Card';
import { USER_COMMENT_PROFILE, initialCommentProfile } from '@/constants/comment';
import markedToHtml from '@/utils/marked';
import { getJSON, remove, setJSON } from '@/utils/storage';
import { CheckOutlined, ClearOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons';
import { useContext, useEffect, useState } from 'react';
import CommentContext from '../context';
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
  const { reply, setReply } = useContext(CommentContext);

  useEffect(() => {
    const initialValue = getJSON(USER_COMMENT_PROFILE);
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
    setJSON(USER_COMMENT_PROFILE, value);
  };

  const handleClear = () => {
    setVisible(false);
    remove(USER_COMMENT_PROFILE);
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
            ></div>
          </Card>
        </div>
      )}
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
