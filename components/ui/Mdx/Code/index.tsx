import dynamic from 'next/dynamic';
import React from 'react';
import { preToCodeBlock, PrePropsType } from './utils';

const CodeBlock = dynamic(() => import('./CodeBlock'));

const Code = (preProps: PrePropsType) => {
  console.log('preProps:', preProps);
  const props = preToCodeBlock(preProps);

  if (props) {
    return <CodeBlock {...props} />;
  }

  return null;
};

export default Code;
