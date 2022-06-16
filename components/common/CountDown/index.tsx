import { animated, config, useSpring } from '@react-spring/web';

interface CountDownProps {
  num?: number;
}

export const CountDown = ({ num = 0 }: CountDownProps) => {
  const { number } = useSpring({
    from: { number: 0 },
    number: num,
    config: config.molasses,
    delay: 200,
  });

  return <animated.span>{number.to(n => n.toFixed(0))}</animated.span>;
};

export default CountDown;
