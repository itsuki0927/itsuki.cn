import { getTextContent, getDateValue } from "notion-utils";
import index from "@/libs/notion";
import {
  BlockMap,
  CollectionPropertySchemaMap,
  Decoration,
} from "notion-types";

async function getPageProperties(
  id: string,
  block: BlockMap,
  schema?: CollectionPropertySchemaMap,
) {
  console.log("block", block);
  const rawProperties = Object.entries(block?.[id]?.value?.properties || []);
  const excludeProperties = ["date", "select", "multi_select", "person"];
  const properties: Record<string, any> = {};
  if (!schema) {
    return {};
  }
  for (let i = 0; i < rawProperties.length; i++) {
    const [key, val] = rawProperties[i] || ["", undefined];
    const schemaKey = schema[key]?.name ?? "";
    properties.id = id;
    if (schema[key]?.type && !excludeProperties.includes(schemaKey)) {
      properties[schemaKey] = getTextContent(val as Decoration[]);
    } else {
      switch (schema[key]?.type) {
        case "date": {
          const dateProperty = getDateValue(val as any[]);
          if (dateProperty) {
            const { type, ...restProperty } = dateProperty;
            properties[schemaKey] = restProperty;
          }
          break;
        }
        case "select":
        case "multi_select": {
          const selects = getTextContent(val as Decoration[]);
          if (selects[0]?.length) {
            properties[schemaKey] = selects.split(",");
          }
          break;
        }
        case "person": {
          const rawUsers = (val as any[]).flat();
          const users = [];
          for (let i = 0; i < rawUsers.length; i++) {
            if (rawUsers[i][0][1]) {
              const userId = rawUsers[i][0];
              const res = await index.getUsers(userId);
              const resValue =
                res?.recordMapWithRoles?.notion_user?.[userId[1]]?.value;
              const user = {
                id: resValue?.id,
                first_name: resValue?.given_name,
                last_name: resValue?.family_name,
                profile_photo: resValue?.profile_photo,
              };
              users.push(user);
            }
          }
          properties[schemaKey] = users;
          break;
        }
        default:
          break;
      }
    }
  }

  // 从Block获取封面图;优先取PageCover，否则取内容图片
  function getPostCover(id: string, block: BlockMap) {
    const pageCover = block[id]?.value?.format?.page_cover;
    if (pageCover && pageCover.startsWith("/")) {
      return "https://www.notion.so" + pageCover;
      // return pageCover;
    } else if (pageCover && pageCover.startsWith("http")) {
      // return defaultMapImageUrl(pageCover, block[id].value);
      // return "https://www.notion.so" + pageCover;
      return pageCover;
    } else {
      // return BLOG?.defaultCover;
      return "defaultCover";
    }
  }

  properties.cover = getPostCover(id, block);
  delete properties.content;

  return properties;
}

export { getPageProperties as default };
