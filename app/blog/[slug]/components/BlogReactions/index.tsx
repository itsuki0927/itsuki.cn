'use client';

import { Blog } from '@/types/blog';
import { motion, useMotionValue } from 'framer-motion';
import { useCallback, useState } from 'react';
import type { MouseEvent } from 'react';
import ReactIcon from './ReactIcon';
import buildUrl from '@/utils/buildUrl';
import {
  Angry,
  Annoyed,
  Flame,
  Frown,
  HandMetal,
  Heart,
  HeartCrack,
  Laugh,
  PartyPopper,
  ThumbsUp,
} from 'lucide-react';
import useIncViews from './hooks';
import { toast } from 'sonner';

const moodToReactions = (mood?: Blog['mood']) => {
  switch (mood) {
    case 'happy':
      return ['claps', 'tada', 'confetti', 'fire'];
    case 'sad':
      return ['pray', 'cry', 'heart', 'hugs'];
    default:
      return ['claps', 'heart', 'thumbs-up', 'fire'];
  }
};

const getMoodIcon = (reaction: string) => {
  switch (reaction) {
    case 'claps':
      return <HandMetal />;
    case 'tada':
      return <PartyPopper />;
    case 'confetti':
      return <Laugh />;
    case 'fire':
      return <Flame />;
    case 'pray':
      return <HeartCrack />;
    case 'cry':
      return <Angry />;
    case 'hugs':
      return <Frown />;
    case 'thumbs-up':
      return <ThumbsUp />;
    case 'heart':
      return <Heart />;
    default:
      return <Annoyed />;
  }
};

interface BlogReactionsProps extends Pick<Blog, 'id'> {
  reactions?: number[];
  mood?: Blog['mood'];
}

const BlogReactions = ({ id, mood, reactions }: BlogReactionsProps) => {
  const mouseY = useMotionValue(Infinity);
  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      mouseY.set(e.clientY);
    },
    [mouseY],
  );
  const [cachedReactions, setCachedReactions] = useState(
    reactions ?? [0, 0, 0, 0],
  );

  useIncViews(id);

  const onClick = async (index: number) => {
    setCachedReactions((prev) => {
      const next = [...prev];
      ++next[index];
      return next;
    });
    try {
      const res = await fetch(
        buildUrl(`/api/reactions?id=${id}&index=${index}`),
        {
          method: 'PATCH',
        },
      );
      const { data } = (await res.json()) as { data: number[] };
      setCachedReactions(data);
    } catch (err: any) {
      console.dir(err);
      toast('点赞失败:' + err.message);
    }
  };

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
        type: 'spring',
        damping: 15,
        stiffness: 180,
      }}
    >
      {moodToReactions(mood).map((reaction, idx) => (
        <ReactIcon
          key={idx}
          y={mouseY}
          icon={getMoodIcon(reaction)}
          count={cachedReactions[idx]}
          onClick={() => onClick(idx)}
        />
      ))}
    </motion.div>
  );
};

export default BlogReactions;
