"use server";

import { createClient } from "@/lib/supabase/client/server";
import { signInFormSchema } from "@/lib/validations";
import { ActionReturn } from "@/lib/types";
import { getErrorMessage } from "@/lib/utils";
import { PRESET_AUTH_ERRORS } from "@/lib/supabase/auth.config";

/**
 * signInAction - Handles user sign-in functionality.
 * - Validates the email and password input.
 * - Attempts to sign the user in using Supabase authentication.
 * - Returns an object indicating success or failure with an error message if applicable.
 */
export async function signInAction(
  email: string,
  password: string,
): Promise<ActionReturn> {
  try {
    // Step 1: Validate the email and password using the schema
    const validation = signInFormSchema.safeParse({ email, password });
    if (!validation.success) {
      const errorMessage = PRESET_AUTH_ERRORS.ValidationError;
      return { error: errorMessage };
    }

    // Step 2: Attempt to sign the user in using Supabase authentication
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    // Return an error if sign-in fails
    if (error) {
      return { error: error.message };
    }

    /** Success
     * Optional: Additional tasks may be performed here
     * (e.g., mutate data, tracking analytics, etc.)
     */
    return { error: null };
  } catch (error) {
    // Return a error message if an unexpected error occurs
    return { error: getErrorMessage(error) };
  }
}
