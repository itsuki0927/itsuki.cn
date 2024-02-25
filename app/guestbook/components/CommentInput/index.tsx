/* eslint-disable no-useless-escape */
/* eslint-disable no-case-declarations */
import clsx from 'clsx';
import { forwardRef, useMemo, useRef } from 'react';
import type { RichTextareaHandle, StyleOrRender } from 'rich-textarea';
import { RichTextarea, createRegexRenderer } from 'rich-textarea';

interface CommentInputProps {
  className?: string;
  value: string;
  onChange: (value: string) => void;
}

const CommentInput = forwardRef<RichTextareaHandle, CommentInputProps>(
  ({ value, onChange, className }, ref) => {
    const regexRenderer = useMemo(() => {
      const matchers: [RegExp, StyleOrRender][] = [
        [
          /https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+/g,
          ({ children, key, value: href }) => (
            <a
              className="text-blue-500"
              href={href}
              key={key}
              rel="noreferrer"
              target="_blank"
            >
              {children}
            </a>
          ),
        ],
      ];
      return createRegexRenderer(matchers);
    }, []);

    const innerRef = useRef<RichTextareaHandle | null>(null);

    return (
      <RichTextarea
        autoHeight
        className={clsx(
          'block flex-1 shrink-0 resize-none border-0 bg-transparent !p-2 text-sm leading-6 text-zinc-800 placeholder-zinc-400 outline-none focus:outline-none focus:ring-0 dark:text-zinc-200 dark:placeholder-zinc-500',
          className,
        )}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        placeholder="良言一句三冬暖, 恶语伤人六月寒（请友善发言)"
        ref={(currentRef) => {
          if (ref && 'current' in ref) {
            ref.current = currentRef;
          }
          innerRef.current = currentRef;
        }}
        style={{
          width: '100%',
          minHeight: '100px',
        }}
        value={value}
      >
        {regexRenderer}
      </RichTextarea>
    );
  },
);

CommentInput.displayName = 'CommentInput';

export default CommentInput;
