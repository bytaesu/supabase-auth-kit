/**
 * Return type for server actions with error status only. Usage: `Promise<ActionReturn>`
 * - Success : { error: null }
 * - Failure : { error: string }
 */
export type ActionReturn = {
  error: string | null;
};

/**
 * Return type for server actions with data and error status. Usage: `Promise<ActionReturnWithData<T>>`
 * - Success : { data: T, error: null }
 * - Failure : { data: null, error: string }
 */
export type ActionReturnWithData<T = unknown> = {
  data: T | null;
  error: string | null;
};

/**
 * Type representing query parameters for search.
 * Each parameter can be a string, an array of strings, or undefined.
 */
export type SearchParams = { [key: string]: string | string[] | undefined };
