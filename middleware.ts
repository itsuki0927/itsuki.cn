import { type NextRequest, NextResponse } from "next/server";
import countries from "@/constants/countries.json";
import { kvKeys } from "./constants/kv";
import { redis } from "./libs/upstash";
import { checkIPIsBlocked } from "./actions/ip";

const publicRoutes = [
  "/",
  "/api(.*)",
  "/blog(.*)",
  "/confirm(.*)",
  "/projects",
  "/guestbook",
  "/newsletters(.*)",
  "/about",
  "/rss",
  "/feed",
  "/ama",
];

export const config = {
  matcher: ["/((?!_next|studio|.*\\..*).*)"],
};

const middleware = async (req: NextRequest) => {
  const { geo, nextUrl } = req;

  const isApi = nextUrl.pathname.startsWith("/api/");
  const isBlocked = await checkIPIsBlocked(req);

  if (isBlocked) {
    if (isApi) {
      return NextResponse.json(
        { error: "You have been blocked." },
        { status: 403 },
      );
    }

    nextUrl.pathname = "/blocked";
    return NextResponse.rewrite(nextUrl);
  }

  if (
    nextUrl.pathname === "/blocked" &&
    process.env.VERCEL_ENV === "production"
  ) {
    nextUrl.pathname = "/";
    return NextResponse.redirect(nextUrl);
  }

  if (geo && !isApi && process.env.VERCEL_ENV === "production") {
    const country = geo.country;
    const city = geo.city;

    const countryInfo = countries.find((x) => x.cca2 === country);
    if (countryInfo) {
      const flag = countryInfo.flag;
      await redis.set(kvKeys.currentVisitor, { country, city, flag });
    }
  }

  return NextResponse.next();
};

export default middleware;
