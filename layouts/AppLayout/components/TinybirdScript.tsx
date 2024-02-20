'use client';

import { VERCEL_ENV } from '@/constants/env';
import Script from 'next/script';

const TinybirdScript = () => {
  if (VERCEL_ENV === 'production') {
    return (
      <Script
        strategy="lazyOnload"
        src="https://unpkg.com/@tinybirdco/flock.js"
        data-host="https://api.tinybird.co"
        data-token="p.eyJ1IjogIjZhNTRjM2NmLTlhMDYtNGE0Mi04ODQzLWIyYmMxOGVkZmVlOSIsICJpZCI6ICIzOWUwOTg3OS03NGI3LTRjNjYtOWYxZi0yOGY1ZmE2N2U1ODkiLCAiaG9zdCI6ICJldV9zaGFyZWQifQ._M_tCmySZ4raos65WLsYjJm3C879zHqagasGQQhjgVc"
        onLoad={() => {
          console.log('Tinybird script loaded');
        }}
        onError={(e: Error) => {
          console.error('Tinybird script failed to load', e);
        }}
      />
    );
  }
  return null;
};

export default TinybirdScript;
