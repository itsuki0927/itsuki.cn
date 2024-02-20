"use client";

import { GetBlogResponse } from "@/libs/notion/getBlog";
import clsx from "clsx";
import { motion } from "framer-motion";
import { BlockMap, PageBlock } from "notion-types";
import { getPageTableOfContents, uuidToId } from "notion-utils";
import { useMemo } from "react";
import ProgressBar from "./ProgessBar";
import useProgress from "./useProgress";
import useScrollSpy from "./useScrollSpy";

interface BlogTableOfContentProps extends GetBlogResponse {
  blocks: BlockMap;
}

const OFFSET = 150;

const BlogTableOfContent = ({
  blog,
  blocks,
  recordMap,
}: BlogTableOfContentProps) => {
  const tableContents = getPageTableOfContents(
    blocks[blog.id].value as PageBlock,
    recordMap,
  );
  const h2Headings = tableContents.filter(
    (tableContent) => tableContent.indentLevel >= 0,
  );

  const readingProgress = useProgress();
  const h2HeadingsDom = useMemo(() => {
    return (h2Headings ?? []).map(
      (item) => document.querySelector(`[data-id="${uuidToId(item.id)}"]`)!,
    );
  }, [h2Headings]);
  const [currentActiveIndex] = useScrollSpy(h2HeadingsDom, { offset: OFFSET });

  const handleScrollTo = (id: string) => {
    // scrollTo(id, -64 - 24);
  };

  return (
    <div className="top-1/2 left-4 hidden -translate-y-1/2 p-6 text-zinc-400 sm:fixed sm:flex">
      <ProgressBar progress={readingProgress} />
      <ul className="ml-4 hidden space-y-2 sm:block">
        {h2Headings.map((heading, index) => (
          <motion.li
            animate="show"
            className={clsx(
              "line-clamp-1 block cursor-pointer transition-colors hover:text-primary",
              currentActiveIndex === index ? "text-primary" : "",
            )}
            key={heading.id}
            onClick={() => {
              handleScrollTo(heading.id);
            }}
            transition={{ type: "spring" }}
          >
            <span className="text-sm">{heading.text}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default BlogTableOfContent;
