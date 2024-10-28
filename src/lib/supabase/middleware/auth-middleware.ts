import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Middleware function to handle user authentication.
 * Retrieves the current user's session from Supabase and sets cookies for responses.
 */
export async function authMiddleware(request: NextRequest) {
  // Initialize the response object to proceed to the next middleware or handler
  const supabaseResponse = NextResponse.next();

  // Create a Supabase client with server-side configurations
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
    {
      // Custom cookies handling for Next.js
      cookies: {
        // Retrieves all cookies from the incoming request
        getAll: () => request.cookies.getAll(),

        // Sets all cookies on the outgoing response
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  /**
   * IMPORTANT: Avoid writing any logic between createServerClient and
   * supabase.auth.getUser(). A simple mistake could make it very hard to debug
   * issues with users being randomly logged out.
   */
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  /**
   * IMPORTANT: You *must* return the supabaseResponse object as it is.
   * Return the supabaseResponse, user data, and any error for further processing
   */
  return { supabaseResponse, user, error };
}
