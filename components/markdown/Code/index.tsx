import CodeBlock from './CodeBlock';
import type { PrePropsType } from './utils';
import { preToCodeBlock } from './utils';
import React from 'react';

const Code = (preProps: PrePropsType) => {
  const props = preToCodeBlock(preProps);

  if (props) {
    return <CodeBlock {...props} />;
  }

  return null;
};

export default Code;
