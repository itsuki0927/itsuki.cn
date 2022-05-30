const experienceList: ExperienceCardProps[] = [
  {
    post: '前端实习生',
    company: '网易',
    startTime: '22/03',
    endTime: '22/05',
    description: '正在构建永劫无间相关的双端项目...',
    techStack: 'Vue2.0、 Jquery、 JavaScript、 Css',
  },
  {
    post: '前端实习生',
    company: '长沙腾讯',
    startTime: '21/07',
    endTime: '21/09',
    description: '完成了一个简单的 crud 的后台管理系统.',
    techStack: 'Vue2.0、 Vue-Element-Admin',
  },
  {
    post: '前端工程师',
    company: '湖南中一网络',
    startTime: '20/06',
    endTime: '20/08',
    description: '实现了一个 Ant-Design3 的 ProTable .',
    techStack: 'React、 Ant-Design3、 Admin',
  },
];

interface ExperienceCardProps {
  post: string;
  company: string;
  startTime: string;
  endTime: string;
  description: string;
  techStack: string;
}

const ExperienceCard = ({
  post,
  company,
  startTime,
  endTime,
  description,
  techStack,
}: ExperienceCardProps) => (
  <div className='border-b border-dashed border-gray-1 pt-2 pb-6 pl-0 before:contents '>
    <h3 className='m-0 text-base font-normal'>{post}</h3>
    <div className='flex justify-between text-sm text-gray-3 '>
      <div>{company}</div>
      <div>
        <time dateTime={startTime}>{startTime}</time> -{' '}
        <time dateTime={endTime}>{endTime}</time>
      </div>
    </div>
    <p className='mt-4 mb-0 text-sm'>{description}</p>
    <p className='my-0 text-sm'>技术栈: {techStack}</p>
  </div>
);

const ExperienceList = () => (
  <div className='space-y-4'>
    {experienceList.map(experience => (
      <ExperienceCard {...experience} />
    ))}
  </div>
);

export default ExperienceList;
