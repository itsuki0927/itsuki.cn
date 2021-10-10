/* eslint-disable no-param-reassign */
import React, { useCallback, useMemo, useState } from 'react';
import markedToHtml from '@/utils/marked';
import styles from './style.module.scss';
// eslint-disable-next-line import/no-cycle
import useEditor from './useEditor';
import { MarkdownEditorOptions } from '@/utils/editor';
import Toolbar from './Toolbar';
import Card from '../Card';

export { useEditor };

export type MarkdownEditorProps = {
  code: string;
  onChange: (code: string) => void;
  highlight?: (e: HTMLElement) => void;
  options?: Partial<MarkdownEditorOptions>;
  style?: React.CSSProperties;
};

const MarkdownEditor = (props: MarkdownEditorProps) => {
  const [preview, setPreview] = useState(false);
  const editorRef = useEditor(props);

  const handleInsertContent = useCallback(
    (tag: string) => {
      if (tag === 'preview') {
        setPreview(!preview);
      }
    },
    [preview]
  );

  const toolbarDom = useMemo(
    () => <Toolbar onItemClick={handleInsertContent} />,
    [handleInsertContent]
  );

  return (
    <Card className={styles.markdown} bodyStyle={{ padding: 0 }}>
      {toolbarDom}

      <div className={styles.markdownContent}>
        <div className={`editor language-markdown ${styles.textarea}`} ref={editorRef} />
        {preview && (
          <div
            className={`markdown-html ${styles.preview}`}
            dangerouslySetInnerHTML={{
              __html: markedToHtml(editorRef.current?.textContent || '', {
                purify: true,
              }),
            }}
          />
        )}
      </div>
    </Card>
  );
};

export default MarkdownEditor;
