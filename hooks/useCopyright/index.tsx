import { META } from '@/configs/app';
import { off, on, preventDefault } from '@/utils/events';
import { getSelection } from '@/utils/editor/cursor';

const copyrightText = () =>
  [
    '',
    '',
    `作者: ${META.author}`,
    // eslint-disable-next-line no-restricted-globals
    `链接: ${location.href}`,
    `来源: ${META.title}`,
    '著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。',
    '',
  ].join('\n');

const buildCopyrightText = (content: string) => content + copyrightText();

const useCopyright = () => {
  const handleCopyright = (event: ClipboardEvent) => {
    const selection = getSelection();
    if (!selection) return;
    if (event.clipboardData) {
      const content = selection.toString() ?? '';
      event.clipboardData.setData('text/plain', buildCopyrightText(content));
      event.clipboardData.setData('text/html', buildCopyrightText(content));
      preventDefault(event);
    }
  };
  const enableCopyright = () => on(document, 'copy', handleCopyright);
  const disableCopyright = () => off(document, 'copy', handleCopyright);

  return {
    enableCopyright,
    disableCopyright,
  } as const;
};

export default useCopyright;
