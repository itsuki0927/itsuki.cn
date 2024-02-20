import { NOTION_PAGE_ID } from "@/constants/notion";
import index from ".";

const getRootPage = async () => {
  let id = NOTION_PAGE_ID;
  const response = await index.getPage(id);

  const collection = Object.values(response.collection)[0]?.value;
  const collectionQuery = response.collection_query;
  const block = response.block;
  const schema = collection?.schema;

  return { block, schema, collectionQuery };
};

export default getRootPage;
