import classNames from 'classnames';
import React, { useMemo, useState } from 'react';
import { MarkdownBlock } from '@/components/ui';
import { MarkdownEditorOptions } from '@/utils/editor';
import markedToHtml from '@/utils/marked';
import styles from './style.module.scss';
import Toolbar from './Toolbar';
import useEditor from './useEditor';

export { useEditor };

export type MarkdownEditorProps = {
  // eslint-disable-next-line react/no-unused-prop-types
  code: string;
  // eslint-disable-next-line react/no-unused-prop-types
  onChange: (code: string) => void;
  // eslint-disable-next-line react/no-unused-prop-types
  highlight?: (e: HTMLElement) => void;
  // eslint-disable-next-line react/no-unused-prop-types
  options?: Partial<MarkdownEditorOptions>;
  // eslint-disable-next-line react/no-unused-prop-types
  style?: React.CSSProperties;
};

const MarkdownEditor = (props: MarkdownEditorProps) => {
  const [preview, setPreview] = useState(false);
  const { editorRef } = useEditor(props);

  const toolbarDom = useMemo(
    () => <Toolbar preview={preview} onPreview={setPreview} />,
    [preview]
  );

  return (
    <div
      className={`${styles.markdown} border border-solid border-white-1 dark:border-white-1--dark`}
    >
      <div className={styles.content}>
        <div
          className={`editor language-markdown ${styles.textarea}`}
          ref={editorRef as any}
        />
        <MarkdownBlock
          className={classNames(styles.preview, {
            [styles.enable]: preview,
          })}
          htmlContent={markedToHtml(editorRef.current?.textContent || '', {
            purify: true,
          })}
        />
      </div>

      {toolbarDom}
    </div>
  );
};

export default MarkdownEditor;
