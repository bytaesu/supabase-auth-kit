import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { PRESET_AUTH_ERRORS } from "./supabase/auth.config";

// Merges class names, combining Tailwind CSS classes with conditional classes.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility function to handle errors in a try-catch block and 
// return an appropriate error message.
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (error != null && typeof error === "object" && "message" in error) {
    return String((error as { message?: unknown }).message);
  }

  if (typeof error === "string") {
    return error;
  }

  return "An unexpected error occurred. Please try again.";
}

// Delays execution for a specified amount of time asynchronously.
export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Checks if the provided error message matches a preset error message.
export function isPresetAuthError(error_message: string | string[] | undefined): boolean {
  if (typeof error_message === "string") {
    return Object.values(PRESET_AUTH_ERRORS).includes(error_message);
  } else if (Array.isArray(error_message)) {
    return error_message.every((msg) => Object.values(PRESET_AUTH_ERRORS).includes(msg));
  } else {
    return false;
  }
}

