import React, { useCallback, useMemo, useState } from 'react';
import { MarkdownBlock } from '@/components/ui';
import { MarkdownEditorOptions } from '@/utils/editor';
import markedToHtml from '@/utils/marked';
import styles from './style.module.scss';
import Toolbar from './Toolbar';
import useEditor from './useEditor';

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
  const { editorRef, codeRef } = useEditor(props);

  const handleInsertContent = useCallback(
    (tag: string) => {
      codeRef.current?.insertMarkdownOption(tag);
    },
    [codeRef]
  );

  const toolbarDom = useMemo(
    () => (
      <Toolbar
        onItemClick={handleInsertContent}
        preview={preview}
        onPreview={setPreview}
      />
    ),
    [handleInsertContent, preview]
  );

  return (
    <div className={`${styles.markdown} border border-solid border-[#f9f9f9]`}>
      {toolbarDom}

      <div className={styles.content}>
        <div
          className={`editor language-markdown ${styles.textarea}`}
          ref={editorRef as any}
        />
        {preview && (
          <MarkdownBlock
            className={`markdown-html ${styles.preview}`}
            htmlContent={markedToHtml(editorRef.current?.textContent || '', {
              purify: true,
            })}
          />
        )}
      </div>
    </div>
  );
};

export default MarkdownEditor;
