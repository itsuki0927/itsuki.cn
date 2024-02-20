import { kvKeys } from "@/constants/kv";
import { redis } from "@/libs/upstash";
import prettifyNumber from "@/utils/prettifyNumber";
import { User } from "lucide-react";

const TotalPageViews = async () => {
  let views: number;
  if (process.env.NODE_ENV === "production") {
    views = await redis.incr(kvKeys.totalPageViews);
  } else {
    views = 345678;
  }

  return (
    <span className="flex items-center justify-center gap-1 text-xs text-zinc-500 dark:text-zinc-400 md:justify-start">
      <User className="h-4 w-4" />
      <span title={`${Intl.NumberFormat("en-US").format(views)}次浏览`}>
        总浏览量&nbsp;
        <span className="font-medium">{prettifyNumber(views, true)}</span>
      </span>
    </span>
  );
};

export default TotalPageViews;
