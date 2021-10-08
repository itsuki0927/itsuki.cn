/* eslint-disable no-console */
import Error from 'next/error';

const ErrorPage = ({ statusCode }: any) => {
  console.log(`%c [statusCode: ${statusCode}] `, 'background: #fafafa; color: #ff4d4f');
  return <Error statusCode={statusCode} />;
};

ErrorPage.getInitialProps = ({ res, err }: any) => {
  // eslint-disable-next-line no-nested-ternary
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;
