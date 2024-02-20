import { getAllCategories, getCategoryBySlug } from '@/actions/category';
import BlogList from '@/app/blog/components/BlogList';
import { BASE_URL } from '@/constants/app';
import Title from '@/layouts/AppLayout/components/Title';
import { PageProps } from '@/types/common';
import { Metadata } from 'next';

export type CategoryPageProps = PageProps<{ slug: string }>;

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata | undefined> {
  const category = await getCategoryBySlug(params.slug);
  const title = category?.title;
  const description = category?.description || '';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/category/${params.slug}`,
    },
  };
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const slug = params.slug;
  const category = await getCategoryBySlug(slug);

  return (
    <div className="container">
      <Title title={category?.title}>{category?.description}</Title>

      <BlogList params={{ categorySlug: slug }} />
    </div>
  );
};

export default CategoryPage;
