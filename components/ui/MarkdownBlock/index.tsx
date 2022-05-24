import classNames from 'classnames';
import { CSSProperties, forwardRef } from 'react';

interface MarkdownBlockProps {
  htmlContent: string;
  className?: string;
  isComments?: boolean;
  style?: CSSProperties;
}

const MarkdownBlock = forwardRef<HTMLDivElement, MarkdownBlockProps>(
  ({ htmlContent, className, isComments = false, ...rest }: MarkdownBlockProps, ref) => (
    <div
      ref={ref}
      className={classNames(
        'prose max-w-none tracking-normal prose-img:hover:cursor-pointer dark:prose-invert',
        isComments ? 'prose-sm' : 'prose-base',
        // 'markdown-html',
        // {
        //   comment: isComments,
        // },
        className
      )}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: htmlContent }}
      {...rest}
    />
  )
);
export default MarkdownBlock;
