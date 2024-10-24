import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authConfig } from "./auth.config";
import { getToken } from "next-auth/jwt";

// Define routes that require customer or employee roles
const customerRoutes = ["/dashboard/myprofile"];
const employeeRoutes = ["/dashboard/customers"];

export async function middleware(request: NextRequest) {
  // Retrieve JWT token from cookies (NextAuth uses JWT by default)
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET!,
  });

  const { pathname } = request.nextUrl;

  // console.log(pathname, token);

  // If no token exists, treat it as a 404
  if (!token) {
    return NextResponse.rewrite(new URL("/login", request.url));
  }

  // Check if the route is customer-specific and user doesn't have `isCustomer`
  if (customerRoutes.includes(pathname) && !token.isCustomer) {
    return NextResponse.rewrite(new URL("/404", request.url));
  }

  // Check if the route is employee-specific and user doesn't have `isEmployee`
  if (employeeRoutes.includes(pathname) && !token.isEmployee) {
    return NextResponse.rewrite(new URL("/404", request.url));
  }

  // If the user has access, continue to the route
  return NextResponse.next();
}

// NextAuth configuration for middleware
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
