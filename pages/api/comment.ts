import { NextApiRequest, NextApiResponse } from 'next';
import { getBlackList } from '@/api/blacklist';
import { formatUser } from '@/libs/auth';
import { auth } from '@/libs/firebase-admin';
import { PostCommentBody } from '@/entities/comment';
import { createComment } from '@/api/comment';

interface EnsureCommentPushParams {
  content: string;
  email: string;
}
const ensureCommentCanPush = async ({ content, email }: EnsureCommentPushParams) => {
  if (!content) {
    return { code: 10400, message: `老铁, 内容呢?\n` };
  }
  const { blacklist } = await getBlackList();
  const sensitiveKeyword = blacklist?.keyword.find(k => content.includes(k));
  if (sensitiveKeyword) {
    return {
      code: 10402,
      message: `老铁, 评论内容有敏感词: ${sensitiveKeyword}\n`,
    };
  }
  if (blacklist?.email.includes(email)) {
    return { code: 10401, message: `老铁, 做了坏事情, 被拉黑了\n` };
  }
  return true;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('api/comment', req.body, req.method, req.headers);
  const body = req.body as PostCommentBody;
  try {
    const idToken = await auth.verifyIdToken(req.headers.authorization ?? '');
    const userRecord = await auth.getUser(idToken.uid);
    const user = formatUser(userRecord);
    console.log('value:', idToken);
    console.log('user', user);
    console.log('userRecord', userRecord);
    if (req.method === 'POST') {
      const result = await ensureCommentCanPush({
        content: body.content,
        email: user.email,
      });
      console.log('result', result);
      if (result === true) {
        const comment = await createComment({ ...body, ...user });
        res.json({ comment });
      } else {
        res.status(400).json(result);
      }
    } else if (req.method === 'PATCH') {
      res.json({ message: 'not implement' });
    } else if (req.method === 'PUT') {
      res.json({ message: 'not implement' });
    }
  } catch (err) {
    console.log('api comment err', err);
  }
}
