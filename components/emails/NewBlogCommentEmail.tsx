import markdownComponents from '@/components/markdown';
import EmailLayout from '@/layouts/EmailLayout';
import {
  Button,
  Heading,
  Img,
  Section,
  Text,
} from '@/layouts/EmailLayout/components';
import ReactMarkdown from 'react-markdown';

interface NewGuestbookEmailProps {
  link?: string | null;
  userName?: string | null;
  userImageUrl?: string | null;
  commentContent?: string | null;
  blogTitle?: string;
}

const NewBlogCommentEmail = ({
  link = 'https://itsuki.cn/guestbook',
  userImageUrl = 'https://itsuki.cn/logo.png',
  commentContent = '*测试评论*\n- Wow wtf\n- Cool',
  userName = 'test',
  blogTitle = 'test',
}: NewGuestbookEmailProps) => {
  const title = `👋 有人刚刚在文章：《${blogTitle}》评论了`;

  return (
    <EmailLayout previewText={title}>
      <Heading className="text-zinc-950 text-2xl font-normal text-center p-0 my-8 mx-0">
        {title}
      </Heading>

      <Section className="my-6">
        <Text className="px-4">
          {userImageUrl && (
            <Img
              src={userImageUrl}
              alt=""
              width="24"
              height="24"
              className="rounded-full"
            />
          )}
        </Text>
        <Text className="text-sm text-zinc-950 px-4">
          <b>{userName}</b>&nbsp;在《{blogTitle}》评论：
        </Text>
      </Section>

      <Section className="text-sm text-zinc-700">
        <Text className="px-4">
          {commentContent && (
            <ReactMarkdown components={markdownComponents}>
              {commentContent}
            </ReactMarkdown>
          )}
        </Text>
      </Section>

      {link && (
        <Section className="text-center my-8">
          <Button
            className="bg-zinc-900 rounded text-white text-sm font-semibold no-underline text-center px-5 py-3"
            href={link}
          >
            查看评论
          </Button>
        </Section>
      )}
    </EmailLayout>
  );
};

export default NewBlogCommentEmail;
