import ExternalLink from '@/components/common/ExternalLink';
import GithubExternalLink from '@/components/common/GithubExternalLink';
import JuejinExternalLink from '@/components/common/JuejinExternalLink';
import SifouExternalLink from '@/components/common/SifouExternalLink';
import { ROUTE_LIST_WITH_HOME } from '@/constants/route';
import { LoaderIcon, MousePointerClick, User } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import Logo from '../Logo';
import LastVisitorInfo from './LastVisitorInfo';
import TotalPageViews from './TotalPageViews';

const Footer = () => {
  return (
    <footer className="border-t border-dashed border-t-zinc-200">
      <div className="container flex w-full flex-col py-12 items-start justify-center text-sm">
        <div className="flex w-full flex-col sm:flex-row justify-between items-center gap-6">
          <Logo />
          <div className="flex gap-6 flex-wrap items-center text-sm font-medium text-zinc-800 dark:text-zinc-200">
            {ROUTE_LIST_WITH_HOME.map((route) => (
              <Link href={route.path} key={route.path}>
                {route.name}
              </Link>
            ))}
            <GithubExternalLink />
            <JuejinExternalLink />
            <SifouExternalLink />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between w-full mt-6 gap-2 sm:gap-0 items-center">
          <div className="flex flex-col text-xs sm:flex-row items-center gap-2 text-zinc-500 dark:text-zinc-400">
            <ExternalLink href="https://beian.miit.gov.cn">
              湘ICP备2021020356号
            </ExternalLink>
            <span className="hidden md:block text-zinc-200"> / </span>
            <span>Copyright © 五块木头 Blog {new Date().getFullYear()}</span>
          </div>
          <div className="flex flex-col items-center justify-start gap-2 sm:flex-row">
            <Suspense
              fallback={
                <span className="flex items-center justify-center gap-1 text-xs text-zinc-500 dark:text-zinc-400 md:justify-start">
                  <User className="h-4 w-4" />
                  总浏览量&nbsp;
                  <LoaderIcon size={12} className="animate-spin font-medium" />
                </span>
              }
            >
              <TotalPageViews />
            </Suspense>
            <Suspense
              fallback={
                <span className="flex items-center justify-center gap-1 text-xs text-zinc-500 dark:text-zinc-400 md:justify-start">
                  <MousePointerClick size={16} className="h-4 w-4" />
                  <span>最近访客来自&nbsp;</span>
                  <LoaderIcon size={12} className="animate-spin" />
                </span>
              }
            >
              <LastVisitorInfo />
            </Suspense>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
