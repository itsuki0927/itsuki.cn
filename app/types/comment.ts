import { Database } from "@/types_db";

export type CommentTableType = Database["public"]["Tables"]["comment"];

export type Comment = CommentTableType["Row"];

export type InsertComment = CommentTableType["Insert"];

export type UpdateComment = CommentTableType["Update"];

export type CommentEmoji = Record<string, string[]>;
