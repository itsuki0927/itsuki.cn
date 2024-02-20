import MyImage from "@/components/common/MyImage";
import { Blog } from "@/types/blog";
import Link from "next/link";

export interface BlogCardProps {
  blog: Blog;
}

const BlogCard = ({ blog }: BlogCardProps) => {
  const href = `/blog/${blog.slug}` as const;
  return (
    <div className="group relative overflow-hidden z-0 rounded-xl">
      <Link
        className="block w-full h-0 pt-[75%] sm:pt-[55%]  rounded-xl overflow-hidden z-0"
        href={href}
      >
        <div className="absolute inset-0 overflow-hidden z-0 mabeUrlOk">
          <MyImage
            alt={`${blog.title} cover`}
            className="object-cover w-full h-full"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
            fill
            src={blog.cover}
          />
        </div>
        <div className="absolute top-4 left-4" />
      </Link>
      <Link
        className="absolute inset-x-0 bottom-0 top-1/3 bg-gradient-to-t from-black/50"
        href={href}
      />
      <div className="absolute z-10 inset-x-0 bottom-0 p-4 sm:p-6 flex flex-col">
        <Link className="absolute inset-0" href={href} />
        <h3 className="mt-3.5 relative block font-semibold text-white text-lg sm:text-xl nc-card-title">
          <Link className="line-clamp-2 " href={href} title={blog.title}>
            {blog.title}
          </Link>
        </h3>
        <div className="hidden sm:block mt-3">
          <span className="text-neutral-200 text-sm line-clamp-2">
            <p>{blog.description}</p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
