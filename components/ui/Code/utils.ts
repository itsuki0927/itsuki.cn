import { Language } from 'prism-react-renderer';
import { JSXElementConstructor, ReactElement, ReactNode } from 'react';

export interface PrePropsType {
  children?: ReactNode;
}

export const preToCodeBlock = (preProps: PrePropsType) => {
  const children = preProps.children as
    | ReactElement<any, string | JSXElementConstructor<any>>
    | undefined;

  if (children && children.props) {
    const { children: codeString, className = '', ...props } = children.props;

    const matches = className.match(/language-(?<lang>.*)/);
    return {
      className,
      codeString: codeString.trim(),
      language:
        matches && matches.groups && matches.groups.lang
          ? (matches.groups.lang as Language)
          : ('' as Language),
      ...props,
    };
  }
};

const RE = /{([\d,-]+)}/;

export const calculateLinesToHighlight = (metastring: string | null) => {
  if (!metastring || !RE.test(metastring)) {
    return () => false;
  }
  const lineNumbers = RE.exec(metastring)![1]
    .split(',')
    .map(v => v.split('-').map(val => parseInt(val, 10)));
  return (index: number) => {
    const lineNumber = index + 1;
    const inRange = lineNumbers.some(([start, end]) =>
      end ? lineNumber >= start && lineNumber <= end : lineNumber === start
    );
    return inRange;
  };
};

const RETitle = /title=[a-zA-Z\u4e00-\u9fa5](.+)/;

export const hasTitle = (metastring: string | null) => {
  if (!metastring || !RETitle.test(metastring)) {
    return 'test copy';
  }
  return RETitle.exec(metastring)![0].split('title=')[1];
};
