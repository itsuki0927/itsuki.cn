import { ADMIN_EMAIL1 } from '@/constants/env';

export const revalidate = 3600; // 1 hour

const BlockedPage = () => {
  return (
    <section className="pointer-events-none inset-0 flex py-24 w-full flex-col items-center justify-center">
      <div className="text-4xl font-extrabold text-gradient-primary pointer-events-none select-none">
        坏家伙做坏事，已禁止你的访问权限
      </div>
      <span className="mt-6 pointer-events-auto select-none text-sm font-bold text-white mix-blend-difference hover:underline">
        如果你认为你不应该被禁，请联系我的邮箱{' '}
        <a href={`mailto:${ADMIN_EMAIL1}`} className="font-bold underline">
          {ADMIN_EMAIL1}
        </a>
      </span>
    </section>
  );
};

export default BlockedPage;
