import React from 'react';
import { ENV } from '../../../../constants/env';
import { kvKeys } from '../../../../constants/kv';
import { redis } from '../../../../libs/upstash';
import { MousePointerClick } from 'lucide-react';

interface VisitorGeolocation {
  country: string;
  city?: string;
  flag: string;
}

const LastVisitorInfo = async () => {
  let lastVisitor: VisitorGeolocation | undefined = undefined;
  if (ENV.isProd) {
    const [lv, cv] = await redis.mget<[VisitorGeolocation | null, VisitorGeolocation | null]>(
      kvKeys.lastVisitor,
      kvKeys.currentVisitor,
    );
    lastVisitor = lv ?? cv ?? undefined;
  }

  if (!lastVisitor) {
    lastVisitor = {
      country: 'US',
      flag: '🇺🇸',
    };
  }

  return (
    <span className="flex items-center justify-center gap-1 text-xs text-zinc-500 dark:text-zinc-400 md:justify-start">
      <MousePointerClick size={16} className="h-4 w-4" />
      <span>
        最近访客来自&nbsp;
        <span className="font-medium">{lastVisitor.flag} </span>
        {[lastVisitor.city, lastVisitor.country].filter(Boolean).join(', ')}
      </span>
    </span>
  );
};

export default LastVisitorInfo;
