'use server';

import { FormatUser } from '@/utils/formatUser';
import NewGuestbookEmail from '@/components/emails/NewGuestbookEmail';
import { BASE_URL, RESEND_EMAIL } from '@/constants/app';
import { ADMIN_EMAIL2, VERCEL_ENV } from '@/constants/env';
import { resend } from '@/libs/resend';

interface SendGuestbookEmailParams {
  user: FormatUser;
  content: string;
}

export const sendGuestbookEmail = async ({
  user,
  content,
}: SendGuestbookEmailParams) => {
  if (VERCEL_ENV === 'production') {
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
