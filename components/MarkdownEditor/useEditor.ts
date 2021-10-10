/* eslint-disable no-param-reassign */
import React, { useEffect } from 'react';
import useMount from '@/hooks/useMount';
import { MarkdownEditorUtil } from '@/utils/editor';
import hljs from '@/utils/highlight';
// eslint-disable-next-line import/no-cycle
import { MarkdownEditorProps } from '.';
import { getCaretOffset, setCurrentCursorPosition } from './util';

const highlight = (editor: HTMLElement) => {
  const code = editor.textContent;
  editor.innerHTML = hljs.highlightAuto(code!, ['markdown']).value;
};

const useEditor = (props: MarkdownEditorProps) => {
  const editorRef = React.useRef<HTMLDivElement>(null);
  const jarRef = React.useRef<MarkdownEditorUtil | null>(null);
  const [cursorOffset, setCursorOffset] = React.useState(0);

  const initMarkdownEditor = async () => {
    if (editorRef.current) {
      const markdownEditorUtil = (await import('@/utils/editor')).default;
      jarRef.current = markdownEditorUtil(editorRef.current, highlight, {
        indentOn: /[(\\[{]$/,
        preserveIdent: true,
        catchTab: true,
        addClosing: true,
        history: true,
      });

      jarRef.current.updateCode(props.code);
      jarRef.current.onUpdate(codeParams => {
        if (!editorRef.current) return;

        setCursorOffset(getCaretOffset(editorRef.current));
        props.onChange(codeParams);
      });
    }
  };

  useMount(() => {
    if (!editorRef.current || typeof window === undefined) return;

    initMarkdownEditor();

    return () => jarRef.current!.destroy();
  });

  useEffect(() => {
    if (!jarRef.current || !editorRef.current) return;
    jarRef.current.updateCode(props.code);
    setCurrentCursorPosition(editorRef.current, cursorOffset);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.code]);

  useEffect(() => {
    if (!jarRef.current || !props.options) return;

    jarRef.current.updateOptions(props.options);
  }, [props.options]);

  return editorRef;
};

export default useEditor;
