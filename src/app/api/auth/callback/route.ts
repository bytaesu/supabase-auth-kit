import {
  AUTH_ROUTES,
  PRESET_AUTH_ERRORS,
} from "@/shared/lib/supabase/auth/auth.config";
import { supabaseServerClient } from "@/shared/lib/supabase/client/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const redirectTo = AUTH_ROUTES.Private.PrivateHome;
  const redirectToError = AUTH_ROUTES.Public.SignIn;

  // Create Supabase Client
  const supabase = supabaseServerClient();

  // Exchange code for session
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      /** Success
       * Optional: additional tasks can be performed here
       * (e.g., updating data, tracking analytics)
       */
      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocalEnv = process.env.NODE_ENV === "development";

      // Define the redirect URL based on environment and load balancer setup
      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${redirectTo}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${redirectTo}`);
      } else {
        return NextResponse.redirect(`${origin}${redirectTo}`);
      }
    }
  }

  /** Failure
   * sign out and redirect to the sign-in page with an error message
   */
  const { error: SignOutError } = await supabase.auth.signOut();
  const errorMessage = SignOutError
    ? PRESET_AUTH_ERRORS.SignOutError
    : PRESET_AUTH_ERRORS.OAuthError;

  return NextResponse.redirect(
    `${origin}${redirectToError}?error_message=${encodeURIComponent(errorMessage)}`,
  );
}
