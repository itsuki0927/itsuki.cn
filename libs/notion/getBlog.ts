import index from "@/libs/notion";

const getBlog = async (pageId: string) => {
  const recordMap = await index.getPage(pageId);
  return { recordMap };
};

export default getBlog;
