import CommentSender from '@/app/guestbook/components/CommentSender';
import GithubAuthIcon from '@/app/guestbook/components/GithubAuthIcon';
import GoogleAuthIcon from '@/app/guestbook/components/GoogleAuthIcon';
import Comments from '@/components/common/Comments';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import useScrollTo from '@/hooks/useScrollTo';
import {
  ArrowLeft,
  ArrowRight,
  MessageSquarePlus,
  Plus,
  RotateCcw,
} from 'lucide-react';
import { useParams } from 'next/navigation';
import useCreateComment from '../../hooks/useCreateComment';
import useGetComments from '../../hooks/useGetComments';
import useGetUser from '../../hooks/useGetUser';
import { useIndexContext } from './IndexProvider';
import ToggleSectionButton from './ToggleSectionButton';
import CommentAvatar from '@/app/guestbook/components/CommentAvatar';
import uniqBy from 'lodash.uniqby';
import { useState } from 'react';
import clsx from 'clsx';

interface PageSectionCommentsProps {
  blogId: number;
  index: number;
}

const PageSectionComments = ({ blogId, index }: PageSectionCommentsProps) => {
  const params = useParams();
  const slug = params?.slug ?? '';
  const section = `${slug}-${index}`;
  const { isLoading: isCommentsLoading, data } = useGetComments({
    blogId,
    section,
  });
  const { set, numSections } = useIndexContext();
  const comments = data || [];
  const { insertComment, isLoading } = useCreateComment();
  const { data: user } = useGetUser();
  const scrollTo = useScrollTo();
  const [open, setOpen] = useState(false);

  const sectionComments = `${section}-comments`;

  const gotoPageSectionComments = (nextIndex: number) => {
    const sectionKey = `${slug}-${nextIndex}-comments`;
    scrollTo(`#${sectionKey}`, 0, {
      onComplete: () => {
        set(nextIndex);
        const button = document.querySelector(
          `#${sectionKey}`,
        ) as HTMLButtonElement;
        if (button) {
          button.click();
        }
      },
    });
  };

  const hasComments = comments.length > 0;

  const commentAvatars = uniqBy(
    comments.map((item) => item.avatar),
    (x) => x,
  );

  // TODO: 间距有 2px 的gap
  return (
    <div className="">
      <div
        className={clsx(
          'absolute -right-2 flex origin-top-right appearance-none flex-col -space-y-1 md:right-[calc(100%+1.65rem)] md:w-16 md:flex-row md:-space-x-1.5 md:space-y-0 justify-end',
          hasComments ? '-translate-y-[2px] bottom-9' : 'bottom-8',
        )}
      >
        {hasComments ? (
          commentAvatars?.map((avatar) => (
            <CommentAvatar size={24} key={avatar} avatar={avatar} />
          ))
        ) : (
          <Button
            variant="ghost"
            className="flex items-center"
            onClick={() => setOpen(true)}
          >
            <MessageSquarePlus size={16} />
          </Button>
        )}
      </div>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="secondary"
            onClick={() => setOpen(true)}
            id={sectionComments}
          >
            {isCommentsLoading ? (
              <div className="flex items-center">
                <RotateCcw className="mr-2 h-4 w-4 animate-spin" />
                加载中...
              </div>
            ) : (
              `(${comments.length}) 条评论`
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-96 p-0">
          <div className="flex justify-between items-center p-2 border-b border-solid border-zinc-200">
            <h3 className="flex-1">{section}</h3>

            <ToggleSectionButton
              disabled={index === 0}
              onClick={() => {
                if (index === 0) {
                  return;
                }
                gotoPageSectionComments(index - 1);
              }}
              tooltipContent="上一个评论块"
            >
              <ArrowLeft size={14} />
            </ToggleSectionButton>

            <ToggleSectionButton
              disabled={index === numSections - 1}
              onClick={() => {
                if (index === numSections - 1) {
                  return;
                }
                gotoPageSectionComments(index + 1);
              }}
              tooltipContent="下一个评论块"
            >
              <ArrowRight size={14} />
            </ToggleSectionButton>
          </div>

          <Comments comments={comments} />
          {user ? (
            <CommentSender
              className="rounded-b-md border-t border-solid border-zinc-200"
              onSend={async (content) => {
                return insertComment({ content, blogId, section });
              }}
              isLoading={isLoading}
            />
          ) : (
            <div className=" px-4 py-4 border-t border-solid border-zinc-200">
              <p className="text-sm text-zinc-700 font-bold">评论需要先登陆</p>
              <div className="flex gap-4 mt-2">
                <GoogleAuthIcon />
                <GithubAuthIcon />
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default PageSectionComments;
