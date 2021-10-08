/* eslint-disable no-console */
import { NextPage } from 'next';
import Error from 'next/error';

type ErrorPageProps = {
  statusCode?: number;
};

const ErrorPage: NextPage<ErrorPageProps> = ({ statusCode }) => {
  console.log(`%c [statusCode: ${statusCode}] `, 'background: #fafafa; color: #ff4d4f');
  return <Error statusCode={statusCode || 500} />;
};

ErrorPage.getInitialProps = ({ res, err }) => {
  // eslint-disable-next-line no-nested-ternary
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;
