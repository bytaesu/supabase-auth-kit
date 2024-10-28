"use server";

import { createClient } from "@/lib/supabase/client/server";
import { ActionReturn } from "@/lib/types";
import { getErrorMessage } from "@/lib/utils";

/**
 * signOutAction - Handles user sign-out functionality.
 * - Initiates the sign-out process using Supabase authentication.
 * - Returns an object with an error field, null if successful or containing an error message if unsuccessful.
 */
export async function signOutAction(): Promise<ActionReturn> {
  try {
    // Step 1: Perform the sign-out operation
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    // Handle sign-out error if one occurs
    if (error) {
      return { error: error.message };
    }

    /** Success
     * - Optionally perform any additional tasks on successful sign-out.
     * - If local cache is being used, invalidate any cached user data here
     *   to ensure security and prevent stale data access.
     */
    return { error: null };
  } catch (error) {
    // Handle unexpected errors and return a general error message
    return { error: getErrorMessage(error) };
  }
}
