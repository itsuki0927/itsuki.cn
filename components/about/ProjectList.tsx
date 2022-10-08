import ExternalLink from '@/components/common/ExternalLink';

interface BlogEntryProps {
  body: string;
  url: string;
  name: string;
  tag: string;
}

function BlogEntry({ body, url, name, tag }: BlogEntryProps) {
  return (
    <div className='flex flex-col'>
      <div className='mb-2 flex items-center space-x-3'>
        <ExternalLink
          href={url}
          className='text-gray-600 transition-colors hover:text-primary'
        >
          {name}
        </ExternalLink>
        <span className='rounded-sm bg-primary-light py-[2px] px-[10px] text-sm text-primary'>
          {tag}
        </span>
      </div>
      <div className='w-full text-sm text-gray-500'>{body}</div>
    </div>
  );
}

const projects: BlogEntryProps[] = [
  {
    body: '基于 Next.js、@tanstack/react-query、TailwindCss、Graphql 的 ISR 应用',
    url: 'https://github.com/itsuki0927/itsuki.cn',
    name: 'itsuki.cn',
    tag: '前端',
  },
  {
    body: '基于 SpringBoot、SpringBootJPA、Mysql、Graphql 的后端应用',
    url: 'https://github.com/itsuki0927/itsuki-server.cn',
    name: 'itsuki-server',
    tag: '后端',
  },
  {
    body: '基于 React.js、Vite、Pro-Components、Graphql 的 Web 应用',
    url: 'https://github.com/itsuki0927/itsuki-admin.cn',
    name: 'itsuki-admin',
    tag: '后台',
  },

  {
    body: '魔改NvChad的nvim前端配置, SkCode = VsCode + Nvim',
    url: 'https://github.com/itsuki0927/skcode',
    name: 'SkCode',
    tag: 'vim',
  },
];

const ProjectList = () => (
  <div className='mt-8 grid grid-cols-1 gap-8 bg-white p-6 sm:grid-cols-2'>
    {projects.map(project => (
      <BlogEntry {...project} />
    ))}
  </div>
);

export default ProjectList;
