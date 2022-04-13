import classNames from 'classnames';
import { CSSProperties, forwardRef } from 'react';

interface MarkdownBlockProps {
  htmlContent: string;
  className?: string;
  isComments?: boolean;
  style?: CSSProperties;
}

const MarkdownBlock = forwardRef<HTMLDivElement, MarkdownBlockProps>(
  ({ htmlContent, className, isComments, ...rest }: MarkdownBlockProps, ref) => (
    <div
      ref={ref}
      className={classNames(
        'markdown-html',
        {
          comment: isComments,
        },
        className
      )}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: htmlContent }}
      {...rest}
    />
  )
);
export default MarkdownBlock;
