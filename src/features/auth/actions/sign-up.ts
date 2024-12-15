"use server";

import { ActionReturnWithData } from "@/shared/lib/types";
import { getErrorMessage } from "@/shared/lib/utils";
import { signUpFormSchema } from "../lib/validations";
import { PRESET_AUTH_ERRORS } from "../lib/auth.config";
import { supabaseServerClient } from "@/shared/lib/supabase/client/server";

/**
 * signUpAction - Manages user registration.
 * - Validates email and password input.
 * - Executes sign-up via Supabase authentication.
 * - Optionally performs additional tasks on success (e.g., data mutation, analytics tracking).
 * - Returns an object containing the user email on success or an error message on failure.
 */
export async function signUpAction(
  email: string,
  password: string,
): Promise<ActionReturnWithData<{ userEmail: string }>> {
  try {
    // Step 1: Validate the email and password format using Zod schema
    const validation = signUpFormSchema.safeParse({ email, password });
    if (!validation.success) {
      const errorMessage = PRESET_AUTH_ERRORS.ValidationError;
      return { data: null, error: errorMessage };
    }

    // Step 2: Initialize Supabase client and attempt sign-up
    const supabase = supabaseServerClient();
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    // Handle errors from Supabase sign-up
    if (error) {
      return { data: null, error: error.message };
    }

    // Handle case where user email is unexpectedly missing in the response
    if (!data.user?.email) {
      const errorMessage = PRESET_AUTH_ERRORS.UserEmailNotFound;
      return { data: null, error: errorMessage };
    }

    /** Success
     * - On successful sign-up, the user’s email is returned.
     * - Initiates transition to the VerificationStage for email confirmation.
     * - For existing accounts, to protect user privacy, a success response is returned
     *   without revealing that the account already exists.
     */
    return { data: { userEmail: data.user.email }, error: null };
  } catch (error) {
    // Return a generic error message if an unexpected error occurs
    return { data: null, error: getErrorMessage(error) };
  }
}
