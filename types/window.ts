import { PopupRef } from '@/components/ui/Popup';

export interface CustomWindow extends Window {
  $popup: PopupRef | null;
  gtag(...args: any[]): any;
  dataLayer: any[];
}
