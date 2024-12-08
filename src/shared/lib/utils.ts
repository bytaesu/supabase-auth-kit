import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// A tiny utility for constructing className strings conditionally.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
