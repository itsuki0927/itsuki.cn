import CommentSender from '@/app/guestbook/components/CommentSender';
import GithubAuthIcon from '@/app/guestbook/components/GithubAuthIcon';
import GoogleAuthIcon from '@/app/guestbook/components/GoogleAuthIcon';
import Comments, { EmptyComments } from '@/components/common/Comments';
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
  RotateCcw,
} from 'lucide-react';
import { useParams, useSearchParams } from 'next/navigation';
import useCreateComment from '../../hooks/useCreateComment';
import useGetComments from '../../hooks/useGetComments';
import useGetUser from '../../hooks/useGetUser';
import { useIndexContext } from './IndexProvider';
import ToggleSectionButton from './ToggleSectionButton';
import CommentAvatar from '@/app/guestbook/components/CommentAvatar';
import uniqBy from 'lodash.uniqby';
import { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';

interface PageSectionCommentsProps {
  blogId: number;
  index: number;
}
const useSection = () => {
  const params = useParams();
  const slug = params?.slug ?? '';
  return useCallback(
    (index: number) => {
      return `${slug}-${index}`;
    },
    [slug],
  );
};

const PageSectionComments = ({ blogId, index }: PageSectionCommentsProps) => {
  const buildSection = useSection();
  const searchParams = useSearchParams();
  const pageSectionComments = searchParams.get('pageSectionComments');
  const section = buildSection(index);
  const sectionCommentsKey = `${section}-comments`;
  const { set, numSections } = useIndexContext();
  const scrollTo = useScrollTo();
  const { isLoading: isCommentsLoading, data } = useGetComments({
    blogId,
    section,
  });
  const comments = data || [];
  const { insertComment, isLoading } = useCreateComment();
  const { data: user } = useGetUser();
  const [open, setOpen] = useState(false);

  const togglePageSectionComments = useCallback(
    (nextIndex: number) => {
      const nextSection = buildSection(nextIndex);
      const sectionKey = `${nextSection}-comments`;
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
    },
    [buildSection, scrollTo, set],
  );

  useEffect(() => {
    if (pageSectionComments) {
      togglePageSectionComments(Math.max(Number(pageSectionComments) - 1, 0));
    }
  }, [pageSectionComments]);

  const hasComments = comments.length > 0;

  const commentAvatars = uniqBy(
    comments.map((item) => item.avatar),
    (x) => x,
  );

  return (
    <div className="group">
      <Button variant="secondary" onClick={() => setOpen(true)}>
        {isCommentsLoading ? (
          <div className="flex items-center">
            <RotateCcw className="mr-2 h-4 w-4 animate-spin" />
            加载中...
          </div>
        ) : (
          `(${comments.length}) 条评论`
        )}
      </Button>
      <button
        className="rounded-full shadow-sm bg-zinc-100 absolute -right-2 bottom-10 flex origin-top-right translate-x-1.5 scale-95 transform-gpu appearance-none items-start opacity-0 transition-all group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100 md:right-[calc(100%+1.5rem)]"
        onClick={() => setOpen(true)}
      >
        <MessageSquarePlus size={16} />
      </button>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div
            id={sectionCommentsKey}
            onClick={() => setOpen(true)}
            className={clsx(
              'absolute cursor-pointer -translate-y-[2px] bottom-9 -right-2 flex origin-top-right appearance-none flex-col -space-y-1 md:right-[calc(100%+3rem)] md:w-16 md:flex-row md:-space-x-1.5 md:space-y-0 justify-end',
            )}
          >
            {hasComments
              ? commentAvatars?.map((avatar) => (
                  <CommentAvatar size={24} key={avatar} avatar={avatar} />
                ))
              : null}
          </div>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-96 p-0">
          <div className="flex justify-between items-center p-2 border-b border-solid border-zinc-200">
            <h3 className="flex-1 text-xs">
              第 {<b>{index + 1}</b>} 个评论块 /{' '}
              <span className="text-zinc-600">
                总共 <b>{numSections}</b> 个
              </span>
            </h3>

            <ToggleSectionButton
              disabled={index === 0}
              onClick={() => {
                if (index === 0) {
                  return;
                }
                togglePageSectionComments(index - 1);
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
                togglePageSectionComments(index + 1);
              }}
              tooltipContent="下一个评论块"
            >
              <ArrowRight size={14} />
            </ToggleSectionButton>
          </div>

          {comments?.length ? (
            <Comments comments={comments} />
          ) : (
            <EmptyComments className="bg-white" />
          )}

          {user ? (
            <CommentSender
              className="rounded-b-md border-t border-solid border-zinc-200"
              onSend={async (content) => {
                return insertComment({ content, blogId, section });
              }}
              cacheContentKey={sectionCommentsKey}
              isLoading={isLoading}
            />
          ) : (
            <div className="px-4 py-4 border-t border-solid border-zinc-200">
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
