import { PASSWORD_REQUIREMENTS } from "@/shared/lib/supabase/auth/auth.config";
import { z } from "zod";

// Email validation schema
export const emailSchema = z
  .string()
  .min(1, { message: "Please enter your email." })
  .email({ message: "Enter a valid email address." });

// Password validation schema created by applying each requirement in PASSWORD_REQUIREMENTS
export const passwordSchema = PASSWORD_REQUIREMENTS.reduce(
  (schema, requirement) =>
    schema.regex(requirement.regex, { message: requirement.message }),
  z.string(),
);

// Sign In form schema with email and password fields
export const signInFormSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, { message: "Please enter your password." }),
});

// Sign Up form schema with email and password fields, applying full password validation
export const signUpFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

// Forgot Password form schema with only the email field
export const forgotPasswordFormSchema = z.object({
  email: emailSchema,
});

// Reset Password form schema with password and confirmPassword fields
// Ensures both passwords match by using a refinement check
export const resetPasswordFormSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match. Try again.",
    path: ["confirmPassword"],
  });

// Verify OTP form schema with email and token fields
export const verificationFormSchema = z.object({
  email: emailSchema,
  token: z.string().min(6, { message: "Please enter a 6-digit number." }),
});
