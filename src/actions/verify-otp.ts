"use server";

import { PRESET_ERRORS } from "@/lib/constants";
import { createClient } from "@/lib/supabase/client/server";
import { ActionReturn, PresetEmailOtpType } from "@/lib/types";
import { getErrorMessage } from "@/lib/utils";

/**
 * verifyOtpAction - Manages the OTP verification process for email-based actions.
 * - Verifies the provided OTP token associated with an email and action type.
 * - Returns an object with success status or an error message if verification fails.
 */
export async function verifyOtpAction(
  email: string,
  token: string,
  type: PresetEmailOtpType,
): Promise<ActionReturn> {
  try {
    // Step 1: Initialize Supabase client and attempt OTP verification
    const supabase = createClient();

    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: type,
    });

    // Handle any error from Supabase OTP verification
    if (error) {
      return { error: error.message };
    }

    // Handle case where the verified user is unexpectedly not returned
    if (!data.user) {
      const errorMessage = PRESET_ERRORS.UserNotFound;
      return { error: errorMessage };
    }

    /** Success
     * OTP verification succeeded. Optional additional tasks can be performed here.
     *
     * Example: If the type is "signup", this is a suggested place for additional signup-related actions,
     * such as logging new user registration or analytics tracking.
     *
     * if (type === "signup") {
     *    // Additional actions for new signups
     * }
     */
    return { error: null };
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
}
