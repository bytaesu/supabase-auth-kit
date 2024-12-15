"use client";

import {
  CardContent,
  CardFooter,
  CardHeader,
} from "@/shared/components/ui/card";
import ContinueWithOAuth from "@/features/auth/components/ContinueWithOAuth";
import SignUpForm from "@/features/auth/components/SignUpForm";
import VerificationStage from "@/features/auth/components/VerificationStage";
import useVerificationStage from "@/features/auth/hooks/useVerificationStage";
import { AUTH_ROUTES } from "@/shared/lib/supabase/auth/auth.config";
import { OrDivider } from "@/shared/components/ui/or-divider";
import GoogleLogo from "@/shared/components/ui/svg/google-logo";
import Link from "next/link";

const SignUpPage = () => {
  // Use custom hook to manage the verification stage
  const {
    isVerificationStage,
    userEmail,
    enterVerificationStage,
    exitVerificationStage,
  } = useVerificationStage();

  // Show verification stage component if user is in verification stage
  if (isVerificationStage) {
    return (
      <VerificationStage
        emailOtpType="signup"
        userEmail={userEmail}
        handleExit={exitVerificationStage}
      />
    );
  }

  // Show sign-up page if user is not in verification stage
  return (
    <div>
      <CardHeader>
        <h1 className="text-center text-2xl font-semibold">
          Create your account
        </h1>
      </CardHeader>

      <CardContent className="space-y-4">
        <ContinueWithOAuth provider="google" logo={<GoogleLogo />} />
        <OrDivider />
        <SignUpForm enterVerificationStage={enterVerificationStage} />
      </CardContent>

      <CardFooter className="p-4 border-t bg-muted flex justify-center items-center">
        <div className="flex justify-center items-center space-x-1">
          <p className="text-sm font-normal text-muted-foreground">
            Already have an account?
          </p>
          <Link href={AUTH_ROUTES.Public.SignIn}>
            <p className="text-sm text-blue-500 font-medium">Sign in</p>
          </Link>
        </div>
      </CardFooter>
    </div>
  );
};

export default SignUpPage;
