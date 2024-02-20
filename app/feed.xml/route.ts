import generateRSSFeed from '@/libs/feed';

export const revalidate = 60 * 60; // 1 hour

export async function GET() {
  const rssXML = await generateRSSFeed();

  return new Response(rssXML, {
    headers: {
      'content-type': 'application/xml',
    },
  });
}
