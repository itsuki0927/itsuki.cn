'use server';

import { get } from '@vercel/edge-config';
import { headers } from 'next/headers';
import { NextRequest } from 'next/server';
import countries from '@/constants/countries.json';
import { unstable_noStore } from 'next/cache';

export const getIP = (request?: NextRequest) => {
  if (request && request.ip) {
    return request.ip;
  }
  const FALLBACK_IP_ADDRESS = '0.0.0.0';
  const forwardedFor = headers().get('x-forwarded-for');

  if (forwardedFor) {
    return forwardedFor.split(',')[0] ?? FALLBACK_IP_ADDRESS;
  }

  return headers().get('x-real-ip') ?? FALLBACK_IP_ADDRESS;
};

export const checkIPIsBlocked = async (request?: NextRequest) => {
  const blockedIPs = (await get<string[]>('blockedIPs')) || [];
  const ip = getIP(request);
  return blockedIPs.includes(ip);
};

interface GetGeoByIP {
  country: string;
  short_name: string;
  province: string;
  city: string;
  isp: string;
  ip: string;
  code: number;
  desc: string;
}

export type Geo = Omit<GetGeoByIP, 'short_name' | 'code' | 'desc'> & {
  shortName: string;
  flag: string;
};

export const getGeoByIP = async (ip: string): Promise<Geo | null> => {
  try {
    unstable_noStore();
    const res = await fetch(`https://ip.useragentinfo.com/json?ip=${ip}`);
    const data = (await res.json()) as GetGeoByIP;
    const { code, desc, short_name, ...rest } = data;

    const shortName = short_name;
    const countryInfo = countries.find(
      (x) => x.cca2 === shortName.toUpperCase(),
    );
    const flag = countryInfo?.flag || '';

    return {
      ...rest,
      flag,
      shortName: short_name,
    };
  } catch (err) {
    console.error('getGeoByIP error', err);
  }
  return null;
};
