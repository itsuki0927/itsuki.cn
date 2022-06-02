import classNames from 'classnames';
import React, { ReactNode, useState } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { EyeCloseFilled, EyeFilled, SmileFilled } from '@/components/icons';
import { MarkdownBlock } from '@/components/ui';
import markedToHtml from '@/libs/marked';
import { MarkdownEditorOptions } from '@/utils/editor';
import s from './style.module.css';
import useEditor from './useEditor';

export const EMOJIS = [
  ...['😃', '😂', '😅', '😉', '😌', '😔', '😓', '😢', '😍', '😘', '😜', '😡'],
  ...['😤', '😭', '😱', '😳', '😵', '🌚'],
  ...['🙏', '👆', '👇', '👌', '🤘', '👍', '👎', '💪', '👏'],
  ...['🌻', '🌹', '💊', '🐶', '❤️‍🔥', '💔', '💩', '👻', '🚩'],
];

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
  children?: ReactNode;
};

const MarkdownEditor = ({ className, children, ...props }: MarkdownEditorProps) => {
  const [preview, setPreview] = useState(false);
  const { editorRef, codeRef } = useEditor(props);
  const { placeholder } = props;

  const insertEmoji = (emoji: string) => {
    codeRef.current?.insertEmoji(emoji);
  };

  return (
    <div className={classNames('relative bg-white-1 text-sm', className)}>
      <div className='relative'>
        <div
          placeholder={placeholder}
          className={classNames(
            s.root,
            'max-h-[460px] min-h-[120px]  overflow-y-scroll p-3 text-base leading-5'
          )}
          ref={editorRef as any}
        />
        <MarkdownBlock
          className={classNames(
            'absolute left-0 right-0 top-0 bottom-0 cursor-not-allowed overflow-y-scroll bg-white-2 p-3 transition-all duration-300 ',
            preview ? 'z-10 h-full' : '-z-10 h-0'
          )}
          htmlContent={markedToHtml(props.code || '', {
            purify: true,
          })}
        />
      </div>

      <div className='flex justify-between bg-white-2 leading-9'>
        <div className='flex'>
          <button
            type='button'
            className={classNames(
              'px-3 text-xxs text-gray-3 hover:bg-white-3 hover:text-dark-1'
            )}
            onClick={() => {
              setPreview(!preview);
            }}
          >
            <SwitchTransition mode='out-in'>
              <CSSTransition
                key={preview ? 'preview' : 'edit'}
                addEndListener={(node, done) =>
                  node.addEventListener('transitionend', done, false)
                }
                classNames='move'
              >
                {preview ? <EyeCloseFilled key='edit' /> : <EyeFilled key='preview' />}
              </CSSTransition>
            </SwitchTransition>
          </button>

          <button
            type='button'
            className={classNames(
              s.emoji,
              'px-3 text-xxs text-gray-3 hover:bg-white-3 hover:text-dark-1'
            )}
          >
            <SmileFilled />

            <div
              className={classNames(
                s.emojiList,
                'absolute left-0 right-0 top-0 bottom-8 bg-white-2 p-3 text-left opacity-80 transition-all duration-300 '
              )}
            >
              {EMOJIS.map(emoji => (
                <button
                  type='button'
                  className='inline-block cursor-pointer rounded-sm py-1 px-2 text-xl hover:bg-[#ccc]'
                  onClick={() => insertEmoji(emoji)}
                  key={emoji}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </button>
        </div>

        {children}
      </div>
    </div>
  );
};

export default MarkdownEditor;
