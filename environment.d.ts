namespace NodeJS {
  interface ProcessEnv {
    // vercel
    NEXT_PUBLIC_VERCEL_ENV: 'production' | 'development' | 'preview';
    NEXT_PUBLIC_VERCEL_URL: string;

    // notion
    NOTION_AUTH_TOKEN: string;
    NOTION_PAGE_ID: string;

    // supabase
    NEXT_PUBLIC_SUPABASE_URL: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
    SUPABASE_SERVICE_ROLE_KEY: string;

    // admin email
    NEXT_PUBLIC_ADMIN_EMAIL1: string;
    ADMIN_EMAIL2: string;

    // upstash
    UPSTASH_REDIS_URL: string;
    UPSTASH_REDIS_TOKEN: string;

    // resend
    RESEND_API_KEY: string;
  }
}
