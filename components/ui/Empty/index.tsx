interface EmptyProps {
  description?: string;
}

const Empty = ({ description = '空空如也.' }: EmptyProps) => (
  <div className='px-4 text-gray-3 sm:text-lg'>{description}</div>
);

export default Empty;
