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
    email: META.email,
    link: META.url,
  };
  const copyright = `All rights reserved ${now.getFullYear()}, Itsuki`;

  const feed = new Feed({
    title: META.title,
    description: META.description,
    id: baseUrl,
    link: baseUrl,
    language: 'zh',
    feedLinks: {
      rss2: `${baseUrl}/rss.xml`,
    },
    updated: now,
    author,
    copyright,
  });

  articles.data?.forEach(article => {
    const { title, tags, content, cover: image, createAt, id, description } = article;
    const link = getArticleDetailFullUrl(id);
    const date = new Date(createAt);

    feed.addItem({
      title,
      description,
      content,
      copyright,
      link,
      image,
      date,
      category: tags.map(tag => ({ name: tag.name })),
      id: `${id}`,
      author: [author],
      published: date,
    });
  });

  return feed.rss2();
};

export default generateRSSFeed;
