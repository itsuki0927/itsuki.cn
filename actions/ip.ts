'use server';

import { get } from '@vercel/edge-config';
import { NextRequest } from 'next/server';
import countries from '@/constants/countries.json';
import { VERCEL_ENV } from '@/constants/env';

export const getIP = (request?: NextRequest) => {
  if (request && request.ip) {
    return request.ip;
  }
  const FALLBACK_IP_ADDRESS = '0.0.0.0';
  const xff = request?.headers.get('x-forwarded-for');
  if (xff === '::1') {
    return '127.0.0.1';
  }
  if (VERCEL_ENV === 'development') {
    return '221.194.171.227'; // mock
  }
  return FALLBACK_IP_ADDRESS;
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
    const res = await fetch(`https://ip.useragentinfo.com/json?ip=${ip}`, {
      cache: 'no-store',
    });
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
