import request from 'graphql-request';
import {
  LikeBlogBody,
  LikeBlogResponse,
  QueryBlogResponse,
  QueryBlogSearch,
  QueryBlogsResponse,
  ReadBlogResponse,
  SearchBlogsBody,
} from '@/entities/blog';
import { ID } from '@/types/response';
import { PublishState } from '@/constants/blog/publish';
import { endpoint } from './service';
import {
  LIKE_BLOG,
  QUERY_BLOG,
  QUERY_BLOGS,
  QUERY_BLOG_PATHS,
  QUERY_BLOG_PATHS_WITH_PATH,
  READ_BLOG,
} from '@/graphqls/blog';
import { DEFAULT_CURRENT } from '@/constants/value';

export const getBlogs = async (params?: SearchBlogsBody) => {
  const { blogs } = await request<QueryBlogsResponse, QueryBlogSearch>(
    endpoint,
    QUERY_BLOGS,
    params
      ? {
          search: {
            ...params,
            publish: PublishState.Published,
          },
        }
      : undefined
  );
  return blogs;
};

export const getBlog = async (path: string) => {
  const { blog } = await request<QueryBlogResponse, { path: string }>(
    endpoint,
    QUERY_BLOG,
    {
      path,
    }
  );
  return blog;
};

export const getArchives = () => getBlogs({ current: DEFAULT_CURRENT, pageSize: 500 });

export const getAllBlogPaths = async () => {
  const { blogs } = await request<QueryBlogsResponse, QueryBlogSearch>(
    endpoint,
    QUERY_BLOG_PATHS
  );
  return blogs.data.map(item => `/blog/${item.id}`);
};

export const getAllBlogPathsWithPath = async () => {
  const { blogs } = await request<QueryBlogsResponse, QueryBlogSearch>(
    endpoint,
    QUERY_BLOG_PATHS_WITH_PATH
  );
  return blogs.data.map(item => `/blog/${item.path}`);
};

export const getBannerBlogs = () => getBlogs({ banner: 1 });

export const getRecentBlogs = () => getBlogs({ recent: true, pageSize: 4 });

export const getHotBlogs = () => getBlogs({ hot: true, pageSize: 3 });

export const likeBlog = (body: LikeBlogBody) =>
  request<LikeBlogResponse, LikeBlogBody>(endpoint, LIKE_BLOG, body);

export const readBlog = (id: number) =>
  request<ReadBlogResponse, ID>(endpoint, READ_BLOG, { id });