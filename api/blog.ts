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
import { BlogHeading } from '@/hooks/blog/useBlog';
import markedToHtml from '@/libs/marked';
import { getBlogHeadingElementId } from '@/constants/anchor';

export const getBlogs = async (params?: SearchBlogsBody) => {
  const { blogs } = await request<QueryBlogsResponse, QueryBlogSearch>(
    endpoint,
    QUERY_BLOGS,
    {
      search: {
        ...(params || {}),
        publish: PublishState.Published,
      },
    }
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
  const headings: BlogHeading[] = [];
  const htmlContent = markedToHtml(blog.content, {
    purify: true,
    headingIDRenderer: (_, level, raw) => {
      const id = getBlogHeadingElementId(
        level,
        raw.toLowerCase().replace(/[^a-zA-Z0-9\u4E00-\u9FA5]+/g, '-')
      );
      headings.push({ level, id, text: raw });
      return id;
    },
  });
  return {
    ...blog,
    htmlContent,
    headings,
  };
};

export const getArchives = () => getBlogs({ current: DEFAULT_CURRENT, pageSize: 500 });

export const getAllBlogs = () => getBlogs({ pageSize: 1000 });

export const getAllBlogPaths = async () => {
  const { blogs } = await request<QueryBlogsResponse>(endpoint, QUERY_BLOG_PATHS);
  return blogs.data.map(item => `/blog/${item.id}`);
};

export const getAllBlogPathsWithPath = async () => {
  const { blogs } = await request<QueryBlogsResponse>(
    endpoint,
    QUERY_BLOG_PATHS_WITH_PATH
  );
  return blogs.data.map(item => ({ path: `${item.path}` }));
};

export const getBannerBlogs = () => getBlogs({ banner: 1 });

export const getRecentBlogs = () => getBlogs({ recent: true, pageSize: 4 });

export const getHotBlogs = () => getBlogs({ hot: true, pageSize: 3 });

export const likeBlog = (body: LikeBlogBody) =>
  request<LikeBlogResponse, LikeBlogBody>(endpoint, LIKE_BLOG, body);

export const readBlog = (id: number) =>
  request<ReadBlogResponse, ID>(endpoint, READ_BLOG, { id });
