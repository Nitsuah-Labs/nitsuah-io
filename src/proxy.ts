import { NextResponse } from "next/server";

export function proxy() {
  const response = NextResponse.next();

  // Add security headers (backup to Netlify headers)
  const isDevelopment = process.env.NODE_ENV === "development";

  if (!isDevelopment) {
    // Only apply strict CSP in production (Netlify headers will also apply)
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
