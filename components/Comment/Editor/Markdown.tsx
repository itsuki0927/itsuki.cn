import { SendOutlined } from '@ant-design/icons';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import Card from '@/components/Card';
import Button from '@/components/Button';
import styles from './style.module.scss';

const DynamicMarkdown = dynamic(() => import('@/components/MarkdownEditor'), {
  ssr: false,
});

type MarkdownEditorProps = {
  onSend: (content: string) => Promise<boolean>;
};

const CommentMarkdownEditor = ({ onSend }: MarkdownEditorProps) => {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');

  return (
    <Card className={styles.markdown} bordered={false} bodyStyle={{ padding: 0 }}>
      <DynamicMarkdown code={content} onChange={setContent} />
      <Button
        type='primary'
        className={styles.send}
        icon={<SendOutlined />}
        disabled={loading}
        onClick={() => {
          if (!content) {
            alert('请输入评论内容');
            return;
          }
          setLoading(true);
          onSend(content).finally(() => {
            setLoading(false);
          });
        }}
      >
        {loading ? '发射中...' : '发射'}
      </Button>
    </Card>
  );
};

export default CommentMarkdownEditor;
