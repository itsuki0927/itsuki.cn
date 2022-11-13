import { motion, useReducedMotion } from 'framer-motion';
import React from 'react';

export interface ProgressBarProps {
  progress: number;
}
const ProgressBar = ({ progress }: ProgressBarProps) => {
  const [visibility, setVisibility] = React.useState(true);
  const shouldReduceMotion = useReducedMotion();

  const progressBarWrapperVariants = {
    hide: {
      opacity: shouldReduceMotion ? 1 : 0,
    },
    show: (visibilityParams: boolean) => ({
      // eslint-disable-next-line no-nested-ternary
      opacity: shouldReduceMotion ? 1 : visibilityParams ? 0.7 : 0,
    }),
  };

  React.useEffect(() => {
    setVisibility(progress >= 0.07 && progress <= 0.95);
  }, [progress]);

  return (
    <motion.div
      className='h-[calc(88vh - 40px)] max-h-[425px] w-[2px] bg-gray-100'
      initial='hide'
      variants={progressBarWrapperVariants}
      animate='show'
      transition={{ type: 'spring' }}
      custom={visibility}
    >
      <motion.div
        className='h-full w-[2px] origin-top bg-gray-400'
        style={{
          scaleY: progress,
        }}
        data-testid='progress-bar'
        data-testprogress={progress}
      />
    </motion.div>
  );
};

export default ProgressBar;
