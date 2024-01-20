import Logo from "../Logo";
import Link from "next/link";
import { ROUTE_LIST } from "@/constants/route";
import { isAdminSession } from "@/actions/session";

const Navbar = async () => {
  const isAdmin = await isAdminSession();
  return (
    <header className="inset-x-0 h-16">
      <nav className="container flex h-full items-center justify-between">
        <div className="relative flex flex-grow items-center justify-between md:justify-start">
          <Logo />
          <ul className="ml-6">
            {ROUTE_LIST.map((item) => (
              <li
                key={item.path}
                className="capsize mb-0 relative hidden cursor-pointer px-5 text-center leading-8 tracking-widest transition-colors duration-500 hover:text-primary-hover md:inline-block"
              >
                <Link href={item.path}>{item.name}</Link>
              </li>
            ))}
            {isAdmin ? (
              <li
                key="/admin"
                className="capsize mb-0 relative hidden cursor-pointer px-5 text-center leading-8 tracking-widest transition-colors duration-500 hover:text-primary-hover md:inline-block"
              >
                <Link href="/admin">管理</Link>
              </li>
            ) : null}
          </ul>
          <div className="hidden flex-grow items-center justify-end space-x-3 md:flex">
            {/* <LoginIcon /> */}
            {/* <RssIcon /> */}
            {/* <StatusIcon /> */}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
