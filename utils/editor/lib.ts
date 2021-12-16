/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import debounce from '../debounce';
import { preventDefault } from '../events';
import { isEnter, isRedo, isShift, isTab, isUndo } from '../validate';
import { findPadding, insert, shouldRecord, visit } from './util';
import { textAfterCursor, textBeforeCursor, getSelection } from './cursor';

const globalWindow = window;

type Position = {
  start: number;
  end: number;
  dir?: '->' | '<-';
};

export type MarkdownEditorOptions = {
  tab: string;
  indentOn: RegExp;
  spellcheck: boolean;
  catchTab: boolean;
  preserveIdent: boolean;
  addClosing: boolean;
  history: boolean;
  window: typeof window;
};

type HistoryRecord = {
  html: string;
  pos: Position;
};

export type MarkdownEditorUtil = ReturnType<typeof markdownEditorUtil>;

function markdownEditorUtil(
  editor: HTMLElement,
  highlight: (e: HTMLElement, pos?: Position) => void,
  opt: Partial<MarkdownEditorOptions> = {}
) {
  const options: MarkdownEditorOptions = {
    tab: '\t',
    indentOn: /{$/,
    spellcheck: false,
    catchTab: true,
    preserveIdent: true,
    addClosing: true,
    history: true,
    window: globalWindow,
    ...opt,
  };

  const { window } = options;
  const { document } = window;

  const listeners: [string, any][] = [];
  const history: HistoryRecord[] = [];
  let at = -1;
  let focus = false;
  let callback: (code: string) => void | undefined;
  let prev: string;

  editor.setAttribute('contenteditable', 'plaintext-only');
  editor.setAttribute('spellcheck', options.spellcheck ? 'true' : 'false');
  editor.style.outline = 'none';
  editor.style.overflowWrap = 'break-word';
  editor.style.overflowY = 'auto';
  editor.style.whiteSpace = 'pre-wrap';

  let isLegacy = false;

  highlight(editor);
  if (editor.contentEditable !== 'plaintext-only') isLegacy = true;
  if (isLegacy) editor.setAttribute('contenteditable', 'true');

  const toString = () => editor.textContent || '';

  function restore(pos: Position) {
    const s = getSelection();
    let startNode: Node | undefined;
    let startOffset = 0;
    let endNode: Node | undefined;
    let endOffset = 0;

    if (!pos.dir) pos.dir = '->';
    if (pos.start < 0) pos.start = 0;
    if (pos.end < 0) pos.end = 0;

    if (pos.dir === '<-') {
      const { start, end } = pos;
      pos.start = end;
      pos.end = start;
    }

    let current = 0;

    visit(editor, el => {
      if (el.nodeType !== Node.TEXT_NODE) return;

      const len = (el.nodeValue || '').length;

      if (current + len > pos.start) {
        if (!startNode) {
          startNode = el;
          startOffset = pos.start - current;
        }
        if (current + len > pos.end) {
          endNode = el;
          endOffset = pos.end - current;
          return 'stop';
        }
      }
      current += len;
    });

    if (!startNode) {
      startNode = editor;
      startOffset = editor.childNodes.length;
    }
    if (!endNode) {
      endNode = editor;
      endOffset = editor.childNodes.length;
    }

    if (pos.dir === '<-') {
      [startNode, startOffset, endNode, endOffset] = [
        endNode,
        endOffset,
        startNode,
        startOffset,
      ];
    }

    s.setBaseAndExtent(startNode, startOffset, endNode, endOffset);
  }

  function save(): Position {
    const s = getSelection();
    const pos: Position = { start: 0, end: 0, dir: undefined };
    let { anchorNode, anchorOffset, focusNode, focusOffset } = s;
    if (!anchorNode || !focusNode) throw new Error('save error');

    if (anchorNode.nodeType === Node.ELEMENT_NODE) {
      const node = document.createTextNode('');
      anchorNode.insertBefore(node, anchorNode.childNodes[anchorOffset]);
      anchorNode = node;
      anchorOffset = 0;
    }

    if (focusNode.nodeType === Node.ELEMENT_NODE) {
      const node = document.createTextNode('');
      focusNode.insertBefore(node, focusNode.childNodes[focusOffset]);
      focusNode = node;
      focusOffset = 0;
    }

    visit(editor, el => {
      if (el === anchorNode && el === focusNode) {
        pos.start += anchorOffset;
        pos.end += focusOffset;
        pos.dir = anchorOffset <= focusOffset ? '->' : '<-';
        return 'stop';
      }

      if (el === anchorNode) {
        pos.start += anchorOffset;
        if (!pos.dir) {
          pos.dir = '->';
        } else {
          return 'stop';
        }
      } else if (el === focusNode) {
        pos.end += focusOffset;
        if (!pos.dir) {
          pos.dir = '<-';
        } else {
          return 'stop';
        }
      }

      if (el.nodeType === Node.TEXT_NODE) {
        if (pos.dir !== '->') pos.start += el.nodeValue!.length;
        if (pos.dir !== '<-') pos.end += el.nodeValue!.length;
      }
    });

    editor.normalize();

    return pos;
  }

  function legacyNewLineFix(event: KeyboardEvent) {
    if (isLegacy && isEnter(event)) {
      preventDefault(event);
      event.stopPropagation();
      if (textAfterCursor(editor) === '') {
        insert('\n ');
        const pos = save();
        pos.start = --pos.end;
        restore(pos);
      } else {
        insert('\n');
      }
    }
  }

  function handleSelfClosingCharacters(event: KeyboardEvent) {
    const open = `([{'"`;
    const close = `)]}'"`;
    const codeBefore = textBeforeCursor(editor);
    const codeAfter = textAfterCursor(editor);
    const escapeCharacter = codeBefore.substr(codeBefore.length - 1) === '\\';
    const charAfter = codeAfter.substr(0, 1);
    if (close.includes(event.key) && !escapeCharacter && charAfter === event.key) {
      const pos = save();
      preventDefault(event);
      pos.start = ++pos.end;
      restore(pos);
    } else if (
      open.includes(event.key) &&
      !escapeCharacter &&
      (`"'`.includes(event.key) || ['', ' ', '\n'].includes(charAfter))
    ) {
      preventDefault(event);
      const pos = save();
      const wrapText = pos.start === pos.end ? '' : getSelection().toString();
      const text = event.key + wrapText + close[open.indexOf(event.key)];
      insert(text);
      pos.start++;
      pos.end++;
      restore(pos);
    }
  }

  function handleTabCharacters(event: KeyboardEvent) {
    if (isTab(event)) {
      preventDefault(event);
      if (isShift(event)) {
        const before = textBeforeCursor(editor);
        const [padding, start] = findPadding(before);
        if (padding.length) {
          const pos = save();
          const len = Math.min(options.tab.length, padding.length);
          restore({ start, end: start + len });
          document.execCommand('delete');
          pos.start -= len;
          pos.end -= len;
          restore(pos);
        }
      } else {
        insert(options.tab);
      }
    }
  }

  function handleUndoRedo(event: KeyboardEvent) {
    if (isUndo(event)) {
      preventDefault(event);
      at--;
      const record = history[at];
      if (record) {
        editor.innerHTML = record.html;
        restore(record.pos);
      }
      if (at < 0) at = 0;
    }

    if (isRedo(event)) {
      preventDefault(event);
      at++;
      const record = history[at];
      if (record) {
        editor.innerHTML = record.html;
        restore(record.pos);
      }
      if (at >= history.length) at--;
    }
  }

  function handlePaste(event: ClipboardEvent) {
    preventDefault(event);
    const text = ((event as any).originalEvent || event).clipboardData
      .getData('text/plain')
      .replace(/\r/g, '');
    const pos = save();
    insert(text);
    highlight(editor);
    restore({ start: pos.start + text.length, end: pos.end + text.length });
  }

  function recordHistory() {
    if (!focus) return;

    const html = editor.innerHTML;
    const pos = save();

    const lastRecord = history[at];
    if (lastRecord) {
      if (
        lastRecord.html === html &&
        lastRecord.pos.start === pos.start &&
        lastRecord.pos.end === pos.end
      )
        return;
    }

    at++;
    history[at] = { html, pos };
    history.splice(at + 1);

    const maxHistory = 300;
    if (at > maxHistory) {
      at = maxHistory;
      history.splice(0, 1);
    }
  }

  function handleNewLine(event: KeyboardEvent) {
    if (isEnter(event)) {
      const before = textBeforeCursor(editor);
      const after = textAfterCursor(editor);

      const [padding] = findPadding(before);
      let newLinePadding = padding;

      if (options.indentOn.test(before)) {
        newLinePadding += options.tab;
      }

      if (newLinePadding.length) {
        preventDefault(event);
        event.stopPropagation();
        insert(`\n${newLinePadding}`);
      } else {
        legacyNewLineFix(event);
      }

      if (newLinePadding !== padding && after[0] === '}') {
        const pos = save();
        insert(`\n${padding}`);
        restore(pos);
      }
    }
  }

  const debounceHighlight = debounce(() => {
    const pos = save();
    highlight(editor, pos);
    restore(pos);
  }, 30);

  let recording = false;

  const debounceRecordHistory = debounce((event: KeyboardEvent) => {
    if (shouldRecord(event)) {
      recordHistory();
      recording = false;
    }
  }, 300);

  const on = <K extends keyof HTMLElementEventMap>(
    type: K,
    fn: (event: HTMLElementEventMap[K]) => void
  ) => {
    listeners.push([type, fn]);
    editor.addEventListener(type, fn);
  };

  on('keydown', event => {
    if (event.defaultPrevented) return;

    prev = toString();

    if (options.preserveIdent) handleNewLine(event);
    else legacyNewLineFix(event);

    if (options.catchTab) handleTabCharacters(event);

    if (options.addClosing) handleSelfClosingCharacters(event);

    if (options.history) {
      handleUndoRedo(event);
      if (shouldRecord(event) && !recording) {
        recordHistory();
        recording = true;
      }
    }

    if (isLegacy) restore(save());
  });

  on('keyup', event => {
    if (event.defaultPrevented) return;
    if (event.isComposing) return;

    if (prev !== toString()) debounceHighlight();
    debounceRecordHistory(event);
    // apply(callback, toString());

    if (callback) {
      callback(toString());
    }
  });

  on('focus', () => {
    focus = true;
  });

  on('blur', () => {
    focus = false;
  });

  on('paste', event => {
    recordHistory();
    handlePaste(event);
    recordHistory();
    // apply(callback, toString());
    if (callback) {
      callback(toString());
    }
  });

  function insertMarkdownBold() {
    const s = getSelection();
    // 如果没有选中内容
    if (s.isCollapsed) {
      insert('****');
      const pos = save();
      pos.start -= 2;
      pos.end -= 2;
      restore(pos);
    } else {
      const text = s.toString();
      insert(`**${text}**`);
      const pos = save();
      restore(pos);
    }
  }

  function insertMarkdownUl() {
    insert('- ');
    const pos = save();
    restore(pos);
  }

  function insertMarkdownOl() {
    insert('1. ');
    const pos = save();
    restore(pos);
  }

  function insertMarkdownCode() {
    insert('```js\n');
    const pos = save();
    insert('\n```');
    restore(pos);
  }

  function insertMarkdownImage() {
    const s = getSelection();
    if (s.isCollapsed) {
      insert('![](');
      const pos = save();
      insert(')');
      restore(pos);
    } else {
      const text = s.toString();
      insert(`![](${text})`);
      const pos = save();
      restore(pos);
    }
  }

  function insertMarkdownLink() {
    const s = getSelection();
    if (s.isCollapsed) {
      insert('[](');
      const pos = save();
      insert(')');
      restore(pos);
    } else {
      const text = s.toString();
      insert(`![](${text})`);
      const pos = save();
      restore(pos);
    }
  }

  function insertMarkdownOption(tag: string) {
    const s = getSelection();
    // 如果一开始点击了toolbar, 此时没有聚焦, 就会throw error
    if (!s.anchorNode || !s.focusNode) {
      editor.focus();
    }
    if (tag === 'bold') {
      insertMarkdownBold();
    } else if (tag === 'ul') {
      insertMarkdownUl();
    } else if (tag === 'ol') {
      insertMarkdownOl();
    } else if (tag === 'blockcode') {
      insertMarkdownCode();
    } else if (tag === 'image') {
      insertMarkdownImage();
    } else if (tag === 'link') {
      insertMarkdownLink();
    }
    // apply(callback, toString());
    if (callback) {
      callback(toString());
    }
    if (!recording) {
      recordHistory();
      recording = true;
    }
  }

  return {
    insert,
    insertMarkdownOption,
    updateOptions(newOptions: Partial<MarkdownEditorOptions>) {
      Object.assign(options, newOptions);
    },
    updateCode(code: string) {
      editor.textContent = code;
      highlight(editor);
    },
    onUpdate(cb: (code: string) => void) {
      callback = cb;
    },
    toString,
    save,
    restore,
    recordHistory,
    destroy() {
      listeners.forEach(([type, fn]) => {
        editor.removeEventListener(type, fn);
      });
    },
  };
}

export default markdownEditorUtil;
