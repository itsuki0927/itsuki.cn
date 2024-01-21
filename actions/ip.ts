"use server";

import { get } from "@vercel/edge-config";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export const getIP = (request?: NextRequest) => {
  if (request && request.ip) {
    return request.ip;
  }
  const FALLBACK_IP_ADDRESS = "0.0.0.0";
  const forwardedFor = headers().get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0] ?? FALLBACK_IP_ADDRESS;
  }

  return headers().get("x-real-ip") ?? FALLBACK_IP_ADDRESS;
};

export const checkIPIsBlocked = async (request?: NextRequest) => {
  const blockedIPs = (await get<string[]>("blockedIPs")) || [];
  const ip = getIP(request);
  return blockedIPs.includes(ip);
};
