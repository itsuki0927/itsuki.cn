/* eslint-disable no-param-reassign */
import { useEffect, useRef } from 'react';
import useMount from '@/hooks/useMount';
import type { MarkdownEditorUtil } from '@/utils/editor';
import hljs from '@/utils/highlight';
import { MarkdownEditorProps } from '.';

const highlight = (editor: HTMLElement) => {
  const code = editor.textContent;
  editor.innerHTML = hljs.highlightAuto(code!, ['markdown']).value;
};

const useEditor = (props: MarkdownEditorProps) => {
  const editorRef = useRef<HTMLElement>(null);
  const codeRef = useRef<MarkdownEditorUtil | null>(null);

  const initMarkdownEditor = async () => {
    codeRef.current = (await import('@/utils/editor')).default(
      editorRef.current!,
      highlight,
      {
        indentOn: /[(\\[{]$/,
        preserveIdent: true,
        catchTab: true,
        addClosing: true,
        history: true,
      }
    );

    codeRef.current.updateCode(props.code);
    codeRef.current.onUpdate(codeParams => {
      if (!editorRef.current) return;
      props.onChange(codeParams);
    });
  };

  useMount(() => {
    initMarkdownEditor();

    return () => codeRef.current!.destroy();
  });

  useEffect(() => {
    if (!codeRef.current || !editorRef.current) return;
    if (props.code !== editorRef.current.textContent) {
      codeRef.current.updateCode(props.code);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.code]);

  useEffect(() => {
    if (!codeRef.current || !props.options) return;

    codeRef.current.updateOptions(props.options);
  }, [props.options]);

  return { editorRef, codeRef };
};

export default useEditor;
