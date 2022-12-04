/* eslint-disable no-param-reassign */
import { useEffect, useMemo, useRef } from 'react';
import { useMount } from '@/hooks';
import type { MarkdownEditorUtil } from '@/utils/editor';
import { MarkdownEditorProps } from '.';

const highlight = () => {};

const useEditor = ({ code, onChange, options }: MarkdownEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<MarkdownEditorUtil | null>(null);

  const initMarkdownEditor = async () => {
    codeRef.current = (await import('@/utils/editor/lib')).default(
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

    codeRef.current.updateCode(code);
    codeRef.current.onUpdate(codeParams => {
      if (!editorRef.current) return;
      onChange(codeParams);
    });
  };

  useMount(() => {
    initMarkdownEditor();

    return () => codeRef.current?.destroy();
  });

  useEffect(() => {
    if (!codeRef.current || !editorRef.current) return;
    if (code !== editorRef.current.textContent) {
      codeRef.current.updateCode(code);
    }
  }, [code]);

  useEffect(() => {
    if (!codeRef.current || !options) return;

    codeRef.current.updateOptions(options);
  }, [options]);

  const returnedValue = useMemo(
    () => ({
      editorRef,
      codeRef,
    }),
    []
  );

  return returnedValue;
};

export default useEditor;
