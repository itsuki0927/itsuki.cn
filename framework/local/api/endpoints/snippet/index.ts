import { SnippetsSchema } from '@/entities/snippet';
import { createEndpoint, GetAPISchema } from '@/framework/blog/api';
import snippetEndpoints from '@/framework/blog/api/endpoints/snippet';
import { ItsukiBlogAPI } from '../..';
import getSnippets from './get-snippets';

export type SnippetsAPI = GetAPISchema<ItsukiBlogAPI, SnippetsSchema>;

export type SnippetsEndpoint = SnippetsAPI['endpoint'];

export const handlers: SnippetsEndpoint['handlers'] = {
  getSnippets,
};

const snippetsApi = createEndpoint<SnippetsAPI>({
  handler: snippetEndpoints,
  handlers,
});

export default snippetsApi;
