'use client';
// TODO: 得这么写, 为啥呢?

import { FormatUser } from '@/utils/formatUser';
import NewGuestbookEmail from '@/components/emails/NewGuestbookEmail';
import { BASE_URL, RESEND_EMAIL } from '@/constants/app';
import { ADMIN_EMAIL2, ENV } from '@/constants/env';
import { resend } from '@/libs/resend';
import NewBlogCommentEmail from '@/components/emails/NewBlogCommentEmail';

interface SendGuestbookEmailParams {
  user: FormatUser;
  content: string;
}

export const sendGuestbookEmail = async ({
  user,
  content,
}: SendGuestbookEmailParams) => {
  if (ENV.isProd) {
    const { data, error } = await resend.emails.send({
      from: RESEND_EMAIL,
      to: ADMIN_EMAIL2,
      subject: '👋 有人刚刚在留言墙留言了',
      react: NewGuestbookEmail({
        link: new URL(`${BASE_URL}/guestbook`).href,
        userName: user?.nickname,
        userImageUrl: user?.avatar,
        commentContent: content,
      }),
    });
    if (error) {
      console.error('[Resend] error:', error);
    }
    console.log('🎉 [Resend] 发送成功', data);
  }
};

interface SendBlogCommentEmailParams {
  user: FormatUser;
  content: string;
  blogSlug: string;
  blogTitle: string;
}

export const sendBlogCommentEmail = async ({
  user,
  content,
  blogTitle,
  blogSlug,
}: SendBlogCommentEmailParams) => {
  if (ENV.isProd) {
    const { data, error } = await resend.emails.send({
      from: RESEND_EMAIL,
      to: ADMIN_EMAIL2,
      subject: `👋 有人刚刚在《${blogTitle}》评论了`,
      react: NewBlogCommentEmail({
        link: new URL(`${BASE_URL}/blog/${blogSlug}`).href,
        userName: user?.nickname,
        userImageUrl: user?.avatar,
        commentContent: content,
        blogTitle,
      }),
    });
    if (error) {
      console.error('[Resend] error:', error);
    }
    console.log('🎉 [Resend] 发送成功', data);
  }
};
