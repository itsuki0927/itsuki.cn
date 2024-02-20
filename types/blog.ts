export enum BlogState {
  Published = 'Published',
  Draft = 'Draft',
  Privated = 'Privated',
}

export enum BlogCategory {
  Blog = 'blog',
  Run = 'run',
}

export interface Blog {
  id: string;
  title: string;
  cover: string;
  mood: 'happy' | 'sad' | 'neutral';
  category: BlogCategory;
  state: BlogState;
  author: string;
  description: string;
  keywords: string;
  slug: string;
  tags: string[];
  recent?: 'true' | 'false';
  createdAt?: Date;
  publishedAt?: Date;
  updatedAt?: Date;
}
