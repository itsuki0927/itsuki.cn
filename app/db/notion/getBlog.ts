import notion from "@/app/lib/notion";

const getBlog = async (pageId: string) => {
  const recordMap = await notion.getPage(pageId);
  return { recordMap };
};

export default getBlog;
