"use client";

import { updateReactions } from "@/actions/blog";
import { Blog } from "@/types/blog";
import { motion, useMotionValue } from "framer-motion";
import React from "react";
import ReactIcon from "./ReactIcon";
import { useToast } from "@/components/ui/use-toast";

function moodToReactions(mood: Blog["mood"]) {
  switch (mood) {
    case "happy":
      return ["claps", "tada", "confetti", "fire"];
    case "sad":
      return ["pray", "cry", "heart", "hugs"];
    default:
      return ["claps", "heart", "thumbs-up", "fire"];
  }
}

interface BlogReactionsProps extends Pick<Blog, "id"> {
  reactions?: number[];
  mood: Blog["mood"];
}

const BlogReactions = ({ id, mood, reactions }: BlogReactionsProps) => {
  const { toast } = useToast();
  const mouseY = useMotionValue(Infinity);
  const onMouseMove = React.useCallback(
    (e: React.MouseEvent) => {
      mouseY.set(e.clientY);
    },
    [mouseY],
  );
  const [cachedReactions, setCachedReactions] = React.useState(
    reactions ?? [0, 0, 0, 0],
  );

  const onClick = React.useCallback(
    async (index: number) => {
      setCachedReactions((prev) => {
        const next = [...prev];
        ++next[index];
        return next;
      });
      try {
        const data = await updateReactions(id, index);
        setCachedReactions(data);
      } catch (err: any) {
        console.dir(err);
        toast({
          content: "点赞失败",
          description: err.message,
        });
      }
    },
    [id, toast],
  );

  return (
    <motion.div
      className="pointer-events-auto flex w-12 flex-col items-center justify-center gap-8 rounded-3xl bg-gradient-to-b from-zinc-100/80 to-white/90 px-1 pb-8 pt-4 ring-1 ring-zinc-400/10 backdrop-blur-lg dark:from-zinc-800/80 dark:to-zinc-950/80 dark:ring-zinc-500/10"
      onMouseMove={onMouseMove}
      onMouseLeave={() => mouseY.set(Infinity)}
      initial={{
        opacity: 0,
        y: 8,
        rotateY: 90,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotateY: 0,
      }}
      transition={{
        delay: 0.5,
        duration: 0.55,
        type: "spring",
        damping: 15,
        stiffness: 180,
      }}
    >
      {moodToReactions(mood).map((reaction, idx) => (
        <ReactIcon
          key={idx}
          y={mouseY}
          image={`/reactions/${reaction}.png`}
          count={cachedReactions[idx]}
          onClick={() => onClick(idx)}
        />
      ))}
    </motion.div>
  );
};

export default BlogReactions;
