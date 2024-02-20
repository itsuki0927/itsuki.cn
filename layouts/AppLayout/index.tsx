import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/toaster";
import { StandardProps } from "@/types/common";

const AppLayout = ({ children }: StandardProps) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <Analytics />
      <Toaster />
    </>
  );
};

export default AppLayout;
