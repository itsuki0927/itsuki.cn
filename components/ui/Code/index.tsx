import dynamic from 'next/dynamic';
import React from 'react';
import { preToCodeBlock, PrePropsType } from './utils';

const CodeBlock = dynamic(() => import('./CodeBlock'));

const Code = (preProps: PrePropsType) => {
  const props = preToCodeBlock(preProps);

  if (props) {
    return <CodeBlock {...props} lineNumber={false} />;
  }

  return null;
};

export default Code;
