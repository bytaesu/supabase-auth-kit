import { EmailOtpType, Provider } from "@supabase/supabase-js";

/**
 * AUTH CONFIGURATION FILE
 * =======================
 * Adjust the following to fit your project structure and Supabase settings:
 * 
 * 1. AUTH_ROUTES: only pathnames.
 * 2. PRESET_EMAIL_OTP_CONFIG: only messages.
 * 3. PASSWORD_REQUIREMENTS: match Supabase settings.
 * 4. PRESET_AUTH_ERRORS: only messages.
 */

/** 1. AUTH_ROUTES
 * 
 * IMPORTANT: 
 * - "default Keys": Do not change.
 * - "default Pathnames": Can be customized to fit your project structure.
 * 
 * Public and Private in auth-routes are directly handled by auth-middleware.
 * Additional routes can be added for auth-middleware protection as needed.
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

/** 2. PRESET_EMAIL_OTP_CONFIG
 * 
 * Configuration for OTP actions based on PresetEmailOtpType.
 * Defines redirection paths and messages for each OTP type.
 */
export const PRESET_EMAIL_OTP_CONFIG: Record<
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

/** 3. PASSWORD_REQUIREMENTS
 * 
 * Define password requirements to match Supabase settings.
 */
export const PASSWORD_REQUIREMENTS = [
  { regex: /.{8,}/, message: "Password needs to be at least 8 characters." },
  { regex: /[a-zA-Z]/, message: "Password needs to contain letters." },
  { regex: /[0-9]/, message: "Password needs to contain digits." },
];

/** 4. PRESET_AUTH_ERRORS
 * 
 * IMPORTANT:
 * - "default Keys": Do not change.
 * - "default Messages": Can be customized.
 */
export const PRESET_AUTH_ERRORS = {
  ValidationError: "Invalid data format.",
  InvalidRequest: "Invalid request. Please try again.",
  UserNotFound: "User not found. Please try again.",
  UserEmailNotFound: "User email not found.",
  SignOutError: "Authentication error. Please try again.",
  MissingCallbackUrl: "Something went wrong. Please refresh the page and try again.",
  OAuthError: "Unable to securely get profile from provider. Please try again.",
};


// IMPORTANT: Do not change these directly.
export const ONLY_PRIVATE_ROUTES = Object.values(AUTH_ROUTES.Private);
export const ONLY_PUBLIC_ROUTES = Object.values(AUTH_ROUTES.Public);

// Extract only the required types from EmailOtpType as used by this AuthKit.
export type PresetEmailOtpType = Extract<EmailOtpType, "signup" | "recovery">;

// Maps provider keys to user-friendly names for OAuth providers.
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
