'use client';

import { useState } from 'react';

type CopiedValue = string | null;
type CopyFn = (text: string) => Promise<boolean>; // Return success

/**
 * 回滚方式
 *
 * @param text 复制的文本
 */
const fallbackCopyTextToClipboard = (text: string) => {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'absolute';
  textarea.style.left = '-99999px';
  document.body.appendChild(textarea);

  const rangeCount = document.getSelection()?.rangeCount || 0;
  const select = rangeCount > 0 ? document.getSelection()?.getRangeAt(0) : null;
  textarea.select();
  document.execCommand('copy');

  document.body.removeChild(textarea);
  if (select) {
    document.getSelection()?.removeAllRanges();
    document.getSelection()?.addRange(select);
  }
};

/**
 * 剪切板复制
 *
 * @param text 需要复制的内容
 */
export const copyTextToClipboard = (text: string) => {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return Promise.resolve(true);
  }
  return navigator.clipboard.writeText(text).then(
    () => {
      console.log('[ Async: Copying to clipboard was successful! ]');
      return true;
    },
    err => {
      console.error('Async: Could not copy text: ', err);
      return false;
    }
  );
};

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
