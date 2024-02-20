import { NOTION_AUTH_TOKEN } from "@/constants/notion";
import { NotionAPI } from "notion-client";

const notion = new NotionAPI({
  authToken: NOTION_AUTH_TOKEN,
});

export default notion;
