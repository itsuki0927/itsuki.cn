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
  lineHover?: boolean;
}

export interface HighlightedCodeTextProps {
  codeString: string;
  language: Language;
  highlightLine?: (index: number) => boolean;
  lineNumber?: boolean;
  lineHover?: boolean;
}

const HighlightedCodeText = ({
  codeString,
  language,
  highlightLine,
  lineNumber = true,
  lineHover = true,
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
              className: highlightLine?.(index) ? styles.highlight : '',
              key: index,
              line,
            });
            // 如果只有一行时, 禁用lineNumber和lineHover
            const displayLineNumber = lineNumber && tokens.length > 1;
            const enabledLineHover = lineHover && tokens.length > 1;

            return (
              <div
                className={classNames(
                  styles.line,
                  lineClassName,
                  enabledLineHover && styles.hover,
                  !displayLineNumber && styles.hiddenLineNumber
                )}
                data-testid={highlightLine?.(index) ? 'highlight-line' : 'line'}
                {...lineRestProps}
              >
                {displayLineNumber ? (
                  <div className={styles.lineNumber}>{index + 1}</div>
                ) : null}
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
