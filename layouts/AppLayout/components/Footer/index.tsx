import ExternalLink from '@/components/common/ExternalLink';
import Juejin from '@/components/icon/Juejin';
import Sifou from '@/components/icon/Sifou';
import { ROUTE_LIST_WITH_HOME } from '@/constants/route';
import { Github } from 'lucide-react';
import Link from 'next/link';
import Logo from '../Logo';
import LastVisitorInfo from './LastVisitorInfo';
import TotalPageViews from './TotalPageViews';

const Footer = async () => {
  return (
    <footer className="border-t border-dashed border-t-zinc-200">
      <div className="container flex w-full flex-col py-12 items-start justify-center text-sm">
        <div className="flex w-full flex-col sm:flex-row justify-between items-center gap-6">
          <Logo />
          <div className="flex gap-6 text-sm font-medium text-zinc-800 dark:text-zinc-200">
            {ROUTE_LIST_WITH_HOME.map((route) => (
              <Link href={route.path} key={route.path}>
                {route.name}
              </Link>
            ))}
            <ExternalLink href="https://github.com/itsuki0927">
              <Github size={20} />
            </ExternalLink>
            <ExternalLink href="https://juejin.cn/user/2436173499466350">
              <Juejin size={20} />
            </ExternalLink>
            <ExternalLink href="https://segmentfault.com/u/itsuki0927">
              <Sifou size={20} />
            </ExternalLink>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between w-full mt-6 gap-2 sm:gap-0 items-center">
          <div className="flex flex-col text-sm sm:flex-row items-center gap-2 text-zinc-500 dark:text-zinc-400">
            <ExternalLink href="https://beian.miit.gov.cn text-zinc-500 dark:text-zinc-400">
              湘ICP备2021020356号
            </ExternalLink>
            <span className="hidden md:block text-zinc-200"> / </span>
            <span>Copyright © 五块木头 Blog {new Date().getFullYear()}</span>
          </div>
          <div className="flex flex-col items-center justify-start gap-2 sm:flex-row">
            <TotalPageViews />
            <LastVisitorInfo />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
