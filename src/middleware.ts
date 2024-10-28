import { NextResponse, type NextRequest } from "next/server";
import { authMiddleware } from "./lib/supabase/middleware/auth-middleware";
import { AUTH_ROUTES, PRIVATE_ONLY_ROUTES, PUBLIC_ONLY_ROUTES } from "./lib/constants";

export async function middleware(request: NextRequest) {
  const {
    supabaseResponse,
    user,
    // error
  } = await authMiddleware(request);

  /**
   * Error Handling
   * Additional error handling logic can be added here, if needed.
   */
  // if (error) {}


  // Redirect unauthenticated users from private-only routes to the sign-in page.
  const isPrivateOnlyRoute = PRIVATE_ONLY_ROUTES.some((path) => request.nextUrl.pathname.startsWith(path));
  if (!user && isPrivateOnlyRoute) {
    return NextResponse.redirect(new URL(AUTH_ROUTES.Public.SignIn, request.url));
  }

  // Redirect authenticated users from public-only routes to the private home.
  const isPublicOnlyRoute = PUBLIC_ONLY_ROUTES.some((path) => request.nextUrl.pathname.startsWith(path));
  if (user && isPublicOnlyRoute) {
    return NextResponse.redirect(new URL(AUTH_ROUTES.Private.PrivateHome, request.url));
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
