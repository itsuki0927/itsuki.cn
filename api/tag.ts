import { Tag } from '@/entities/tag';
import { SearchResponse } from '@/types/response';
import service from './service';

export const getTags = () =>
  service.request<void, SearchResponse<Tag>>({
    method: 'get',
    url: '/tag',
  });

export const getAllTagPaths = () =>
  getTags().then(({ data }) => data.map(item => `/tag/${item.path}`));
