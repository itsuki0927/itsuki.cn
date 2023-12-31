import { idToUuid } from "notion-utils";
import type { ExtendedRecordMap } from "notion-types";

function getAllPageIds(
  collectionQuery: ExtendedRecordMap["collection_query"],
  viewId?: string,
): string[] {
  const views = Object.values(collectionQuery)[0];
  if (views) {
    if (viewId) {
      const vId = idToUuid(viewId);
      return views[vId]?.blockIds || [];
    } else {
      const pageSet = new Set<string>();
      Object.values(views).forEach((view) => {
        view?.collection_group_results?.blockIds?.forEach((id) =>
          pageSet.add(id),
        );
      });
      return [...pageSet];
    }
  }
  return [];
}

export default getAllPageIds;
