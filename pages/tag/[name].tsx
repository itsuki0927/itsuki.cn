import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useContext, useMemo } from 'react';
import ArticeList from '@/components/Article';
import Banner from '@/components/Banner';
import AppContext from '@/utils/context';

type StaticProps = {
  name: string;
};
export const getServerSideProps: GetServerSideProps<StaticProps> = async ({
  params,
}) => ({
  props: {
    name: params?.name as string,
  },
});

const TagPage = ({ name }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const context = useContext(AppContext);
  const tag = useMemo(
    () => context?.tags?.find(item => item.name === name),
    [name, context]
  );

  return (
    <div>
      <Banner data={tag} />

      <ArticeList query={{ tag: tag?.id }} />
    </div>
  );
};

export default TagPage;
