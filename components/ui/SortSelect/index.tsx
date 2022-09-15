import { Check, ChevronDown } from 'react-feather';
import { Listbox, Transition } from '@headlessui/react';
import classNames from 'classnames';
import { Fragment } from 'react';

export enum Sort {
  Latest = 1,
  Earliest = 2,
}

export const sortList: SortItem[] = [
  { value: Sort.Latest, label: '最新' },
  { value: Sort.Earliest, label: '最早' },
  /* { value: 3, label: '最热' }, */
];

export type SortItem = {
  value: Sort;
  label: string;
};

export interface SortSelectProps {
  value: SortItem;
  onChange: (sort: SortItem) => void;
}

const SortSelect = ({ value, onChange }: SortSelectProps) => (
  <Listbox value={value} onChange={onChange}>
    {({ open }) => (
      <div className='relative mt-1 min-w-[100px]'>
        <Listbox.Button className='relative w-full cursor-pointer rounded-sm bg-gray-50 py-2 pl-3 pr-10 text-left transition-all hover:bg-gray-100 sm:text-sm'>
          <span className='block truncate'>{value.label}</span>
          <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
            <ChevronDown
              className={classNames(
                'h-4 w-4 text-gray-400 transition-transform',
                open ? 'rotate-180' : 'rotate-0'
              )}
              aria-hidden='true'
              size={16}
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Listbox.Options className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-sm bg-white py-1 text-base sm:text-sm'>
            {sortList.map(item => (
              <Listbox.Option
                key={item.value}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 pl-10 pr-4 transition-all ${
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-900'
                  }`
                }
                value={item}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {item.label}
                    </span>
                    {selected ? (
                      <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600'>
                        <Check className='h-4 w-4' aria-hidden='true' size={16} />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    )}
  </Listbox>
);

export default SortSelect;
