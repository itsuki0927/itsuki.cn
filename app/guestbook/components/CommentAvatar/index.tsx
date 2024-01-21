"use client";

import MyImage from "@/components/common/MyImage";
import clsx from "clsx";
import { motion } from "framer-motion";

interface CommentAvatarProps {
  avatar: string | null | undefined;
  className?: string;
  size?: number;
  borderColor?: string;
  // provider?: string
}

const DEFAULT_AVATAR = `/avatar.jpg`;

// {isAdminEmail(comment.email) && (
//   <small className='cursor-pointert ml-1 rounded-sm group bg-blue-100 text-blue-600 px-1 py-[2px] text-xxs transition-all hover:bg-primary-600 hover:text-white'>
//     <ExternalLink
//       href='https://github.com/itsuki0927'
//       className='group-hover:text-white transition-all'
//     >
//       博主
//     </ExternalLink>
//   </small>
// )}

const commentAvatarVariant = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: -10 },
};

const CommentAvatar = ({
  avatar,
  className = "",
  size = 40,
  borderColor = "ring-zinc-200",
}: CommentAvatarProps) => (
  <motion.div
    className={clsx(
      "relative list-none max-h-[40px] max-w-[40px] rounded-full bg-zinc-200 ring-2 dark:bg-zinc-800 dark:ring-zinc-800",
      borderColor,
      className,
    )}
    variants={commentAvatarVariant}
    whileHover={{
      // scale: 1.2,
      marginRight: "5px",
      transition: { ease: "easeOut" },
    }}
  >
    <MyImage
      alt="cover"
      className="rounded-full"
      height={size}
      src={avatar ?? DEFAULT_AVATAR}
      width={size}
    />
  </motion.div>
);

export default CommentAvatar;
