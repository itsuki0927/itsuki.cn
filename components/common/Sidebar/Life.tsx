const Life = () => {
  const startTime = new Date('12/14/2021');
  const ile = Date.now() - startTime.getTime();
  const days = Math.floor(ile / (1000 * 60 * 60 * 24));

  return (
    <div className='bg-white p-4 text-center text-xs tracking-wider text-[#6f6f6f]'>
      有人活了 <strong className='text-[#444]'>{days}</strong> 天
    </div>
  );
};

export default Life;
