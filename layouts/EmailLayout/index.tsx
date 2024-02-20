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
import { BASE_URL, SOCIAL } from '@/constants/app';
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
              <Text className="text-center flex space-x-4 justify-center">
                <Link
                  href={SOCIAL.github}
                  className="text-xs text-zinc-600 underline"
                >
                  Github
                </Link>
                <Link
                  href={SOCIAL.juejin}
                  className="text-xs text-zinc-600 underline"
                >
                  掘金
                </Link>
                <Link
                  href={SOCIAL.sifou}
                  className="text-xs text-zinc-600 underline"
                >
                  思否
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
