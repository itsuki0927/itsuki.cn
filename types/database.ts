import { Database as DatabaseGenerated } from "@/types_db";
import { MergeDeep } from "type-fest";
import { CommentEmoji } from "./comment";

export type Database = MergeDeep<
  DatabaseGenerated,
  {
    public: {
      Tables: {
        comment: {
          Row: {
            emoji: CommentEmoji;
          };
          Insert: {
            emoji?: CommentEmoji;
          };
          Update: {
            emoji?: CommentEmoji;
          };
        };
      };
    };
  }
>;
