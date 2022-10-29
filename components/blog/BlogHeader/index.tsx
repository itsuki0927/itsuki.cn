import { BlogDetailResponse } from '@/entities/blog';
import { Container } from '@/components/ui';

interface BlogHeaderProps {
  blog: BlogDetailResponse;
}

const BlogHeader = ({ blog }: BlogHeaderProps) => (
  <div className='bg-gray-50 py-24'>
    <Container>
      <div className='mb-4 inline-block space-x-2 rounded-md bg-primary-light p-1 px-2'>
        <span className='rounded-sm bg-white py-1 px-2 text-sm text-primary'>
          {blog.reading} 人阅读
        </span>

        <span className='rounded-sm py-1 text-sm text-primary'>8 分钟阅读</span>
      </div>

      <h1 className='max-w-3xl text-5xl font-medium'>{blog.title}</h1>

      <p className='mt-6 max-w-3xl text-xl'>{blog.description}</p>
    </Container>
  </div>
);

export default BlogHeader;
