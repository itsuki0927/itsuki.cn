const Life = () => {
  const startTime = new Date('12/14/2021');
  const ile = Date.now() - startTime.getTime();
  const days = Math.floor(ile / (1000 * 60 * 60 * 24));

  return (
    <div className='bg-white p-4 text-center text-sm tracking-wider text-gray-3  '>
      有人活了 <strong className='text-basic '>{days}</strong> 天
      <span className='absolute ml-1 mt-[2px] text-xs text-gray-1'>(本网站)</span>
    </div>
  );
};

export default Life;
