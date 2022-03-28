import classNames from 'classnames';
import { CSSProperties } from 'react';

interface MarkdownBlockProps {
  htmlContent: string;
  className?: string;
  isComments?: boolean;
  style?: CSSProperties;
}

const MarkdownBlock = ({
  htmlContent,
  className,
  isComments,
  ...rest
}: MarkdownBlockProps) => (
  <div
    className={classNames(
      'markdown-html',
      {
        comments: isComments,
      },
      className
    )}
    dangerouslySetInnerHTML={{ __html: htmlContent }}
    {...rest}
  />
);
export default MarkdownBlock;
