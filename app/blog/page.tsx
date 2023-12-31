import Title from "../components/Title";
import { getBlogs } from "../services/blog";
import BlogCard from "./components/BlogCard";

const NotionPage = async () => {
  const data = await getBlogs();

  return (
    <div className="container">
      <Title
        title="文章"
        subTitle="以输出倒逼输入，通过写博客文章来分享技术知识，也希望能够帮助更多的人。主要写技术相关的话题，但也会涉及一些非技术的内容，比如跑步、工作、读书感悟和生活随笔等。"
      />

      <div className=" grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-7 mt-5 md:mt-7 ">
        {data.map((item) => (
          <BlogCard key={item.id} blog={item} />
        ))}
      </div>
    </div>
  );
};

export default NotionPage;
