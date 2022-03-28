import { ImagePopupRef } from '@/components/ui/ImagePopup';

export interface CustomWindow extends Window {
  imagePopup?: ImagePopupRef | null;
}
