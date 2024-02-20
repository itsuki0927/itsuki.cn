"use server";

import { kvKeys } from "@/constants/kv";
import { ratelimit, redis } from "@/libs/upstash";
import { headers } from "next/headers";

export const getBlogViews = async (slug: string) => {
  let views: number;
  if (process.env.NODE_ENV === "production") {
    views = await redis.incr(kvKeys.blogViews(slug));
  } else {
    views = 30578;
  }
  return views;
};

export const getIP = () => {
  const FALLBACK_IP_ADDRESS = "0.0.0.0";
  const forwardedFor = headers().get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0] ?? FALLBACK_IP_ADDRESS;
  }

  return headers().get("x-real-ip") ?? FALLBACK_IP_ADDRESS;
};

export const updateReactions = async (id: string, index: number) => {
  if (!id || !(index >= 0 && index < 4)) {
    throw new Error("Missing id or index");
  }

  const key = kvKeys.blogReactions(id);
  const ip = getIP();

  const { success } = await ratelimit.limit(key + `_${ip ?? ""}`);
  if (!success) {
    throw new Error("Too Many Requests");
  }

  let current = await redis.get<number[]>(key);
  if (!current) {
    current = [0, 0, 0, 0];
  }

  current[index] += 1;

  await redis.set(key, current);

  return current;
};

export const getReactions = async (id: string) => {
  let reactions: number[] = [];
  try {
    const ip = getIP();
    if (process.env.NODE_ENV === "production") {
      if (!id) {
        throw new Error("Missing id");
      }
      const redisKey = kvKeys.blogReactions(id);

      const value = await redis.get<number[]>(redisKey);
      if (!value) {
        await redis.set(redisKey, [0, 0, 0, 0]);
      }

      const { success } = await ratelimit.limit(redisKey + `_${ip ?? ""}`);
      if (!success) {
        throw new Error("Too Many Requests");
      }

      if (Array.isArray(value)) {
        reactions = value;
      } else {
        reactions = [0, 0, 0, 0];
      }
    } else {
      reactions = Array.from({ length: 4 }, () =>
        Math.floor(Math.random() * 50000),
      );
    }
  } catch (error) {
    console.error(error);
  }

  return reactions;
};
