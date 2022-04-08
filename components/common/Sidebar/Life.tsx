const Life = () => {
  const startTime = new Date('12/14/2021');
  const ile = Date.now() - startTime.getTime();
  const days = Math.floor(ile / (1000 * 60 * 60 * 24));

  return (
    <div className='bg-white p-4 text-center text-xs tracking-wider text-gray-3 dark:bg-white--dark dark:text-gray-3--dark'>
      有人活了 <strong className='text-basic dark:text-basic--dark'>{days}</strong> 天
    </div>
  );
};

export default Life;
