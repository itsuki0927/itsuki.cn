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

const Category = ({ name }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const context = useContext(AppContext);
  const category = useMemo(
    () => context?.categories?.find(item => item.path === name),
    [name, context]
  );

  return (
    <div>
      <Banner data={category} />

      <ArticeList query={{ category: category?.id }} />
    </div>
  );
};

export default Category;
