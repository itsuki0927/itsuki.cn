import { useState, useEffect } from 'react';
import { off, on } from '@/utils/events';
import debounce from '@/utils/debounce';

const TOPBAR_HEIGHT = 128;

const useSticky = () => {
  const [isSticky, setSticky] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleScroll = () => {
    const sticky = window.scrollY > TOPBAR_HEIGHT;
    setSticky(sticky);
  };

  useEffect(() => {
    const debounceScroll = debounce(handleScroll, 50);
    on(window, 'scroll', debounceScroll);

    return () => {
      off(window, 'scroll', debounceScroll);
    };
  }, [handleScroll]);

  return isSticky;
};

export default useSticky;
