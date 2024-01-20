import index from "@/libs/notion";
import getAllBlogs from "./getAllBlogs";

const getBlog = async (slug: string) => {
  const blogs = await getAllBlogs();
  const blog = blogs?.find((blog) => blog.slug === slug);
  if (!blog) {
    throw new Error(`not found slug: ${slug} record`);
  }
  const recordMap = await index.getPage(blog.id);
  return { recordMap, blog };
};

export default getBlog;
