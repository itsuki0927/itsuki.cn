/* eslint-disable no-useless-escape */
/* eslint-disable no-case-declarations */
import { forwardRef, useMemo, useRef } from "react";
import type { RichTextareaHandle, StyleOrRender } from "rich-textarea";
import { RichTextarea, createRegexRenderer } from "rich-textarea";

interface CommentInputProps {
  value: string;
  onChange: (value: string) => void;
}

const CommentInput = forwardRef<RichTextareaHandle, CommentInputProps>(
  ({ value, onChange }, ref) => {
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
        className="text-zinc-600 font-normal w-full !p-2 text-sm focus:outline-none"
        onChange={(e) => {
          onChange(e.target.value);
        }}
        placeholder="说点什么?"
        ref={(currentRef) => {
          if (ref && "current" in ref) {
            ref.current = currentRef;
          }
          innerRef.current = currentRef;
        }}
        style={{
          width: "100%",
          minHeight: "100px",
        }}
        value={value}
      >
        {regexRenderer}
      </RichTextarea>
    );
  },
);

CommentInput.displayName = "CommentInput";

export default CommentInput;