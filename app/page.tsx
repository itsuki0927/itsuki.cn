import type { WebSite, WithContext } from 'schema-dts';
import Title from '@/layouts/AppLayout/components/Title';
import { PieChart } from 'lucide-react';
import AboutMe from './components/AboutMe';
import Gallery from './components/Gallery';
import RecentBlogs from './components/RecentBlogs';
import Summary from './components/Summary';
import Work from './components/Work';
import GithubExternalLink from '@/components/common/GithubExternalLink';
import JuejinExternalLink from '@/components/common/JuejinExternalLink';
import SifouExternalLink from '@/components/common/SifouExternalLink';
import { Suspense } from 'react';
import { BlogCardSkeleton } from './blog/components/BlogCard';
import HomeCard from './components/HomeCard';
import Uses from './components/Uses';
import { META } from '@/constants/seo';
import JsonLd from '@/components/common/JsonLd';

const Home = () => {
  const jsonLd: WithContext<WebSite> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: META.title,
    image: `${META.url}/logo.png`,
    description: META.description,
    keywords: META.keywords,
    author: [
      {
        '@type': 'Person',
        name: META.author,
        url: META.url,
      },
    ],
  };

  return (
    <main className="container space-y-10">
      <JsonLd content={jsonLd} />
      <Title
        title={
          <>
            大家好，我是
            <span className="text-gradient-primary ml-1">五块木头</span>
          </>
        }
      >
        <div className="flex gap-4">
          <GithubExternalLink />
          <JuejinExternalLink />
          <SifouExternalLink />
        </div>
      </Title>

      <AboutMe />

      <Gallery />

      <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
        <Suspense
          fallback={
            <div className="flex flex-col gap-6">
              <BlogCardSkeleton />
              <BlogCardSkeleton />
              <BlogCardSkeleton />
            </div>
          }
        >
          <RecentBlogs />
        </Suspense>

        <div className="space-y-10 lg:sticky lg:top-8 lg:h-fit lg:pl-16 xl:pl-20">
          <Suspense
            fallback={
              <HomeCard
                className="animate-pulse bg-gray-100"
                title={
                  <>
                    <PieChart size={20} />
                    <span className="ml-2">关于本站</span>
                  </>
                }
              >
                <ol className="gap-4 grid grid-cols-4">
                  {[1, 2, 3, 4].map((item) => (
                    <li key={item} className="p-4 rounded-md bg-gray-300" />
                  ))}
                </ol>
              </HomeCard>
            }
          >
            <Summary />
          </Suspense>

          <Work />

          <Uses />
        </div>
      </div>
    </main>
  );
};

export default Home;
