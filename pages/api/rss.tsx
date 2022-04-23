import { NextApiRequest, NextApiResponse } from 'next';
import generateRSSFeed from '@/scripts/rss';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const rssXML = await generateRSSFeed();

  res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
  res.setHeader('Content-Type', 'application/xml');
  res.status(200).send(rssXML);
}
