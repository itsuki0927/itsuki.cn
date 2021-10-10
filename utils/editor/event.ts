export const isCtrl = (event: KeyboardEvent) => event.ctrlKey || event.metaKey;

export const isUndo = (event: KeyboardEvent) =>
  isCtrl(event) && !event.shiftKey && event.code === 'KeyZ';

export const isRedo = (event: KeyboardEvent) =>
  isCtrl(event) && event.shiftKey && event.code === 'KeyZ';

export const isTab = (event: KeyboardEvent) => event.key === 'Tab';

export const isEnter = (event: KeyboardEvent) => event.key === 'Enter';

export const preventDefault = (event: Event) => {
  event.preventDefault();
};

export default { isCtrl, isUndo, isRedo, preventDefault };
