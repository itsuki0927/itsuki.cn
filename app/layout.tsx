import metadataConfig from '@/constants/seo';
import AppLayout from '@/layouts/AppLayout';
import { StandardProps } from '@/types/common';
import { IBM_Plex_Sans } from 'next/font/google';
import 'react-notion-x/src/styles.css';
import '../styles/global.css';
import ContentLayout from '@/layouts/ContentLayout';

export const metadata = metadataConfig;

const ibm = IBM_Plex_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-ibm',
});

const RootLayout = ({ children }: StandardProps) => {
  return (
    <html lang="en" className={ibm.className}>
      <body>
        <AppLayout>
          <main>
            <ContentLayout>{children}</ContentLayout>
          </main>
        </AppLayout>
      </body>
    </html>
  );
};

export default RootLayout;
