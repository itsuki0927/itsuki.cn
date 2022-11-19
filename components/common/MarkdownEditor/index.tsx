'use client';

import classNames from 'classnames';
import React, { ReactNode, useState } from 'react';
import MarkdownBlock from '@/components/ui/MarkdownBlock';
import markedToHtml from '@/libs/marked';
import { MarkdownEditorOptions } from '@/utils/editor';
import s from './style.module.css';
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
  editorRef: any;
  codeRef: any;
}) => ReactNode;

const MarkdownEditor = ({
  className,
  children = dom => dom,
  header,
  footer,
  contentClassName = '',
  ...props
}: MarkdownEditorProps) => {
  const [preview, setPreview] = useState(false);
  const { editorRef, codeRef } = useEditor(props);
  const { placeholder } = props;

  const onPreview = (previewProps: boolean) => {
    setPreview(previewProps);
  };

  const defualtDom = (
    <div className='relative'>
      <div
        placeholder={placeholder}
        className={classNames(
          s.root,
          'overflow-y-scroll p-3 text-base leading-5 sm:max-h-[460px]',
          contentClassName
        )}
        ref={editorRef as any}
      />
      <MarkdownBlock
        className={classNames(
          'absolute left-0 right-0 top-0 bottom-0 cursor-not-allowed overflow-y-scroll bg-white-1 p-3 transition-all duration-300 ',
          preview ? 'z-10 h-full' : '-z-10 h-0'
        )}
        htmlContent={markedToHtml(props.code || '', {
          purify: true,
        })}
      />
    </div>
  );

  const params = { preview, onPreview, codeRef, editorRef };

  return (
    <div
      className={classNames(
        'relative border border-solid border-gray-200 bg-white text-sm',
        className
      )}
    >
      {header?.(params)}

      {children?.(defualtDom, params)}

      {footer?.(params)}
    </div>
  );
};

export default MarkdownEditor;
