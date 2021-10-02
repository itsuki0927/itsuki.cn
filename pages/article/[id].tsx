import { useRouter } from 'next/router';

const ArticlePage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <h1>Article-{id}</h1>;
};

export default ArticlePage;
