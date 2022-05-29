import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import {
  NEXTAUTH_GITHUB_CLIENT_ID,
  NEXTAUTH_GITHUB_CLIENT_SECRET,
  NEXTAUTH_SECRET,
} from '@/configs/app';

export default NextAuth({
  secret: NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: NEXTAUTH_GITHUB_CLIENT_ID,
      clientSecret: NEXTAUTH_GITHUB_CLIENT_SECRET,
      httpOptions: {
        timeout: 40000,
      },
    }),
  ],
});
