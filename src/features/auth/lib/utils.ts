import { PRESET_AUTH_ERRORS } from "@/shared/lib/supabase/auth/auth.config";

// Checks if the provided error message matches a preset error message.
export function isPresetAuthError(
  error_message: string | string[] | undefined,
): boolean {
  if (typeof error_message === "string") {
    return Object.values(PRESET_AUTH_ERRORS).includes(error_message);
  } else if (Array.isArray(error_message)) {
    return error_message.every((msg) =>
      Object.values(PRESET_AUTH_ERRORS).includes(msg),
    );
  } else {
    return false;
  }
}
