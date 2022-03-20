import { KeyboardEvent } from 'react';
import { useRouter } from 'next/router';
import { SearchOutlined } from '@/components/icons';

const HeaderSearch = () => {
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
    <div className='h-16 flex-auto leading-16'>
      <div className='flex h-full items-center'>
        <SearchOutlined className='mr-4' />
        <input placeholder='搜索' className='w-full' onKeyUp={handleSearch} />
      </div>
    </div>
  );
};

export default HeaderSearch;
