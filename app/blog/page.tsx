import classNames from 'classnames';
import Link from 'next/link';
import { getAllBlogs } from '@/api/blog';
import { getAllTags } from '@/api/tag';
import BlogList from '@/components/blog/BlogList';
import Layout from '@/components/common/Layout';
import FooterBanner from '@/components/ui/FooterBanner';
import { getTagRoute } from '@/utils/url';

export const revalidate = 3600;

const fetchData = async () => {
  const blogs = await getAllBlogs();
  const tags = await getAllTags();
  return { blogs, tags };
};

const BlogPage = async () => {
  const { blogs, tags } = await fetchData();

  return (
    <Layout headerTheme='white'>
      {/* <NextSeo title='文章' /> */}

      <div className='max-h-[402px] bg-gray-50'>
        <div className='container min-h-[402px] overflow-hidden py-16 sm:flex sm:flex-row sm:items-start sm:justify-between sm:py-24'>
          <div className='flex flex-col justify-center'>
            <h1 className='text-3xl font-medium tracking-tight text-gray-900 md:text-5xl'>
              文章
            </h1>
            <p className='mt-4 text-gray-500'>总共{blogs.total}篇</p>
            <p className='mt-4 max-w-sm text-lg text-gray-600 sm:hidden'>
              不管全世界所有人怎么说, 我都认为自己的感受才是最正确的, 无论别人怎么看,
              我绝不打乱自己的节奏, 喜欢的事自然可以坚持, 不喜欢的怎么也长久不了.
              <span className='mx-1'> - </span>
              <span className='text-lg text-gray-500'> 村上春树</span>
            </p>
          </div>

          <p className='hidden max-w-sm text-xl text-gray-600 sm:block'>
            不管全世界所有人怎么说, 我都认为自己的感受才是最正确的, 无论别人怎么看,
            我绝不打乱自己的节奏, 喜欢的事自然可以坚持, 不喜欢的怎么也长久不了.
            <span className='mx-1'> - </span>
            <span className='text-lg text-gray-500'> 村上春树</span>
          </p>
        </div>
      </div>

      <div className='container py-24' id='dashboard'>
        <div className='mb-16 hidden sm:block'>
          <div className='flex space-x-6'>
            {tags?.map(tag => (
              <Link
                href={getTagRoute(tag.path)}
                className={classNames(
                  'rounded-md bg-gray-100/70 px-6 py-2 transition-colors hover:bg-gray-200'
                )}
                key={tag.path}
              >
                {tag.name}
              </Link>
            ))}
          </div>
        </div>

        <div className='max-w-full'>
          <BlogList data={blogs} />
        </div>
      </div>

      <FooterBanner />
    </Layout>
  );
};

export default BlogPage;
