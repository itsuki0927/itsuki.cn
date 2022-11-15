'use client';

import cn from 'classnames';
import Link from 'next/link';
import useDelayedRender from 'use-delayed-render';
import { useState, useEffect } from 'react';
import styles from './mobile-menu.module.css';
import { IconContent } from '../Navbar';

const MenuIcon = (props: JSX.IntrinsicElements['svg']) => (
  <svg
    className='absolute h-5 w-5 text-gray-900'
    width='20'
    height='20'
    viewBox='0 0 20 20'
    fill='none'
    {...props}
  >
    <path
      d='M2.5 7.5H17.5'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M2.5 12.5H17.5'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const CrossIcon = (props: JSX.IntrinsicElements['svg']) => (
  <svg
    className='absolute h-5 w-5 text-gray-900'
    viewBox='0 0 24 24'
    width='24'
    height='24'
    stroke='currentColor'
    strokeWidth='1.5'
    strokeLinecap='round'
    strokeLinejoin='round'
    fill='none'
    shapeRendering='geometricPrecision'
    {...props}
  >
    <path d='M18 6L6 18' />
    <path d='M6 6l12 12' />
  </svg>
);

const MobileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { mounted: isMenuMounted, rendered: isMenuRendered } = useDelayedRender(
    isMenuOpen,
    {
      enterDelay: 20,
      exitDelay: 300,
    }
  );

  function toggleMenu() {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      document.body.style.overflow = '';
    } else {
      setIsMenuOpen(true);
      document.body.style.overflow = 'hidden';
    }
  }

  useEffect(
    () => () => {
      document.body.style.overflow = '';
    },
    []
  );

  return (
    <>
      <button
        className={cn(styles.burger, 'visible md:hidden')}
        aria-label='Toggle menu'
        type='button'
        onClick={toggleMenu}
      >
        <MenuIcon data-hide={isMenuOpen} />
        <CrossIcon data-hide={!isMenuOpen} />
      </button>
      {isMenuMounted && (
        <div
          className={cn(
            styles.menu,
            'fixed flex flex-col bg-white',
            isMenuRendered && styles.menuRendered
          )}
        >
          <ul className='flex flex-col space-y-6'>
            <li
              className='border-b border-gray-300 text-sm font-semibold text-gray-900'
              style={{ transitionDelay: '150ms' }}
            >
              <Link href='/'>
                <a className='flex w-auto py-4'>首页</a>
              </Link>
            </li>
            <li
              className='border-b border-gray-300 text-sm font-semibold text-gray-900'
              style={{ transitionDelay: '150ms' }}
            >
              <Link href='/blog'>
                <a className='flex w-auto py-4'>文章</a>
              </Link>
            </li>
            <li
              className='border-b border-gray-300 text-sm font-semibold text-gray-900'
              style={{ transitionDelay: '250ms' }}
            >
              <Link href='/guestbook'>
                <a className='flex w-auto py-4'>留言板</a>
              </Link>
            </li>
            <li
              className='border-b border-gray-300 text-sm font-semibold text-gray-900'
              style={{ transitionDelay: '275ms' }}
            >
              <Link href='/archive'>
                <a className='flex w-auto py-4'>归档</a>
              </Link>
            </li>
            <li
              className='border-b border-gray-300 text-sm font-semibold text-gray-900'
              style={{ transitionDelay: '300ms' }}
            >
              <Link href='/about'>
                <a className='flex w-auto py-4'>关于</a>
              </Link>
            </li>
          </ul>

          <IconContent className='mt-6 flex' />
        </div>
      )}
    </>
  );
};

export default MobileMenu;
