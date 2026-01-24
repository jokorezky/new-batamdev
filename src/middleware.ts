import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const protectedPaths = [
    "/dashboard",
    "/register/success",
    "/academies",
    "/profile",
    "/settings",
    "/events/create",
    "/community/create",
    "/companies/create",
    "/settings/job-listings",
  ];

  const isProtectedRoute = protectedPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/register/success/:path*",
    "/academies/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/events/create",
    "/community/create",
    "/companies/create",
    "/settings/job-listings/:path*",
    "/settings/job-listings",
  ],
};
