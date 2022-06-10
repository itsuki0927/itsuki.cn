import classNames from 'classnames';
import { CSSProperties, forwardRef } from 'react';

interface MarkdownBlockProps {
  htmlContent: string;
  className?: string;
  style?: CSSProperties;
}

const MarkdownBlock = forwardRef<HTMLDivElement, MarkdownBlockProps>(
  ({ htmlContent, className, ...rest }: MarkdownBlockProps, ref) => (
    <div
      ref={ref}
      className={classNames(
        'prose prose-zinc tracking-normal dark:prose-invert md:max-w-none',
        className
      )}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: htmlContent }}
      {...rest}
    />
  )
);
export default MarkdownBlock;
