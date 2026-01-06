import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  // যদি টোকেন না থাকে এবং প্রোফাইলে যাওয়ার চেষ্টা করে
  if (!token && pathname.startsWith("/profile")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // যদি টোকেন থাকে এবং লগইন/রেজিস্ট্রেশন পেজে যাওয়ার চেষ্টা করে
  if (token && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/profile", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/login", "/register"],
};