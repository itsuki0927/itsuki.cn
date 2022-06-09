import Container from '../Container';

interface EmptyProps {
  description?: string;
}

const Empty = ({ description = '空空如也.' }: EmptyProps) => (
  <Container className='text-lg text-gray-3'>{description}</Container>
);

export default Empty;
