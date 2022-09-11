import { CSSProperties } from 'react';
import { Article, BlogCardStyle } from '@/entities/article';
import ImageBlog from './ImageBlog';
import MixinBlog from './MixinBlog';
import TextBlog from './TextBlog';

export interface BlogCardProps {
  blog?: Article;
  style?: CSSProperties;
  className?: string;
}

const BlogCard = ({ blog, ...rest }: BlogCardProps) => {
  if (!blog) {
    return <div>null</div>;
  }

  if (blog.cardStyle === BlogCardStyle.Image) {
    return <ImageBlog blog={blog} {...rest} />;
  }

  if (blog.cardStyle === BlogCardStyle.Text) {
    return <TextBlog blog={blog} {...rest} />;
  }

  return <MixinBlog blog={blog} {...rest} />;
};

export default BlogCard;
