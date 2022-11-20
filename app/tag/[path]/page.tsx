import { notFound } from 'next/navigation';
import { getBlogs } from '@/api/blog';
import { getAllTagPaths, getAllTags } from '@/api/tag';
import BlogList from '@/components/blog/BlogList';
import Layout from '@/components/common/Layout';
import Container from '@/components/ui/Container';
import { PageProps } from '@/types/common';
import TagClient from '@/components/tag/TagClient';

export const dynamicParams = true;

export const revalidate = 3600;

export async function generateStaticParams() {
  const paths = await getAllTagPaths();
  return paths;
}

const fetchData = async (tagPath?: string) => {
  if (!tagPath) {
    notFound();
  }

  const tags = await getAllTags();
  const tag = tags ? tags.find(item => item.path === tagPath) : undefined;

  if (!tag) {
    notFound();
  }

  const blogs = await getBlogs({ tagPath });

  return { tags, blogs, tag };
};

const BlogTagPage = async ({ params }: PageProps<{ path?: string }>) => {
  const { blogs, tag } = await fetchData(params.path);

  return (
    <Layout footerTheme='reverse'>
      <TagClient />
      <div className='bg-gray-50'>
        <div className='container overflow-hidden py-16 sm:flex sm:flex-row sm:items-center sm:justify-between sm:py-24'>
          <div className='flex flex-col justify-center'>
            <h1 className='text-3xl font-medium tracking-tight text-gray-900 md:text-5xl'>
              标签: {tag?.name} ({tag?.count})
            </h1>
            <p className='mt-4 max-w-sm text-lg text-gray-600 sm:hidden'>
              {tag?.description}
            </p>
          </div>

          <p className='hidden max-w-sm text-xl text-gray-600 sm:block'>
            {tag?.description}
          </p>
        </div>
      </div>

      <Container className='py-24'>
        <BlogList data={blogs} />
      </Container>
    </Layout>
  );
};

export default BlogTagPage;
