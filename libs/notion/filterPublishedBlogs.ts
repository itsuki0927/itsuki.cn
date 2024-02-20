function filterPublishedPosts({
  posts,
  onlyNewsletter,
  onlyPost,
  onlyHidden,
}: any) {
  if (!posts || !posts.length) return [];
  console.log("posts:", posts);
  return (
    posts
      // .filter((post) =>
      //   onlyNewsletter ? post?.type?.[0] === "Newsletter" : post,
      // )
      // .filter((post) => (onlyPost ? post?.type?.[0] === "Post" : post))
      // .filter((post) =>
      //   onlyHidden ? post?.type?.[0] === "Hidden" : post?.type?.[0] !== "Hidden",
      // )
      .filter((post: any) => {
        return post.title && post?.status === "Published";
      })
  );
}

export default filterPublishedPosts;
