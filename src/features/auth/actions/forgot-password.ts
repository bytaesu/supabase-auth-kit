"use server";

import { ActionReturnWithData } from "@/shared/lib/types";
import { getErrorMessage } from "@/shared/lib/utils";
import { forgotPasswordFormSchema } from "../lib/validations";
import { PRESET_AUTH_ERRORS } from "../lib/auth.config";
import { supabaseServerClient } from "@/shared/lib/supabase/client/server";

/**
 * forgotPasswordAction - Handles the forgot password request functionality
 * - Validates the email input.
 * - Sends a password reset email if the validation succeeds.
 * - Returns an object indicating success or failure with an error message if applicable.
 */
export async function forgotPasswordAction(
  email: string,
): Promise<ActionReturnWithData<{ userEmail: string }>> {
  try {
    // Step 1: Validate the email format using the schema
    const validation = forgotPasswordFormSchema.safeParse({ email });
    if (!validation.success) {
      const errorMessage = PRESET_AUTH_ERRORS.ValidationError;
      return { data: null, error: errorMessage };
    }

    // Step 2: Attempt to send a password reset email using Supabase
    const supabase = supabaseServerClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      return { data: null, error: error.message };
    }

    /** Success
     * - If the password reset email is successfully sent, returns the user's email.
     * - For privacy reasons, if the account does not exist, a generic success message is still returned
     *   without indicating whether the account is registered.
     */
    return { data: { userEmail: email }, error: null };
  } catch (error) {
    // Return a error message if an unexpected error occurs
    return { data: null, error: getErrorMessage(error) };
  }
}
