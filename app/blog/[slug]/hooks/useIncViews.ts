import { readBlog } from '@/actions/blog';
import { useEffect } from 'react';

const useIncViews = (id: number) => {
  useEffect(() => {
    const inc = async () => {
      const { data } = await readBlog(id);
      console.log('data:', data);
    };
    inc();
  }, [id]);
};

export default useIncViews;
