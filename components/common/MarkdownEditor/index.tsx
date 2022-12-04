'use client';

import classNames from 'classnames';
import React, {
  MutableRefObject,
  ReactNode,
  RefObject,
  useCallback,
  useMemo,
  useState,
} from 'react';
import ReactMarkdown from 'react-markdown';
import { MarkdownEditorOptions, MarkdownEditorUtil } from '@/utils/editor';
import s from './style.module.css';
import useEditor from './useEditor';
import { markdownComponents } from '@/components/ui/Mdx';

export { useEditor };

export type MarkdownEditorProps = {
  code: string;
  onChange: (code: string) => void;
  options?: Partial<MarkdownEditorOptions>;
  style?: React.CSSProperties;
  placeholder?: string;
  className?: string;
  children?: AppendArgument<RenderProps, JSX.Element>;
  header?: RenderProps;
  footer?: RenderProps;
  contentClassName?: string;
};

type AppendArgument<Fn, A> = Fn extends (...args: infer P) => infer R
  ? (...args: [A, ...P]) => R
  : never;

type RenderProps = (props: {
  preview: boolean;
  onPreview: (preview: boolean) => void;
  editorRef: RefObject<HTMLDivElement>;
  codeRef: MutableRefObject<MarkdownEditorUtil | null>;
}) => ReactNode;

const MarkdownEditor = ({
  className,
  children = dom => dom,
  header,
  footer,
  contentClassName = '',
  placeholder,
  style,
  ...rest
}: MarkdownEditorProps) => {
  const [preview, setPreview] = useState(false);
  const { editorRef, codeRef } = useEditor(rest);

  const onPreview = useCallback((previewProps: boolean) => {
    setPreview(previewProps);
  }, []);

  const defualtContentDom = (
    <div className='relative'>
      <div
        placeholder={placeholder}
        className={classNames(
          s.root,
          'overflow-y-scroll p-3 text-base leading-5 sm:max-h-[460px]',
          contentClassName
        )}
        ref={editorRef}
      />
      {preview ? (
        <ReactMarkdown
          className={classNames(
            'absolute left-0 right-0 top-0 bottom-0 cursor-not-allowed overflow-y-scroll bg-gray-50 p-3 transition-all duration-300 ',
            preview ? 'z-10 h-full' : '-z-10 h-0'
          )}
          components={markdownComponents}
        >
          {rest.code}
        </ReactMarkdown>
      ) : null}
    </div>
  );

  const params = useMemo(
    () => ({ preview, onPreview, codeRef, editorRef }),
    [codeRef, editorRef, preview, onPreview]
  );

  return (
    <div
      className={classNames(
        'relative border border-solid border-gray-200 bg-white text-sm',
        className
      )}
      style={style}
    >
      {header?.(params)}

      {children?.(defualtContentDom, params)}

      {footer?.(params)}
    </div>
  );
};

export default MarkdownEditor;
