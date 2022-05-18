export interface CustomWindow extends Window {
  gtag(...args: any[]): any;
  dataLayer: any[];
}
