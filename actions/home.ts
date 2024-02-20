import { createBrowserClient } from "@/libs/supabase";
import { CommentState } from "@/constants/comment";
import getAllBlogs from "@/libs/notion/getAllBlogs";

export interface SummaryResponse {
  commentCount: number;
  blogCount: number;
  viewCount: number;
  onlineDays: number;
}

const getCommentCount = async () => {
  const supabase = createBrowserClient();
  try {
    const { data } = await supabase
      .from("comment")
      .select("*")
      .eq("state", CommentState.Published);
    if (data?.length) {
      return data.length;
    }
  } catch (err) {
    console.error("getSummary --> getComment error", err);
  }
  return 0;
};

const getOnlineDays = () => {
  const startTime = new Date("06/20/2022");
  const diffTime = Date.now() - startTime.getTime();
  const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return days + 1;
};

export const getSummary = async () => {
  const result: SummaryResponse = {
    commentCount: 0,
    blogCount: 0,
    viewCount: 0,
    onlineDays: getOnlineDays(),
  };

  result.commentCount = await getCommentCount();

  const blogs = await getAllBlogs();
  if (blogs?.length) {
    result.blogCount = blogs.length;
  }

  return result;
};
