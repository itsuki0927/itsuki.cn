import { GA_TRACKING_ID } from '@/configs/app';
import { GAEventCategories } from '@/constants/gtag';
import { CustomWindow } from '@/types/window';

declare const window: CustomWindow;

export type GAEvent = {
  category?: GAEventCategories;
  label?: string;
  value?: number;
};

export const gtag = {
  // https://developers.google.com/analytics/devguides/collection/gtagjs/pages
  pageview(url: string) {
    if (window.gtag) {
      window.gtag('config', GA_TRACKING_ID, {
        page_path: url,
      });
    }
  },
  event(action: string, { category, label, value }: GAEvent) {
    if (window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value,
      });
    }
  },
};
