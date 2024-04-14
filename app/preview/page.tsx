import Title from '@/layouts/AppLayout/components/Title';
import { Eye } from 'lucide-react';
import BlogListUI from '../blog/components/BlogList/ui';
import { getDraftBlogs } from './action';
import { ENV } from '@/constants/env';

const PreviewBlogsPage = async () => {
  if (ENV.isProd) {
    return null;
  }

  const blogs = await getDraftBlogs();

  return (
    <div className="container">
      <Title
        title={
          <span className="flex items-center">
            <Eye size={40} className="mr-2" />
            预览
          </span>
        }
      >
        通过此功能查看目前正在<strong>草稿</strong>的文章
      </Title>

      <BlogListUI blogs={blogs} isPreview />
    </div>
  );
};

export default PreviewBlogsPage;
