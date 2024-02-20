import "./styles/global.css";
import classNames from "classnames";
import metadataConfig from "@/constants/seo";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { IBM_Plex_Sans, Fira_Code } from "next/font/google";
import "react-notion-x/src/styles.css";

export const metadata = metadataConfig;

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira",
});

const ibm = IBM_Plex_Sans({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-ibm",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={classNames(ibm.className)}>
      <body>
        <Navbar />
        <main className="sm:px-8 my-16 sm:my-24">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
