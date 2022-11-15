// eslint-disable-next-line import/extensions
import 'styles/global.css';
import { StandardProps } from '@/types/common';
import AppLayout from './AppLayout';

const Layout = ({ children }: Pick<StandardProps, 'children'>) => (
  <html lang='en'>
    <body>
      <AppLayout>{children}</AppLayout>
    </body>
  </html>
);

export default Layout;
