"use server";

import { PRESET_ERRORS } from "@/lib/supabase/auth-config";
import { createClient } from "@/lib/supabase/client/server";
import { ActionReturn } from "@/lib/types";
import { getErrorMessage } from "@/lib/utils";

/**
 * resetPasswordAction - Handles password reset functionality.
 * - Updates the user's password.
 * - Signs out all other sessions to enforce the new password.
 * - Returns an object indicating success or failure with an error message if applicable.
 */
export async function resetPasswordAction(
  newPassword: string,
): Promise<ActionReturn> {
  try {
    // Step 1: Update the user's password
    const supabase = createClient();
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    // Return an error if password update fails
    if (error) {
      return { error: error.message };
    }

    // Return an error if the user data is not found in the response
    if (!data.user) {
      const errorMessage = PRESET_ERRORS.UserNotFound;
      return { error: errorMessage };
    }

    /** Success
     *  After successfully updating the password:
     *  - Sign out all other sessions to ensure they no longer have access.
     *  - Clear any local cache related to user data, if applicable, to prevent outdated information.
     */
    await supabase.auth.signOut({ scope: "others" });
    return { error: null };
  } catch (error) {
    // Return a error message if an unexpected error occurs
    return { error: getErrorMessage(error) };
  }
}
