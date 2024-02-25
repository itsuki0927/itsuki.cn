import { getAllTags, getTagBySlug } from '@/actions/tag';
import BlogList from '@/app/blog/components/BlogList';
import { BASE_URL } from '@/constants/app';
import Title from '@/layouts/AppLayout/components/Title';
import { PageProps } from '@/types/common';
import { Tag } from 'lucide-react';
import { Metadata } from 'next';

export type TagPageProps = PageProps<{ slug: string }>;

export const revalidate = 3600;

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((tag) => ({ slug: tag.slug }));
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata | undefined> {
  const tag = await getTagBySlug(params.slug);
  const title = tag?.title;
  const description = tag?.description || '';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/tag/${params.slug}`,
    },
  };
}

const CategoryPage = async ({ params }: TagPageProps) => {
  const slug = params.slug;
  const tag = await getTagBySlug(slug);

  return (
    <div className="container">
      <Title
        title={
          <span className="flex items-center">
            <Tag size={40} className="mr-2" />
            {tag?.title}
          </span>
        }
      >
        {tag?.description}
      </Title>

      <BlogList params={{ tagSlug: slug }} />
    </div>
  );
};

export default CategoryPage;
