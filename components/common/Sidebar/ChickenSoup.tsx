import { Widget } from '@/components/ui';

const ChickenSoup = () => (
  <Widget>
    <Widget.Header>当幸福来敲门</Widget.Header>
    <div className='text-dark-2'>
      <q className='before:pr-1 before:content-[open-quote] after:pl-1 after:content-[close-quote]'>
        未来属于相信梦想的人.
      </q>
      {/* eslint-disable-next-line no-octal-escape */}
      <p className='mt-1 mb-4 pr-4 text-right text-xs tracking-widest text-gray-2 before:pr-1 before:content-["\2014"]'>
        itsuki
      </p>
    </div>
  </Widget>
);

export default ChickenSoup;
