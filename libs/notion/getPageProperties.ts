import { getTextContent, getDateValue } from "notion-utils";
import {
  BlockMap,
  CollectionPropertySchemaMap,
  Decoration,
} from "notion-types";

const getPageProperties = (
  id: string,
  block: BlockMap,
  schema?: CollectionPropertySchemaMap,
) => {
  const rawProperties = Object.entries(block?.[id]?.value?.properties || []);

  const excludeProperties = [
    "category",
    "state",
    "recent",
    "tags",
    "updatedAt",
    "createdAt",
    "publishedAt",
    "mood",
  ];
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
        case "last_edited_time":
        case "created_time":
        case "date": {
          const dateProperty = getDateValue(val as any[]);
          if (dateProperty) {
            properties[schemaKey] = dateProperty.start_date;
          }
          break;
        }
        case "select": {
          const selects = getTextContent(val as Decoration[]);
          if (selects[0]?.length) {
            properties[schemaKey] = selects;
          }
          break;
        }
        case "multi_select": {
          const selects = getTextContent(val as Decoration[]);
          if (selects[0]?.length) {
            properties[schemaKey] = selects.split(",");
          }
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
};

export { getPageProperties as default };
