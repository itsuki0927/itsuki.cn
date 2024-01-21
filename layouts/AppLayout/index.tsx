import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Analytics } from '@vercel/analytics/react';
import { Toaster } from '@/components/ui/toaster';
import { StandardProps } from '@/types/common';
import { SpeedInsights } from '@vercel/speed-insights/next';
import TinybirdScript from './components/TinybirdScript';

const AppLayout = ({ children }: StandardProps) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <Analytics />
      <SpeedInsights />
      <Toaster />
      <TinybirdScript />
    </>
  );
};

export default AppLayout;
