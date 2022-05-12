import { NextSeo } from 'next-seo';
import { PropsWithChildren } from 'react';
import { MyImage } from '../common';
import Description from './Description';
import ExperienceList from './ExperienceList';
import HoobyList from './HoobyList';

const Section = ({
  children,
  className = '',
}: PropsWithChildren<{ className?: string }>) => (
  <section className={`px-4 ${className}`}>{children}</section>
);

const Title = ({ children }: PropsWithChildren<unknown>) => (
  <h3 className='mt-10 mb-4 text-center text-xl font-medium tracking-wider'>
    {children}
  </h3>
);

const AboutView = () => (
  <div className='mx-auto w-3/4 tracking-wider'>
    <div className='p-6'>
      <NextSeo title='关于' />

      <header className='mt-2 mb-7 text-center'>
        <h1 className='my-12 text-3xl text-dark-2 '>
          Hi<span className='origin-[70% 70%] mx-1 inline-block animate-wave'>👋</span>,
          我是
          <strong>五木</strong>, 英文名: itsuki, 喜欢 👨‍💻 和 🏃 的前端 🐶
        </h1>
      </header>

      <Section className='text-center'>
        <MyImage
          src='/about.png'
          width={670}
          height={407}
          alt='about-decorate-placeholder'
        />
        <p className='mt-1 text-xs text-gray-3 '>(一张装饰图)</p>
      </Section>

      <Section>
        <Title>一段简介</Title>
        <Description />
      </Section>

      <Section>
        <Title>几个爱好</Title>
        <HoobyList />
      </Section>

      <Section>
        <Title>一些经历</Title>
        <ExperienceList />
      </Section>

      <Section className='mt-6 p-4 tracking-widest'>
        <strong className='text-gray-2 '>一个应用要写好太难了, 即使是博客!!!</strong>
      </Section>
    </div>
  </div>
);

export default AboutView;
