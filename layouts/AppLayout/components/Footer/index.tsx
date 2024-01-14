import Logo from "../Logo";
import { ROUTE_LIST_WITH_HOME } from "@/constants/route";
import Link from "next/link";

const Footer = () => {
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
            <Link href="https://github.com/itsuki0927">GitHub</Link>
            <Link href="https://juejin.cn/user/2436173499466350">Juejin</Link>
            <Link href="https://segmentfault.com/u/itsuki0927">Sifou</Link>
          </div>
        </div>
        <div className="flex w-full flex-col mt-6 text-sm sm:flex-row items-center justify-between gap-2 text-zinc-500 dark:text-zinc-400">
          <Link href="https://beian.miit.gov.cn text-zinc-500 dark:text-zinc-400">
            湘ICP备2021020356号
          </Link>
          <span>Copyright © 五块木头 Blog {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
