import useMount from '@/hooks/useMount';
import markedToHtml from '@/utils/marked';
import {
  BoldOutlined,
  CodeOutlined,
  EyeOutlined,
  OrderedListOutlined,
  PictureOutlined,
  SendOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { useRef, useState } from 'react';
import Button from '../Button';
import Card from '../Card';
import styles from './style.module.scss';

type MarkdownEditorProps = {
  onSend: (content: string) => Promise<boolean>;
};

const MarkdownEditor = ({ onSend }: MarkdownEditorProps) => {
  const inputRef = useRef<HTMLDivElement>();
  const [preview, setPreview] = useState(false);
  const [loading, setLoading] = useState(false);

  useMount(() => {
    // TODO: 先用any顶一会
    function handlePaste(event: any) {
      event.preventDefault();
      event.target.innerText = event.clipboardData?.getData('text/plain');
    }
    if (inputRef.current) {
      inputRef.current.addEventListener('paste', handlePaste);
    }
    return () => {
      if (inputRef.current) {
        inputRef.current.removeEventListener('paste', handlePaste);
        inputRef.current = undefined;
      }
    };
  });

  const handleInsertContent = (insertString: string) => {
    console.log(inputRef.current);
    if (inputRef.current) {
      const text = inputRef.current.innerText + insertString;
      inputRef.current.innerText = text;
    }
  };

  return (
    <Card className={styles.markdown} bodyStyle={{ padding: 0 }}>
      <div className={styles.markdownContent}>
        <div ref={inputRef as any} contentEditable className={styles.textarea} />
        <div
          style={{ display: preview ? 'block' : 'none' }}
          className={`markdown-html ${styles.preview}`}
          dangerouslySetInnerHTML={{ __html: markedToHtml(inputRef.current?.innerText || '') }}
        ></div>
      </div>

      <div className={styles.toolbar}>
        <div className={styles.action}>
          <BoldOutlined className={styles.icon} onClick={() => handleInsertContent('****')} />
          <OrderedListOutlined className={styles.icon} />
          <UnorderedListOutlined className={styles.icon} />
          <PictureOutlined className={styles.icon} />
          <CodeOutlined className={styles.icon} />
        </div>

        <div>
          <EyeOutlined
            className={styles.icon}
            onClick={() => {
              setPreview(p => !p);
            }}
          />
          <Button
            type='primary'
            className={styles.send}
            icon={<SendOutlined />}
            disabled={loading}
            onClick={() => {
              const content = inputRef.current?.innerText || '';
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
        </div>
      </div>
    </Card>
  );
};

export default MarkdownEditor;
