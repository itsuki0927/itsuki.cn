import { Article, BlogCardStyle } from '@/entities/article';
import ImageBlog from './ImageBlog';
import MixinBlog from './MixinBlog';
import TextBlog from './TextBlog';

interface BlogCardProps {
  blog?: Article;
}

const BlogCard = ({ blog }: BlogCardProps) => {
  if (!blog) {
    return <div>null</div>;
  }

  if (blog.cardStyle === BlogCardStyle.Image) {
    return <ImageBlog blog={blog} />;
  }

  if (blog.cardStyle === BlogCardStyle.Text) {
    return <TextBlog blog={blog} />;
  }

  return <MixinBlog blog={blog} />;
};

export default BlogCard;
