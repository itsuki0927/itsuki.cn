import { KeyboardEvent } from 'react';
import { useRouter } from 'next/router';
import { Input, Widget } from '@/components/ui';

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
      <Input
        className='mb-2 block h-9 w-full px-3 text-xs tracking-widest dark:border-gray-3--dark dark:bg-white-1--dark'
        placeholder='搜点什么'
        onKeyUp={handleSearch}
      />
    </Widget>
  );
};

export default Search;
