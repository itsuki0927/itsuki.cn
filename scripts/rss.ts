// const Feed = require('feed');
// const { writeFileSync } = require('fs');
// const { getArticles } = require('../api/article');
import { Feed } from 'feed';
// import fs from 'fs';
import { getArticles } from '@/api/article';

const generateRSSFeed = async () => {
  const articles = await getArticles();
  const date = new Date();

  const baseUrl = 'https://itsuki.cn';
  const author = {
    name: 'Itsuki',
    email: '2309899048@qq.com',
    link: 'https://itsuki.cn',
  };

  // Construct a new Feed object
  const feed = new Feed({
    title: "Itsuki's blog",
    description:
      'You can find me talking about topics related to JavaScript, TypeScript, React, Web development and technical/coding interviews',
    id: baseUrl,
    link: baseUrl,
    language: 'zh',
    feedLinks: {
      rss2: `${baseUrl}/rss.xml`,
    },
    updated: date,
    author,
    copyright: `All rights reserved ${date.getFullYear()}, Itsuki`,
  });

  articles.data?.forEach(article => {
    const { title, cover, category, createAt, id, description } = article;
    const url = `${baseUrl}/article/${id}`;

    feed.addItem({
      image: cover,
      title,
      id: url,
      link: url,
      description,
      content: description,
      author: [author],
      date: new Date(createAt),
      category: [category],
    });
  });

  return feed.rss2();
};

export default generateRSSFeed;
