// eslint-disable-next-line import/no-extraneous-dependencies
import { Feed, Item } from 'feed';
import { BASE_URL } from '@/constants/app';
import { META } from '@/constants/seo';
import { getAllBlogs } from '@/actions/blog';

const generateRSSFeed = async () => {
  const blogs = await getAllBlogs();
  const now = new Date();

  const baseUrl = META.url;
  const author = {
    name: META.author,
    email: META.email,
    link: baseUrl,
  };
  const copyright = `All rights reserved ${now.getFullYear()}, Itsuki`;

  const feed = new Feed({
    title: META.title,
    description: META.description,
    id: baseUrl,
    link: baseUrl,
    language: 'zh',
    image: `${BASE_URL}/logo.png`,
    favicon: `${BASE_URL}/favicon.ico`,
    feedLinks: {
      rss2: `${baseUrl}/rss.xml`,
    },
    updated: now,
    author,
    copyright,
  });

  blogs.forEach(
    ({
      title,
      cover: image,
      createdAt,
      publishedAt,
      updatedAt,
      id,
      slug,
      description,
    }) => {
      const link = `${BASE_URL}/blog/${slug}`;
      const date = new Date(
        publishedAt || updatedAt || createdAt || Date.now(),
      );

      const item: Item = {
        title,
        description,
        copyright,
        link,
        date,
        id,
        author: [author],
        published: date,
      };

      if (image) {
        item.image = image.replaceAll('&', '&amp;');
      }

      feed.addItem(item);
    },
  );

  return feed.rss2();
};

export default generateRSSFeed;
