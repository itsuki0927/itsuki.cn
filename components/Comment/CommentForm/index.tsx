import dynamic from 'next/dynamic';
import React, { PropsWithChildren, useState } from 'react';
import { SendOutlined } from '@/components/icons';
import { Button, Card } from '@/components/ui';
import { getGravatarUrl } from '@/transformers/index';
import styles from './style.module.scss';

const DynamicMarkdown = dynamic(() => import('@/components/common/MarkdownEditor'), {
  ssr: false,
});

const noPadding = { padding: 0 };

interface CommentFormProps {
  onSend: (content: string) => Promise<boolean>;
}
const CommentForm = ({ onSend, children }: PropsWithChildren<CommentFormProps>) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!content) {
      alert('请输入评论内容');
      return;
    }
    setLoading(true);
    onSend(content).then(valid => {
      if (valid) {
        setContent('');
      }
      setLoading(false);
    });
  };

  return (
    <Card bodyStyle={noPadding} bordered={false}>
      <div className={styles.form}>
        <img
          className={styles.avatar}
          // src={getGravatarUrl(profile.email)}
          src={getGravatarUrl('fdd')}
          width={80}
          height={80}
          alt='cover'
        />
        <div className={styles.wrapper}>
          {children}

          <Card className={styles.markdown} bordered={false} bodyStyle={{ padding: 0 }}>
            <DynamicMarkdown code={content} onChange={setContent} />

            <div className={styles.actionBar}>
              <Button
                type='primary'
                className={styles.send}
                icon={<SendOutlined />}
                disabled={loading}
                onClick={handleSend}
              >
                {loading ? '发射中...' : '发射'}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </Card>
  );
};

export default CommentForm;
