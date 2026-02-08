import { supabaseBrowserClient } from '../libs/supabase/client';
import { Blog, BlogSearchParams } from '../types/blog';
import { getCategoryBySlug } from './category';

export const readBlog = (id: number) => {
  return supabaseBrowserClient.rpc('views_increment', {
    x: 1,
    row_id: id,
  });
};

const BLOG_LIST_SELECT =
  'id, slug, title, description, cover, createdAt, updatedAt, favorite, views, categoryId, tag (*), blogTag (*), category (*)';

const BLOG_DETAIL_SELECT = '*, tag (*), blogTag (*), category (*)';

const applyBlogFilters = async (builder: any, params: BlogSearchParams) => {
  const { favorite, categorySlug, tagSlug } = params;
  if (favorite !== undefined) {
    builder.eq('favorite', favorite);
  }

  if (categorySlug) {
    const category = await getCategoryBySlug(categorySlug);
    if (!category) {
      return null;
    }

    builder.eq('categoryId', category.id);
  }

  if (tagSlug) {
    builder.containedBy('tag.slug', [tagSlug]);
  }

  builder.order('id', { ascending: false });

  return builder;
};

const getBlogCategorySlug = (blog: any) => {
  const category = blog?.category;
  if (!category) {
    return null;
  }

  if (Array.isArray(category)) {
    return category[0]?.slug ?? null;
  }

  return category.slug ?? null;
};

const getBlogTagSlugs = (blog: any) => {
  const tags = blog?.tag;
  if (!Array.isArray(tags)) {
    return [] as string[];
  }

  return tags.map((tag: any) => tag?.slug).filter(Boolean) as string[];
};

const matchBlogFilters = (blog: any, params: BlogSearchParams) => {
  const { favorite, categorySlug, tagSlug } = params;

  if (favorite !== undefined && blog?.favorite !== favorite) {
    return false;
  }

  if (categorySlug && getBlogCategorySlug(blog) !== categorySlug) {
    return false;
  }

  if (tagSlug && !getBlogTagSlugs(blog).includes(tagSlug)) {
    return false;
  }

  return true;
};

const withListContentFallback = (blogs: any[]) => {
  return blogs.map((blog) => ({
    ...blog,
    content: blog.content || '',
  })) as Blog[];
};

export const getAllBlogs = async ({
  favorite,
  categorySlug,
  tagSlug,
}: BlogSearchParams = {}) => {
  const builder = supabaseBrowserClient.from('blog').select(BLOG_LIST_SELECT);
  const filteredBuilder = await applyBlogFilters(builder, {
    favorite,
    categorySlug,
    tagSlug,
  });

  if (!filteredBuilder) {
    return [];
  }

  const { data } = await filteredBuilder;
  const rows: any[] = data || [];
  const filteredData = rows.filter((blog) =>
    matchBlogFilters(blog, { favorite, categorySlug, tagSlug })
  );

  return withListContentFallback(filteredData);
};

export const getAllBlogsWithContent = async ({
  favorite,
  categorySlug,
  tagSlug,
}: BlogSearchParams = {}) => {
  const builder = supabaseBrowserClient.from('blog').select(BLOG_DETAIL_SELECT);
  const filteredBuilder = await applyBlogFilters(builder, {
    favorite,
    categorySlug,
    tagSlug,
  });

  if (!filteredBuilder) {
    return [];
  }

  const { data } = await filteredBuilder;
  const rows: any[] = data || [];
  const filteredData = rows.filter((blog) =>
    matchBlogFilters(blog, { favorite, categorySlug, tagSlug })
  );

  return filteredData as Blog[];
};

export const getBlog = async (slug: string) => {
  const { data } = await supabaseBrowserClient
    .from('blog')
    .select(BLOG_DETAIL_SELECT)
    .eq('slug', slug)
    .maybeSingle();

  if (!data || data.slug !== slug) {
    return null;
  }

  return data ?? null;
};
