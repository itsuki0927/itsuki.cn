import theme from 'prism-react-renderer/themes/github';
import classNames from 'classnames';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import { calculateLinesToHighlight, hasTitle } from './utils';
import styles from './style.module.scss';

export interface CodeBlockProps {
  codeString: string;
  language: Language;
  metastring: string | null;
  lineNumber?: boolean;
}

export interface HighlightedCodeTextProps {
  codeString: string;
  language: Language;
  highlightLine?: (index: number) => boolean;
  lineNumber?: boolean;
}

const HighlightedCodeText = ({
  codeString,
  language,
  highlightLine,
  lineNumber = true,
}: HighlightedCodeTextProps) => {
  return (
    <Highlight {...defaultProps} theme={theme} code={codeString} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={classNames(styles.pre, className)}
          style={{
            ...style,
            backgroundColor: 'transparent',
          }}
        >
          {tokens.map((line, index) => {
            const { className: lineClassName, ...lineRestProps } = getLineProps({
              className: highlightLine?.(index) ? styles.highlightLine : '',
              key: index,
              line,
            });
            return (
              <div
                className={classNames(
                  styles.line,
                  !lineNumber && styles.hiddenLineNumber,
                  lineClassName
                )}
                data-testid={highlightLine?.(index) ? 'highlight-line' : 'line'}
                {...lineRestProps}
              >
                {lineNumber ? <div className={styles.lineNumber}>{index + 1}</div> : null}
                <div className={styles.lineContent}>
                  {line.map((token, key) => {
                    return (
                      <span
                        data-testid='content-line'
                        // eslint-disable-next-line react/no-array-index-key
                        key={key}
                        {...getTokenProps({
                          key,
                          token,
                        })}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </pre>
      )}
    </Highlight>
  );
};

const CodeBlock = ({ codeString, language, metastring, ...rest }: CodeBlockProps) => {
  const highlightLineFn = calculateLinesToHighlight(metastring);
  const title = hasTitle(metastring);

  return (
    <div className={styles.codeBlock}>
      {title ? <div className={styles.title}>{title}</div> : null}
      <HighlightedCodeText
        codeString={codeString}
        language={language}
        highlightLine={highlightLineFn}
        {...rest}
      />
    </div>
  );
};

export default CodeBlock;
