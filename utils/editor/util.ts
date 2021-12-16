/* eslint-disable no-plusplus */
import { isRedo, isUndo } from '../validate';

export const insert = (text: string) => {
  const replaceText = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
  document.execCommand('insertHTML', false, replaceText);
};

export const shouldRecord = (event: KeyboardEvent) =>
  !isUndo(event) &&
  !isRedo(event) &&
  event.key !== 'Meta' &&
  event.key !== 'Control' &&
  event.key !== 'Alt' &&
  !event.key.startsWith('Arrow');

export const findPadding = (text: string) => {
  let i = text.length - 1;
  while (i >= 0 && text[i] !== '\n') i--;
  i++;
  let j = i;
  while (j < text.length && /[ \t]/.test(text[j])) j++;

  return [text.substring(i, j) || '', i, j] as const;
};

export const visit = (editor: HTMLElement, visitor: (el: Node) => 'stop' | undefined) => {
  const queue: Node[] = [];

  if (editor.firstChild) queue.push(editor.firstChild);

  let el = queue.pop();

  while (el) {
    if (visitor(el) === 'stop') break;

    if (el.nextSibling) queue.push(el.nextSibling);
    if (el.firstChild) queue.push(el.firstChild);

    el = queue.pop();
  }
};

export default { findPadding, shouldRecord, insert, visit };
