namespace NodeJS {
  interface ProcessEnv {
    // vercel
    VERCEL_ENV: string;
    VERCEL_URL: string;

    // notion
    NOTION_AUTH_TOKEN: string;
    NOTION_PAGE_ID: string;

    // supabase
    NEXT_PUBLIC_SUPABASE_URL: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
    SUPABASE_SERVICE_ROLE_KEY: string;

    // next auth
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
    GITHUB_CLIENT_KEY: string;
    GITHUB_CLIENT_SECRET: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;

    // admin email
    NEXT_PUBLIC_ADMIN_EMAIL1: string;
    ADMIN_EMAIL2: string;

    // upstash
    UPSTASH_REDIS_URL: string;
    UPSTASH_REDIS_TOKEN: string;
  }
}
