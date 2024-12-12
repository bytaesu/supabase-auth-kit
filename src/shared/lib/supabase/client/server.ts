import { createServerClient } from "@supabase/ssr";
import { SupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

/** Supabase client for "Server components" */
export function createClient(): SupabaseClient {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
    {
      cookies: {
        /**
         * Retrieves all cookies from the current request.
         * Used to read session data.
         */
        getAll() {
          return cookieStore.getAll();
        },
        /**
         * Sets multiple cookies to maintain session state.
         * Each cookie is added to the Next.js cookie store.
         */
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {}
        },
      },
    },
  );
}
