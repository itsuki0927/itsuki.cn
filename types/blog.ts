export enum BlogState {
  Published = "Published",
  Draft = "Draft",
  Privated = "Privated",
}

export interface Blog {
  category: "blog" | "run";
  state: BlogState;
  title: string;
  author: string;
  description: string;
  id: string;
  keywords: string;
  path: string;
  recent?: "true" | "false";
  slug: string;
  tags: string[];
  createAt: Date;
  publishAt?: Date;
  updateAt: Date;
}
