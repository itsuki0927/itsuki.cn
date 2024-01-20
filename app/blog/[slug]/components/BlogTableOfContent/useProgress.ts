"use client";

import { useScroll } from "framer-motion";
import { useEffect, useState } from "react";

const useProgress = () => {
  const [readingProgress, setReadingProgress] = useState(0);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    scrollYProgress.on("change", (latest) => {
      setReadingProgress(parseFloat(latest.toFixed(2)));
    });

    return () => {
      scrollYProgress.destroy();
    };
  }, [scrollYProgress]);

  return readingProgress;
};

export default useProgress;
