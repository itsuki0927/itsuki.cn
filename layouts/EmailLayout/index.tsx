import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from './components';
import { BASE_URL } from '@/constants/app';
import { Github } from 'lucide-react';
import Juejin from '@/components/icon/Juejin';
import Sifou from '@/components/icon/Sifou';
import { META } from '@/constants/seo';

interface EmailLayoutProps {
  previewText: string;
  children: React.ReactNode;
}

const EmailLayout = ({ previewText, children }: EmailLayoutProps) => {
  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto font-sans">
          <Container className="mx-auto my-10 max-w-lg rounded-lg border border-solid border-zinc-100 bg-white px-6 py-4">
            {children}

            <Hr className="border border-dashed border-zinc-100 my-6 mx-0 w-full" />

            <Section className="mb-6">
              <Img
                src={`${BASE_URL}/logo.png`}
                width="24"
                height="24"
                alt="Cali"
                className="mx-auto my-0"
              />
              <Text className="text-center">
                <Link
                  href="https://itsuki.cn"
                  className="text-zinc-700 underline"
                >
                  <strong>五块木头</strong>
                </Link>
                <br />
                {META.description}
              </Text>
              <Text className="text-center flex space-x-4 justify-center text-zinc-700">
                <Link href="https://github.com/itsuki0927">
                  <Github size={20} />
                </Link>
                <Link href="https://juejin.cn/user/2436173499466350">
                  <Juejin size={20} />
                </Link>
                <Link href="https://segmentfault.com/u/itsuki0927">
                  <Sifou size={20} />
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default EmailLayout;
