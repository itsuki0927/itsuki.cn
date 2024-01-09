import { BASE_URL } from "@/constants/app";
import qs from "query-string";

export const ensureStartsWith = (stringToCheck: string, startsWith: string) =>
  stringToCheck.startsWith(startsWith)
    ? stringToCheck
    : `${startsWith}${stringToCheck}`;

const endpoint = BASE_URL;

type ExtractVariables<T> = T extends { variables: object }
  ? T["variables"]
  : never;

interface ItsukiFetcherOptions<T> {
  cache?: RequestCache;
  headers?: HeadersInit;
  path: string;
  tags?: string[];
  variables?: ExtractVariables<T>;
  method?: "GET" | "POST" | "PUT" | "DELETE"; // 可以扩展到其他HTTP方法
}

async function itsukiFetcher<T>({
  cache,
  headers = {},
  path,
  tags,
  variables,
  method = "GET",
}: ItsukiFetcherOptions<T>): Promise<{ data: T } | never> {
  const isGet = method === "GET";

  let url = endpoint + path;
  const requestInit: RequestInit = {
    method,
    headers,
    cache,
    ...(tags && { next: { tags } }),
  };

  if (isGet) {
    url = url + qs.stringify(variables || {});
  } else {
    requestInit.headers = {
      "Content-Type": "application/json",
      ...headers,
    };
    requestInit.body = JSON.stringify({
      ...(variables && variables),
    });
  }

  console.log(url, requestInit);

  try {
    const result = await fetch(url, requestInit);
    const data = await result.json();
    return data;
  } catch (e) {
    throw {
      error: e,
      query: path,
    };
  }
}

export default itsukiFetcher;
