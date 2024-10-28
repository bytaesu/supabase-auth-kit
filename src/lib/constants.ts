import { Provider } from "@supabase/supabase-js";
import { PresetEmailOtpType } from "./types";

/**
 * AUTH_ROUTES: Authentication-related paths.
 * You can modify these paths if route structures change.
 */
export const AUTH_ROUTES = {
  Public: {
    SignIn: "/signin",
    SignUp: "/signup",
    ForgotPassword: "/forgot-password",
  },
  Private: {
    PrivateHome: "/dashboard",
    ResetPassword: "/reset-password",
  },
  API: {
    OAuthCallback: "/api/auth/callback"
  }
}

/**
 * Routes categorized by authentication requirement.
 * - ONLY_PRIVATE_ROUTES: Paths requiring user authentication (from AUTH_ROUTES.Private).
 * - ONLY_PUBLIC_ROUTES: Publicly accessible paths without authentication (from AUTH_ROUTES.Public).
 * - Do not modify directly; uses AUTH_ROUTES for route definitions.
 */
export const PRIVATE_ONLY_ROUTES = Object.values(AUTH_ROUTES.Private);
export const PUBLIC_ONLY_ROUTES = Object.values(AUTH_ROUTES.Public);

/**
 * PASSWORD_REQUIREMENTS: Array containing password validation rules.
 * This array is used for validation in both the password schema and the password condition display bar.
 * - regex: Regular expression to define password criteria.
 * - message: Error message displayed when a criterion is not met.
 */
export const PASSWORD_REQUIREMENTS = [
  { regex: /.{8,}/, message: "Password needs to be at least 8 characters." },
  { regex: /[a-zA-Z]/, message: "Password needs to contain letters." },
  { regex: /[0-9]/, message: "Password needs to contain digits." },
];

/**
 * PRESET_EMAIL_OTP: Configuration for email OTP based on the action type.
 * - redirectTo: Path to navigate after successful OTP validation (do not change).
 * - message: Custom message shown for OTP instructions (modifiable).
 */
export const PRESET_EMAIL_OTP: Record<
  PresetEmailOtpType,
  { redirectTo: string; message: string }
> = {
  signup: {
    redirectTo: AUTH_ROUTES.Private.PrivateHome,
    message: "If you don't have an account yet, we have sent a code to",
  },
  recovery: {
    redirectTo: AUTH_ROUTES.Private.ResetPassword,
    message: "If you have an account, we have sent a code to",
  },
};

/**
 * PRESET_ERRORS: Error messages for common authentication issues.
 * - You can customize these messages, but keep the error keys unchanged.
 */
export const PRESET_ERRORS = {
  ValidationError: "Invalid data format.",
  InvalidRequest: "Invalid request. Please try again.",
  UserNotFound: "User not found. Please try again.",
  UserEmailNotFound: "User email not found.",
  SignOutError: "Authentication error. Please try again.",
  MissingCallbackUrl:
    "Something went wrong. Please refresh the page and try again.",
    OAuthError:
    "Unable to securely get profile from provider. Please try again.",
};

/**
 * PROVIDER_DISPLAY_NAMES: Display names for third-party OAuth providers.
 * - Maps each provider key to a user-friendly name.
 */
export const PROVIDER_DISPLAY_NAMES: Record<Provider, string> = {
  github: "GitHub",
  gitlab: "GitLab",
  linkedin: "LinkedIn",
  linkedin_oidc: "LinkedIn",
  slack_oidc: "Slack",
  google: "Google",
  facebook: "Facebook",
  apple: "Apple",
  azure: "Azure",
  bitbucket: "Bitbucket",
  discord: "Discord",
  figma: "Figma",
  kakao: "Kakao",
  keycloak: "Keycloak",
  notion: "Notion",
  slack: "Slack",
  spotify: "Spotify",
  twitch: "Twitch",
  twitter: "Twitter",
  workos: "WorkOS",
  zoom: "Zoom",
  fly: "Fly",
};
