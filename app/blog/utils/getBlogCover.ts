import defaultBlogCover from '@/public/default_blog_cover.webp';

const getBlogCover = (cover?: string) => {
  if (!cover) {
    return defaultBlogCover;
  }
  return cover.startsWith('http') ? cover : defaultBlogCover;
};

export default getBlogCover;
