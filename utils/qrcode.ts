import QRCode, { QRCodeToDataURLOptions } from 'qrcode';

export const renderTextToQRCodeDataURL = (
  value: string,
  options?: QRCodeToDataURLOptions
) =>
  QRCode.toDataURL(value, {
    scale: 6,
    ...options,
  });
