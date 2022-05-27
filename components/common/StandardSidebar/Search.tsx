import { KeyboardEvent } from 'react';
import { useRouter } from 'next/router';
import { Widget } from '@/components/ui';

const Search = () => {
  const router = useRouter();

  const handleSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.key === 'Enter') {
      const { value } = e.currentTarget;
      if (value) {
        router.push(`/search/${value}`, undefined, { shallow: true });
      }
    }
  };

  return (
    <Widget>
      <Widget.Header>我寻你千百度</Widget.Header>
      <input
        className='mb-2 block h-9 w-full rounded-sm bg-white-1 px-3 text-sm outline-none transition-colors duration-200 hover:bg-white-2 focus:bg-white-2 '
        placeholder='搜点什么'
        onKeyUp={handleSearch}
      />
    </Widget>
  );
};

export default Search;
