"use server";

import { PRESET_ERRORS } from "@/lib/constants";
import { createClient } from "@/lib/supabase/client/server";
import { ActionReturn } from "@/lib/types";
import { getErrorMessage } from "@/lib/utils";


export async function resetPasswordAction(
  newPassword: string,
): Promise<ActionReturn> {
  try {
    // Reset-password process
    const supabase = createClient();
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      return { error: error.message };
    }

    if (!data.user) {
      const errorMessage = PRESET_ERRORS.UserNotFound;
      return { error: errorMessage };
    }

    // Success.
    // logout all other sessions after changing password
    await supabase.auth.signOut({ scope: "others" });
    return { error: null };
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
}
