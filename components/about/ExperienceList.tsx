const experienceList: ExperienceCardProps[] = [
  {
    post: '前端实习生',
    company: '网易',
    startTime: '03/22',
    endTime: '至今',
    description: '正在构建永劫无间相关的双端项目...',
    techStack: 'Vue2.0, Jquery, JavaScript, Css',
  },
  {
    post: '前端实习生',
    company: '长沙腾讯',
    startTime: '07/21',
    endTime: '09/21',
    description: '完成了一个简单的crud的后台管理系统.',
    techStack: 'Vue2.0, Vue Element Admin',
  },
  {
    post: '前端工程师',
    company: '湖南中一网络',
    startTime: '06/20',
    endTime: '08/20',
    description: '实现了一个Ant Design3的ProTable.',
    techStack: 'React, Ant Design3, Admin',
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
  <div className='mb-4 border-b border-dashed border-gray-1 p-4 pb-2 pl-0 before:contents dark:border-gray-1--dark'>
    <h3 className='m-0 text-base font-normal'>{post}</h3>
    <div className='flex justify-between text-sm text-gray-3 dark:text-gray-3--dark'>
      <div>{company}</div>
      <div>
        <time dateTime={startTime}>{startTime}</time> -{' '}
        <time dateTime={endTime}>
          <span>{endTime}</span>
        </time>
      </div>
    </div>
    <p className='mt-4 text-sm'>{description}</p>
    <p className='text-sm'>技术栈: {techStack}</p>
  </div>
);

const ExperienceList = () => (
  <>
    {experienceList.map(experience => (
      <ExperienceCard {...experience} />
    ))}
  </>
);

export default ExperienceList;
