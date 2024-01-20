import { Blog, BlogState } from "@/types/blog";
import { GetAllBlogsParams } from "./getAllBlogs";

interface FilterPublishedPostsParams extends GetAllBlogsParams {
  posts: Blog[];
}

const filterPublishedPosts = ({
  posts,
  onlyRecent,
}: FilterPublishedPostsParams) => {
  if (!posts || !posts.length) return [];
  return posts
    .filter((post) => {
      if (onlyRecent) {
        return post.recent && post?.recent === "true";
      }
      return true;
    })
    .filter((post) => post.title && post?.state === BlogState.Published);
};

export default filterPublishedPosts;
