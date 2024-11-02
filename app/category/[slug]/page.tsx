import { getAllCategories, getCategoryBySlug } from '@/actions/category';
import BlogList from '@/app/blog/components/BlogList';
import JsonLd from '@/components/common/JsonLd';
import { BASE_URL } from '@/constants/app';
import Title from '@/layouts/AppLayout/components/Title';
import { PageProps } from '@/types/common';
import { FolderOpen } from 'lucide-react';
import { Metadata } from 'next';
import { WebSite, WithContext } from 'schema-dts';

export type CategoryPageProps = PageProps<{ slug: string }>;

export const revalidate = 3600;

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata | undefined> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  const title = category?.title;
  const description = category?.description || '';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/category/${slug}`,
    },
  };
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  const jsonLd: WithContext<WebSite> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: category?.title,
    description: category?.description || '',
  };

  return (
    <div className="container">
      <JsonLd content={jsonLd} />
      <Title
        title={
          <span className="flex items-center">
            <FolderOpen size={40} className="mr-2" />
            {category?.title}
          </span>
        }
      >
        {category?.description}
      </Title>

      <BlogList displayCategory={false} params={{ categorySlug: slug }} />
    </div>
  );
};

export default CategoryPage;
