import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getBlackList } from '@/api/blacklist';
import { getAllBlogPathsWithPath, getBlog, readBlog } from '@/api/blog';
import { getAllTags } from '@/api/tag';
import TableOfContent from '@/components/blog/TableOfContent';
import BlogHeader from '@/components/blog/BlogHeader';
/* import CommentView from '@/components/comment/CommentView'; */
import Layout from '@/components/common/Layout';
import MyImage from '@/components/common/MyImage';
import Container from '@/components/ui/Container';
import MarkdownBlock from '@/components/ui/MarkdownBlock';
import { COMMENT_VIEW_ELEMENT_ID } from '@/constants/anchor';
/* import { GAEventCategories } from '@/constants/gtag'; */
import { Blog } from '@/entities/blog';
/* import { gtag } from '@/utils/gtag'; */
import { canUseDOM } from '@/utils/query';

export const dynamicParams = true;

export const revalidate = 60;

export async function generateStaticParams() {
  const paths = await getAllBlogPathsWithPath();
  return paths;
}

const fetchData = async (path?: string) => {
  if (!path) {
    return notFound();
  }
  const blog = await getBlog(path);
  const tags = await getAllTags();
  const blacklist = await getBlackList();

  readBlog(blog.id);
  /* gtag.event('blog_view', { */
  /*   category: GAEventCategories.Blog, */
  /*   label: blog?.title, */
  /* }); */

  return {
    blog,
    tags,
    blacklist,
  };
};

const BlogPage = async ({ params }: any) => {
  console.log('params:', params);
  const { blog } = await fetchData(params.path);

  const renderPagination = (pageBlog: Blog | null, title: string) => (
    <p className={!pageBlog ? 'text-gray-400' : ''}>
      <span className='font-bold'>{title}: </span>
      {pageBlog ? (
        <Link href={pageBlog.path ?? ''}>
          <span className='cursor-pointer text-primary transition-all hover:text-primary-hover hover:underline'>
            {pageBlog.title}
          </span>
        </Link>
      ) : (
        <span>无</span>
      )}
    </p>
  );

  return (
    <Layout footerTheme='reverse'>
      {/* <NextSeo */}
      {/*   title={blog.title} */}
      {/*   description={blog.description} */}
      {/*   additionalMetaTags={[ */}
      {/*     { name: 'keywords', content: blog.keywords }, */}
      {/*     { */}
      {/*       name: 'cover', */}
      {/*       content: blog.cover, */}
      {/*     }, */}
      {/*   ]} */}
      {/*   openGraph={{ */}
      {/*     title: blog.title, */}
      {/*     description: blog.description, */}
      {/*     url: getBlogDetailFullUrl(blog.path), */}
      {/*     type: 'blog', */}
      {/*     article: { */}
      {/*       publishedTime: blog.createAt.toString(), */}
      {/*       modifiedTime: blog.updateAt.toString(), */}
      {/*       expirationTime: blog.updateAt.toString(), */}
      {/*       authors: [META.url], */}
      {/*       tags: blog.tags.map(v => v.name), */}
      {/*     }, */}
      {/*     images: [ */}
      {/*       { */}
      {/*         url: blog.cover, */}
      {/*       }, */}
      {/*     ], */}
      {/*   }} */}
      {/* /> */}
      {/* <ArticleJsonLd */}
      {/*   url={getBlogDetailFullUrl(blog.path)} */}
      {/*   title={blog.title} */}
      {/*   images={[blog.cover]} */}
      {/*   datePublished={blog.createAt.toString()} */}
      {/*   dateModified={blog.updateAt.toString()} */}
      {/*   authorName={[{ name: blog.author, url: META.url }]} */}
      {/*   description={blog.description} */}
      {/*   publisherName={blog.title} */}
      {/* /> */}

      <BlogHeader blog={blog} />

      <Container className='relative mt-24 flex flex-row justify-between'>
        <div className='mx-auto max-w-full sm:max-w-4xl'>
          <div className='relative rounded-sm'>
            {blog.cover && (
              <div className='mb-8 align-middle'>
                <MyImage
                  src={blog.cover}
                  width={1216}
                  height={516}
                  alt='blog-header-cover'
                  className='cursor-pointer'
                  id='blogCover'
                />
              </div>
            )}
            <MarkdownBlock htmlContent={blog.htmlContent} />

            {canUseDOM && <TableOfContent blog={blog} />}
          </div>
        </div>
      </Container>

      <div className='my-4 mx-auto space-y-2 sm:max-w-4xl'>
        {renderPagination(blog.nextBlog, '下一篇')}
        {renderPagination(blog.prevBlog, '上一篇')}
      </div>

      <Container className='my-24 border-t border-dashed border-gray-300 sm:max-w-4xl' />

      <div className='my-24 mx-auto sm:max-w-4xl' id={COMMENT_VIEW_ELEMENT_ID}>
        {/* <CommentView blogId={blog.id} /> */}
      </div>
    </Layout>
  );
};

export default BlogPage;
