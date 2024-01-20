import { motion, useReducedMotion } from "framer-motion";
import React, { useEffect } from "react";

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
      opacity: shouldReduceMotion ? 1 : visibilityParams ? 0.7 : 0,
    }),
  };

  useEffect(() => {
    setVisibility(progress >= 0.07 && progress <= 0.95);
  }, [progress]);

  return (
    <motion.div
      animate="show"
      className="h-[calc(88vh - 40px)] max-h-[425px] w-[2px] bg-gray-100"
      custom={visibility}
      initial="hide"
      transition={{ type: "spring" }}
      variants={progressBarWrapperVariants}
    >
      <motion.div
        className="h-full w-[2px] origin-top bg-primary"
        data-testid="progress-bar"
        data-testprogress={progress}
        style={{
          scaleY: progress,
        }}
      />
    </motion.div>
  );
};

export default ProgressBar;
