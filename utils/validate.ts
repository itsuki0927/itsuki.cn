import { EMAIL } from '@/configs/app';

export const isCtrl = (event: KeyboardEvent) => event.ctrlKey || event.metaKey;

export const isUndo = (event: KeyboardEvent) =>
  isCtrl(event) && !event.shiftKey && event.code === 'KeyZ';

export const isRedo = (event: KeyboardEvent) =>
  isCtrl(event) && event.shiftKey && event.code === 'KeyZ';

export const isTab = (event: KeyboardEvent) => event.key === 'Tab';

export const isEnter = (event: KeyboardEvent) => event.key === 'Enter';

export const isShift = (event: KeyboardEvent) => event.shiftKey;

const emailRegex =
  // eslint-disable-next-line no-control-regex
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

export const isEmail = (email: string) => emailRegex.test(email);

export const isAdminEmail = (email: string) => EMAIL === email;
