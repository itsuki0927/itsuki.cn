import { Feed } from 'feed';
import { getArticles } from '@/api/article';
import { META } from '@/configs/app';
import { getArticleDetailFullUrl } from '@/utils/url';

const generateRSSFeed = async () => {
  const articles = await getArticles();
  const now = new Date();

  const baseUrl = META.url;
  const author = {
    name: META.author,
    email: META.url,
    link: META.url,
  };

  const feed = new Feed({
    title: META.title,
    description:
      'You can find me talking about topics related to JavaScript, TypeScript, React, Web development and technical/coding interviews',
    id: baseUrl,
    link: baseUrl,
    language: 'zh',
    feedLinks: {
      rss2: `${baseUrl}/rss.xml`,
    },
    updated: now,
    author,
    copyright: `All rights reserved ${now.getFullYear()}, Itsuki`,
  });

  articles.data?.forEach(article => {
    const { title, cover, createAt, id, description } = article;
    const url = getArticleDetailFullUrl(id);

    feed.addItem({
      title,
      description,
      image: cover,
      id: url,
      link: url,
      content: description,
      author: [author],
      date: new Date(createAt),
      published: new Date(createAt),
    });
  });

  return feed.rss2();
};

export default generateRSSFeed;
