import classNames from 'classnames';
import { CSSProperties } from 'react';

interface MarkdownBlockProps {
  htmlContent: string;
  className?: string;
  style?: CSSProperties;
}

const MarkdownBlock = ({ htmlContent, className, ...rest }: MarkdownBlockProps) => (
  <div
    className={classNames('markdown-html', className)}
    dangerouslySetInnerHTML={{ __html: htmlContent }}
    {...rest}
  />
);
export default MarkdownBlock;
