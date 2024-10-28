import { EmailOtpType, Provider } from "@supabase/supabase-js";

// IMPORTANT: Do not change keys.
// Customize the path names based on project structure.
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

// IMPORTANT: Do not change directly.
export const ONLY_PRIVATE_ROUTES = Object.values(AUTH_ROUTES.Private);
// IMPORTANT: Do not change directly.
export const ONLY_PUBLIC_ROUTES = Object.values(AUTH_ROUTES.Public);

// Extract only the required types from EmailOtpType as used by this AuthKit.
export type PresetEmailOtpType = Extract<EmailOtpType, "signup" | "recovery">;

// Defines OTP configuration based on PresetEmailOtpType.
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

// Define password requirements to match Supabase settings.
export const PASSWORD_REQUIREMENTS = [
  { regex: /.{8,}/, message: "Password needs to be at least 8 characters." },
  { regex: /[a-zA-Z]/, message: "Password needs to contain letters." },
  { regex: /[0-9]/, message: "Password needs to contain digits." },
];

// IMPORTANT: Do not change keys.
// Customize error messages, but keep the error keys unchanged.
export const PRESET_ERRORS = {
  ValidationError: "Invalid data format.",
  InvalidRequest: "Invalid request. Please try again.",
  UserNotFound: "User not found. Please try again.",
  UserEmailNotFound: "User email not found.",
  SignOutError: "Authentication error. Please try again.",
  MissingCallbackUrl: "Something went wrong. Please refresh the page and try again.",
  OAuthError: "Unable to securely get profile from provider. Please try again.",
};

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
