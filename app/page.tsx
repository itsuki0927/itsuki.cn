import ExternalLink from '@/components/common/ExternalLink';
import Title from '@/layouts/AppLayout/components/Title';
import { Rss } from 'lucide-react';
import AboutMe from './components/AboutMe';
import Gallery from './components/Gallery';
import RecentBlogs from './components/RecentBlogs';
import Summary from './components/Summary';
import Work from './components/Work';
import { BASE_URL } from '@/constants/app';
import GithubExternalLink from '@/components/common/GithubExternalLink';
import JuejinExternalLink from '@/components/common/JuejinExternalLink';
import SifouExternalLink from '@/components/common/SifouExternalLink';

const Home = async () => {
  return (
    <main className="container space-y-10">
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
          <ExternalLink href={`${BASE_URL}/rss`}>
            <Rss size={20} />
          </ExternalLink>
        </div>
      </Title>

      <AboutMe />

      <Gallery />

      <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
        <RecentBlogs />

        <div className="space-y-10 lg:sticky lg:top-8 lg:h-fit lg:pl-16 xl:pl-20">
          <Summary />

          <Work />
        </div>
      </div>
    </main>
  );
};

export default Home;
