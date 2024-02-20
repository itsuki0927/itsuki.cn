const BlogContentSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto bg-zinc-100 p-4 rounded-lg h-dvh animate-pulse">
      <div className="bg-zinc-200 w-full h-44 rounded-md "></div>
      <ol className="mt-12 gap-6">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="space-y-6 py-1">
            {item < 2 ? <div className="h-20 bg-zinc-200 rounded"></div> : null}
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                {item % 2 ? (
                  <div className="h-8 bg-zinc-200 rounded col-span-2"></div>
                ) : null}
                <div className="h-8 bg-zinc-200 rounded col-span-1"></div>
                {item % 2 === 0 ? (
                  <div className="h-8 bg-zinc-200 rounded col-span-2"></div>
                ) : null}
              </div>
              <div className="h-4 bg-zinc-200 rounded"></div>
            </div>
            {item >= 2 ? (
              <div className="h-20 bg-zinc-200 rounded"></div>
            ) : null}
          </div>
        ))}
      </ol>
    </div>
  );
};

export default BlogContentSkeleton;
