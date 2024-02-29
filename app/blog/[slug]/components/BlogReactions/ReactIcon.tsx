import prettifyNumber from '@/utils/prettifyNumber';
import {
  motion,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { ThumbsUp } from 'lucide-react';
import { ReactNode, useRef } from 'react';

interface ReactIconProps {
  y: MotionValue;
  icon: ReactNode;
  count?: number;
  onClick?: () => void;
}

const ReactIcon = ({ y, count = 0, onClick, icon }: ReactIconProps) => {
  const ref = useRef<HTMLButtonElement>(null);

  const distance = useTransform(y, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { y: 0, height: 0 };

    return val - bounds.y - bounds.height / 2;
  });

  const heightSync = useTransform(distance, [-120, 0, 120], [24, 56, 24]);
  const height = useSpring(heightSync, {
    mass: 0.1,
    stiffness: 180,
    damping: 15,
  });

  return (
    <motion.button
      ref={ref}
      type="button"
      style={{ height }}
      className="relative aspect-square h-8"
      whileTap={{
        scale: 1.3,
      }}
      onClick={onClick}
    >
      {icon ?? <ThumbsUp />}
      <span className="absolute -bottom-6 left-0 flex w-full items-center justify-center whitespace-nowrap text-xs font-semibold text-zinc-700/30 dark:text-zinc-200/25">
        {prettifyNumber(count, true)}
      </span>
    </motion.button>
  );
};

export default ReactIcon;
