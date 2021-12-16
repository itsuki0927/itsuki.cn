import { useState } from 'react';
import { copyTextToClipboard } from '@/utils';

type CopiedValue = string | null;
type CopyFn = (text: string) => Promise<boolean>; // Return success

const useCopyToClipboard = () => {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null);

  const copy: CopyFn = text =>
    copyTextToClipboard(text).then(isSuccess => {
      setCopiedText(isSuccess ? text : null);
      return isSuccess;
    });

  return [copiedText, copy] as const;
};

export default useCopyToClipboard;
