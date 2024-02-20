export function getMessageFromNormalError(error: any): any {
  return error?.message || error;
}
