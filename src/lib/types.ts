import { EmailOtpType } from "@supabase/supabase-js";

/** 
 * Type that returns only the error status without any data.
 * Success - { error: null }
 * Failure - { error: string }
 */
export type ActionReturn = {
  error: string | null;
};

/** 
 * Type that returns both data and error status.
 * Success - { data: T, error: null }
 * Failure - { data: null, error: string }
 */
export type ActionReturnWithData<T = unknown> = {
  data: T | null;
  error: string | null;
};

/** 
 * Extracts specific types from EmailOtpType that are actively used.
 * Only includes "signup" and "recovery".
 */
export type PresetEmailOtpType = Extract<EmailOtpType, "signup" | "recovery">;

/** 
 * Type representing query parameters for search.
 * Each parameter can be a string, an array of strings, or undefined.
 */
export type SearchParams = { [key: string]: string | string[] | undefined; };
