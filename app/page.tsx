import ExternalLink from '@/components/common/ExternalLink';
import Juejin from '@/components/icon/Juejin';
import Sifou from '@/components/icon/Sifou';
import Title from '@/layouts/AppLayout/components/Title';
import { Github, Rss } from 'lucide-react';
import AboutMe from './components/AboutMe';
import Gallery from './components/Gallery';
import RecentBlogs from './components/RecentBlogs';
import Summary from './components/Summary';
import Work from './components/Work';

const Home = async () => {
  return (
    <main className="container space-y-10">
      <Title title="大家好，我是五块木头">
        <div className="flex gap-4">
          <ExternalLink href="https://github.com/itsuki0927">
            <Github size={20} />
          </ExternalLink>
          <ExternalLink href="https://juejin.cn/user/2436173499466350">
            <Juejin size={20} />
          </ExternalLink>
          <ExternalLink href="https://segmentfault.com/u/itsuki0927">
            <Sifou size={20} />
          </ExternalLink>
          <ExternalLink href="https://itsuki.cn/rss">
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
