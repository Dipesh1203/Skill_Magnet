import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
export { default } from "next-auth/middleware";

// Middleware to handle authentication and route redirection
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  // Redirect authenticated users away from login/signup pages
  if (token && pathname === "/signin") {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  // Redirect unauthenticated users away from protected routes like dashboard
  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!token && pathname.startsWith("/profile")) {
    return NextResponse.redirect(new URL("/sign-up", request.url));
  }

  // If none of the conditions match, continue as normal
  return NextResponse.next();
}

// Configuring middleware to apply only to specific routes
export const config = {
  matcher: ["/dashboard", "/signin", "/profile", "/sign-up"], // List out the exact routes to protect
};
