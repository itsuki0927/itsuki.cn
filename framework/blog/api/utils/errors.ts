/* eslint-disable max-classes-per-file */
export class BlogAPIError extends Error {
  status: number;

  res: Response;

  data: any;

  constructor(msg: string, res: Response, data?: any) {
    super(msg);
    this.name = 'BlogApiError';
    this.status = res.status;
    this.res = res;
    this.data = data;
  }
}

export class BlogNetworkError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = 'BlogNetworkError';
  }
}
