import {
  AUTH_ROUTES,
  ONLY_PRIVATE_ROUTES,
  ONLY_PUBLIC_ROUTES,
} from "./shared/lib/supabase/auth/auth.config";
import { updateSupabaseSession } from "./shared/lib/supabase/auth/session";
import { NextResponse, type NextRequest } from "next/server";


export async function middleware(request: NextRequest) {
  const {
    supabaseResponse,
    user,
    // error
  } = await updateSupabaseSession(request);

  /**
   * Error Handling
   * Additional error handling logic can be added here, if needed.
   */
  // if (error) {}

  // Redirect unauthenticated users from private-only routes to the sign-in page.
  const isOnlyPrivateRoute = ONLY_PRIVATE_ROUTES.some((path) =>
    request.nextUrl.pathname.startsWith(path),
  );
  if (!user && isOnlyPrivateRoute) {
    return NextResponse.redirect(
      new URL(AUTH_ROUTES.Public.SignIn, request.url),
    );
  }

  // Redirect authenticated users from public-only routes to the private home.
  const isOnlyPublicRoute = ONLY_PUBLIC_ROUTES.some((path) =>
    request.nextUrl.pathname.startsWith(path),
  );
  if (user && isOnlyPublicRoute) {
    return NextResponse.redirect(
      new URL(AUTH_ROUTES.Private.PrivateHome, request.url),
    );
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
