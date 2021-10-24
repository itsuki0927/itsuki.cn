import { FetcherError } from '@/framework/blog/utils/errors';

export function getError(errors: any[] | null, status: number) {
  errors = errors ?? [{ message: 'fetch error' }];
  return new FetcherError({ errors, status });
}

export async function getAsyncError(res: Response) {
  const data = await res.json();
  return getError(data.errors, res.status);
}

const handlerFetchResponse = async (res: Response) => {
  if (res.ok) {
    const { data, errors } = await res.json();

    if (errors && errors.length) {
      throw getError(errors, res.status);
    }

    return data;
  }

  throw await getAsyncError(res);
};

export default handlerFetchResponse;
