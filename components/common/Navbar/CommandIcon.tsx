import { Dialog, Transition } from '@headlessui/react';
import Link from 'next/link';
import { Fragment, useEffect, useRef, useState } from 'react';
import { Book, Command, Edit2, Home, MessageSquare, User } from 'react-feather';

const pages = [
  {
    name: '首页',
    description: '要做一个很酷的人',
    href: '/',
    icon: Home,
  },
  {
    name: '文章',
    description: '这里的每一个文字, 都是我走过的路',
    href: '/blog',
    icon: Edit2,
  },
  {
    name: '留言',
    description: '我们穷极一生, 我们要学会的, 不过是彼此拥抱',
    href: '/guestbook',
    icon: MessageSquare,
  },
  {
    name: '归档',
    description: '有时候幸福需要等一等',
    href: '/archive',
    icon: Book,
  },
  {
    name: '关于',
    description: '关于我, 关于你, 关于我们',
    href: '/about',
    icon: User,
  },
];

export interface CommandIconProps {
  onClick?: (action: string, type: string) => void;
}

const CommandIcon = ({ onClick }: CommandIconProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState('');
  const filteredPages = pages.filter(page => {
    if (value) {
      return (
        page.href.includes(value) ||
        page.name.includes(value) ||
        page.description.includes(value)
      );
    }
    return true;
  });

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <>
      <a
        tabIndex={0}
        role='button'
        key='activity'
        className='rounded-md p-2 text-center transition-colors hover:bg-gray-100'
        onClick={() => {
          openModal();
          onClick?.('command', 'command');
        }}
      >
        <Command size={18} />
      </a>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={() => closeModal()}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title as='h3' className='text-gray-900'>
                    <input
                      value={value}
                      onChange={e => setValue(e.target.value)}
                      ref={inputRef}
                      className='w-full rounded-md bg-gray-50 p-3 indent-2 text-lg transition-colors focus:bg-gray-100 focus:outline-none'
                      placeholder='搜索页面、命令'
                    />
                  </Dialog.Title>

                  <div className='mt-8 rounded-lg'>
                    <div className='mb-1 text-sm text-gray-500'>页面</div>
                    <div className='relative grid gap-2 bg-white '>
                      {filteredPages.map(page => (
                        <Link href={page.href} key={page.name}>
                          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
                          <a
                            onClick={closeModal}
                            className='focus-visible:ring-orange-500 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-opacity-50'
                          >
                            <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-gray-50 text-white sm:h-12 sm:w-12'>
                              <page.icon aria-hidden='true' className='stroke-gray-500' />
                            </div>
                            <div className='ml-4'>
                              <p className='text-sm font-medium text-gray-900'>
                                {page.name}
                              </p>
                              <p className='text-sm text-gray-500'>{page.description}</p>
                            </div>
                          </a>
                        </Link>
                      ))}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CommandIcon;
