"use client";

import ContinueWithOAuth from "@/components/features/Auth/ContinueWithOAuth";
import SignUpForm from "@/components/features/Auth/SignUpForm";
import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { OrDivider } from "@/components/ui/or-divider";
import VerificationStage from "@/components/features/Auth/VerificationStage";
import useVerificationStage from "@/hooks/useVerificationStage";
import Link from "next/link";
import GoogleLogo from "@/components/ui/svg/google-logo";
import { AUTH_ROUTES } from "@/lib/constants";

const SignUpPage = () => {
  // Use custom hook to manage the verification stage
  const {
    isVerificationStage,
    userEmail,
    enterVerificationStage,
    exitVerificationStage,
  } = useVerificationStage();

  return (
    <div>
      {isVerificationStage ? (
        // Show verification stage component if user is in verification stage
        <VerificationStage
          emailOtpType="signup"
          userEmail={userEmail}
          handleExit={exitVerificationStage}
        />
      ) : (
        // Show sign-up page if user is not in verification stage
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
                <p className="text-sm text-brandColor font-medium">Sign in</p>
              </Link>
            </div>
          </CardFooter>
        </div>
      )}
    </div>
  );
};

export default SignUpPage;
